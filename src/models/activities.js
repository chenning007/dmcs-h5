import { queryActivities, query_Activities } from '../services/api';

export default {
  namespace: 'activities',

  state: {
    list: [],
    list_activities: [],
    loading: true,
    loading1: true,
  },

  effects: {
    *fetchList(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryActivities);
      yield put({
        type: 'save',
        payload: { 
          list: Array.isArray(response.list) ? response.list : [] ,
          list_activities: Array.isArray(response.list_activities) ? response.list_activities : [],
        },
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    
  },
  
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        list: [],
        list_activities: [],
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changLoading1(state, action) {
      return {
        ...state,
        loading1: action.payload,
      }
    },
  },
};

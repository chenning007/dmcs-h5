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
          list: Array.isArray(response.list) ? response.list : []
        },
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    
    *fetchActivities(_, { call, put }){
      yield put({
        type: 'changeLoading1',
        payload: true,
      });
      const response = yield call(query_Activities);
      yield put({
        type: 'save',
        payload: {
          list_activities: /*Array.isArray(response.list_activities) ? */response.list_activities 
        },
      });
      yield put({
        type: 'changeLoading1',
        payload: false,
      });
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
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

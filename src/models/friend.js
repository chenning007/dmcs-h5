import { queryFriend } from '../services/api';

export default {
  namespace: 'friend',

  state: {
    list_friend: [],
    loading: true,
    loading1: true,
  },  

  effects: {
    *fetchList(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryFriend);
      yield put({
        type: 'save',
        payload: { 
          list_friend: Array.isArray(response.list_friend) ? response.list_friend : [] ,
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
        list_friend: [], 
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

import { queryFriend } from '../services/api';

export default {
  namespace: 'friend',

  state: {
    list_device_friend: [],
    list_friend: [],
    loading: false,
    loading1: false,
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
          list_device_friend: Array.isArray(response.list_device_friend) ? response.list_device_friend : [] ,
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
        list_device_friend: [], 
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

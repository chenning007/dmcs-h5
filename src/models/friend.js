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
    *fetchList({payload}, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryFriend,payload);
      yield put({
        type: 'getUser',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *getUser({payload},{ call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryFriend,payload);
      yield put({
        type:'getuser',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    }
    
  },
  
  reducers: {
    getuser(state, { payload } ) {
      return {
        ...state,
        list_friend: payload.data ===undefined? []: payload.data,
      };
    },
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

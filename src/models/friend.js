import { queryFriend } from '../services/api';

export default {
  namespace: 'friend',

  state: {
    listFriend: [],
    loading: false,
    loading1: false,
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryFriend, payload);
      yield put({
        type: 'getUser',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *getUser({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryFriend, payload);
      yield put({
        type: 'getAdminuser',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    getAdminuser(state, { payload }) {
      return {
        ...state,
        listFriend: payload.data === undefined ? state.listFriend : payload.data,
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
        listFriend: [],
        loading: false,
        loading1: false,
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
      };
    },
  },
};

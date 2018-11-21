import { GetWebInfo, AddWebInfo, DeleteWebInfo, UpdateWebInfo } from '../services/api';

export default {
  namespace: 'system',

  state: {
    loading: false,
    webinfos: [],
  },

  effects: {
    *getWebinfo(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(GetWebInfo);
      yield put({
        type: 'changeWebinfo',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *addWebinfo({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(AddWebInfo, payload);
      yield put({
        type: 'changeWebinfo',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *deleteWebinfo({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(DeleteWebInfo, payload);
      yield put({
        type: 'changeWebinfo',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *updateWebinfo({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(UpdateWebInfo, payload);
      yield put({
        type: 'changeWebinfo',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    clear() {
      return {
        loading: false,
        webinfos: [],
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeWebinfo(state, { payload }) {
      return {
        ...state,
        webinfos:
          payload.status === 'ok' ? (payload.data === null ? [] : payload.data) : state.webinfos,
      };
    },
  },
};

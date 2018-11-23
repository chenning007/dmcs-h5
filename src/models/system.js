import {
  GetWebInfo,
  AddWebInfo,
  DeleteWebInfo,
  UpdateWebInfo,
  GetShowWebInfo,
} from '../services/api';

export default {
  namespace: 'system',

  state: {
    loading: false,
    webinfos: [],
    webShowInfos: [],
  },

  effects: {
    *getShowInfo(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        loading: false,
      });
      const response = yield call(GetShowWebInfo);
      yield put({
        type: 'changeShowWebInfo',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
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
        webShowInfos: [],
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
    changeShowWebInfo(state, { payload }) {
      return {
        ...state,
        webShowInfos:
          payload.status === 'ok'
            ? payload.data === null
              ? []
              : payload.data
            : state.webShowInfos,
      };
    },
  },
};

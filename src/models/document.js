import { getdocument, deletedocument } from '../services/api';
export default {
  namespace: 'document',
  state: {
    tech_document: [],
    loading: false,
  },

  effects: {
    *getDocument({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getdocument, payload);
      yield put({
        type: 'changeTech_document',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *deleteDocument({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(deletedocument, payload);
      yield put({
        type: 'deleteTech_document',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: true,
      });
    },
  },

  reducers: {
    clear() {
      return {
        loading: false,
        tech_document: [],
      };
    },
    changeTech_document(state, { payload }) {
      return {
        ...state,
        tech_document: payload.data === undefined ? [] : [...payload.data],
      };
    },
    deleteTech_document(state, { payload }) {
      if (payload.status === 'ok')
        return {
          ...state,
          tech_document: payload.data === undefined ? tech_document : [...payload.data],
        };
      if (payload.status === 'error')
        return {
          ...state,
        };
    },
    changeLoading(state, action) {
      return {
        ...state,
        ...action,
      };
    },
  },
};

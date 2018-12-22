import { message } from 'antd';
import { queryCurrent } from '../services/user';
import { fakeSubmitForm, GetPageList, GetFirstPage } from '../services/api';

export default {
  namespace: 'firstpage',

  state: {
    temCreateId: 0,
    moduleid: '1',

    list: [],
    pagelist: [],
    firstpagelist: [],
    loading: false,
    pagelistloading: false,
    currentUser: {},
    regularFormSubmitting: false,
  },
  effects: {
    *getFirstPageList(_, { call, put }) {
      yield put({
        type: 'changePageLoading',
        payload: true,
      });
      const response = yield call(GetFirstPage);

      yield put({
        type: 'changefirstpagelist',
        payload: response,
      });

      yield put({
        type: 'changePageLoading',
        payload: false,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *submitRegularForm({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(fakeSubmitForm, payload);
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      message.success('提交成功');
    },

    *getPageList({ payload }, { call, put }) {
      yield put({
        type: 'changePageLoading',
        payload: true,
      });
      const response = yield call(GetPageList, payload);
      yield put({
        type: 'changePageList',
        payload: response,
      });
      yield put({
        type: 'changePageLoading',
        payload: false,
      });
    },
    *setCreateid({ payload }, { put }) {
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      yield put({
        type: 'changeCreateId',
        payload: payload.createid,
      });
      yield put({
        type: 'changeModuleId',
        payload: payload.moduleid,
      });
      yield put({
        type: 'changeLoading',
        payload: true,
      });
    },
  },

  reducers: {
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changePageLoading(state, action) {
      return {
        ...state,
        pagelistloading: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    clear() {
      return {
        list: [],
        loading: false,
        currentUser: {},
      };
    },
    changeRegularFormSubmitting(state, { payload }) {
      return {
        ...state,
        status: {
          ...state.status,
          ...payload,
        },
        regularFormSubmitting: state.status === 'ok',
      };
    },
    changePageList(state, { payload }) {
      return {
        ...state,
        status: {
          ...state.status,
          ...payload,
        },
        pagelist: payload.status === 'ok' ? (payload.data === undefined ? [] : payload.data) : [],
      };
    },
    changefirstpagelist(state, { payload }) {
      return {
        ...state,
        status: {
          ...state.status,
          ...payload,
        },
        firstpagelist:
          payload.status === 'ok' ? (payload.data === undefined ? [] : payload.data) : [],
      };
    },
    changeCreateId(state, action) {
      return {
        ...state,
        temCreateId: action.payload,
      };
    },
    changeModuleId(state, action) {
      return {
        ...state,
        moduleid: action.payload,
      };
    },
  },
};

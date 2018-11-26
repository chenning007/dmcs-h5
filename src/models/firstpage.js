import { message } from 'antd';
import { queryCurrent } from '../services/user';
import { fakeSubmitForm, GetPageList } from '../services/api';

export default {
  namespace: 'firstpage',

  state: {
    list: [],
    pagelist: [],
    loading: false,
    pagelistloading: false,
    currentUser: {},
    regularFormSubmitting: false,
  },
  effects: {
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
  },
};

import { query as queryUsers, queryCurrent, } from '../services/user';
import { message } from 'antd';
import { fakeSubmitForm } from '../services/api';

export default {
  namespace: 'firstpage',

  state: {
    list: [],
    loading: false,
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
        type: 'changeRegularFormSubmitting',
        payload: true,
      });
      const response = yield call(fakeSubmitForm, payload);
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: response,
      });
      message.success('提交成功');
    },
  },
//action包含的内容
//自动进行解析，能够自动进行键值匹配
  reducers: {
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    clear() {
      return{
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
        regularFormSubmitting: ((state.status === 'ok') ? true : false),
      };
    },
  },
};

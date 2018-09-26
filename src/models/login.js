import { routerRedux } from 'dva/router';
import { accountLogin, accountTemcheck, logout, verifyaccount, motivate } from '../services/api';
import { message } from 'antd';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    currentUser: {},
    submitting: false,
  },

  effects: {
    *login({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response.status === 'ok') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
      if (response.status === 'error') {
        message.error(response.msg);
      }
    },
    *temcheck({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: true,
      });
      const response = yield call(accountTemcheck, payload);
      yield put({
        type: 'changeTemcheck',
        payload: response,
      });
      if (response.status === 'ok') {
        reloadAuthorized();
      }
      if (response.status === 'error') {
        yield put(routerRedux.push('/user/update-result'));
      }
    },
    *logout(_, { call, put }) {
      yield put({
        type: 'clear',
      });
      yield call(logout);
      reloadAuthorized();
      yield put(routerRedux.push('/user/login'));
    },
    *motivate({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: true,
      });
      const response = yield call(motivate , payload);
       if(response.status === 'ok'){
         message.success('激活邮件已发送');
       }
    },
    *verify({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(verifyaccount, payload);
      yield put({
        type: 'clear',
        payload: response,
      });
      if (response.status === 'ok') {
        message.success('邮箱验证成功');
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.data == undefined ? 'guest' : payload.data.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        currentUser: payload.data,
        submitting: false,
      };
    },
    changeTemcheck(state, { payload }) {
      setAuthority(payload.data == undefined ? 'guest' : payload.data.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        currentUser: payload.data == undefined ? {} : payload.data,
        submitting: false,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
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
        status: undefined,
        currentUser: {},
        submitting: false,
      };
    },
  },
};

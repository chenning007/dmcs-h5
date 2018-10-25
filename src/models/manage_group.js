import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  queryadminuser,
  deleteadminuser,
  addAdminuser,
  changeauthority,
  getselfUser,
} from '../services/api';

export default {
  namespace: 'manage_group',

  state: {
    adminusers: [],
    loading: false,
    AdminUser: {},
  },

  effects: {
    *getadminuser({ payload }, { call, put }) {
      yield put({
        type: 'changLoading',
        payload: true,
      });
      const response = yield call(queryadminuser, payload);
      yield put({
        type: 'changeadminuser',
        payload: response,
      });
      /* *****这里需要对reponse状态做出判断 */
      /* ****这是最后的妥善处理情况 */
      yield put({
        type: 'changLoading',
        payload: false,
      });
    },
    /* **删除用户 */
    *deleteAdminuser({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(deleteadminuser, payload);
      yield put({
        type: 'changeadminuser',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    /* ****添加用户 */
    *addAdminuser({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(addAdminuser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *changeAuthority({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(changeauthority, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *getselfuser({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getselfUser, payload);
      yield put({
        type: 'saveself',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (response.status === 'error') {
        yield put(routerRedux.push('/exception/403'));
        message.error('身份获取错误');
      }
    },
  },

  reducers: {
    clear() {
      return {
        adminusers: [],
        loading: true,
        AdminUser: {},
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeadminuser(state, { payload }) {
      return {
        ...state,
        adminusers: payload.data === undefined ? [] : payload.data,
        loading: false,
      };
    },
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveself(state, { payload }) {
      return {
        ...state,
        AdminUser: payload.data === undefined ? {} : payload.data,
      };
    },
  },
};

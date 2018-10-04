import { query as queryUsers, queryCurrent, } from '../services/user';
import { message } from 'antd';
import { updateUser } from '../services/api';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'user',

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
        type: 'changLoading',
        payload: true,
      });
      const response = yield call(updateUser, payload);
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: response,
      });
      if(response.status ==='ok'){
        yield put({
          type: 'changeState',
          payload: false,
        });
        message.success('更新成功');
      }
      if(response.status === 'error'){
        message.error('更新失败');
      }
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
    changeState(state,action) {
      routerRedux.push('/profile/basic-profile');
      return {
        ...state,
        loading: action.payload,
      }
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
        regularFormSubmitting: ((payload.status === 'ok') ? true : false),
      };
    },
  },
};

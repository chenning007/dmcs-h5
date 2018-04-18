import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm, fakeDeviceData } from '../services/api';

export default {
  namespace: 'form',

  state: {
    status: undefined,
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
    regularFormSubmitting: false,
    stepFormSubmitting: false,
    advancedFormSubmitting: false,
    deviceinfo: [],
    data: '蔡志军',
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeDeviceData);
      yield put({
        type: 'save',
        payload: {
          deviceinfo: response.deviceinfo,
        },
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
    *submitStepForm({ payload }, { call, put }) {
      yield put({
        type: 'changeStepFormSubmitting',
        payload: true,
      });
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'changeStepFormSubmitting',
        payload: false,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call, put }) {
      yield put({
        type: 'changeAdvancedFormSubmitting',
        payload: true,
      });
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'changeAdvancedFormSubmitting',
        payload: false,
      });
      message.success('提交成功');
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
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
    changeStepFormSubmitting(state, { payload }) {
      return {
        ...state,
        stepFormSubmitting: payload,
      };
    },
    changeAdvancedFormSubmitting(state, { payload }) {
      return {
        ...state,
        advancedFormSubmitting: payload,
      };
    },
  },
};

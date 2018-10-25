import { queryDeviceList } from '../services/api';

export default {
  namespace: 'device',

  state: {
    device_will: [],
    myselfDevice: [],
    public_device: [],
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryDeviceList, payload);
      yield put({
        type: 'save',
        payload: {
          myselfDevice: Array.isArray(response.myselfDevice) ? response.myselfDevice : [],
          device_will: Array.isArray(response.device_will) ? response.device_will : [],
        },
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    clear() {
      return {
        myselfDevice: [],
        public_device: [],
        device_will: [],
        loading: false,
      };
    },
  },
};

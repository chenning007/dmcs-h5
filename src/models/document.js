import { message } from 'antd';
import {
  GetFileToken,
  DeleteFile,
  GetFileList,
  GetImageList,
  GetFileImage,
  AddFileImage,
} from '../services/api';

export default {
  namespace: 'document',
  state: {
    fileloading: false,
    imageloading: false,
    files: [],
    images: [],
    fileImages: [],
    loading: false,
  },

  effects: {
    *deleteFile({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(DeleteFile, payload);
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (response.status === 'ok') {
        message.success('修改成功');
      }
    },

    *getFilelist(_, { call, put }) {
      yield put({
        type: 'changeFileLoading',
        payload: true,
      });
      const response = yield call(GetFileList);
      yield put({
        type: 'saveFileList',
        payload: response.status === 'ok' && response.data !== 'undefined' ? response.data : [],
      });
      if (response.status === 'error') {
        message.error('获取信息失败');
      }
      if (response.status === 'ok') {
        yield put({
          type: 'changeFileLoading',
          payload: false,
        });
      }
    },
    *getImagelist(_, { call, put }) {
      yield put({
        type: 'changeImageLoading',
        payload: true,
      });
      const response = yield call(GetImageList);
      yield put({
        type: 'saveImageList',
        payload: response.status === 'ok' && response.data !== 'undefined' ? response.data : [],
      });
      if (response.status === 'error') {
        message.error('获取信息失败');
      }
      if (response.status === 'ok') {
        yield put({
          type: 'changeImageLoading',
          payload: false,
        });
      }
    },
    *getFileImage({ payload }, { call, put }) {
      yield put({
        type: 'changeFileImageLoading',
        payload: true,
      });
      const response = yield call(GetFileImage, payload);
      yield put({
        type: 'saveFileImage',
        payload: response.status === 'ok' && response.data !== 'undefined' ? response.data : [],
      });
      yield put({
        type: 'changeFileImageLoading',
        payload: false,
      });
    },
    *getFileToken(_, { call }) {
      const response = yield call(GetFileToken);
      if (response.status === 'error') {
        message.error('令牌获取失败');
      }
    },
    *addFileImage({ payload }, { call, put }) {
      yield put({
        type: 'changeFileImageLoading',
        payload: true,
      });
      const response = yield call(AddFileImage, payload);
      yield put({
        type: 'saveFileImage',
        payload: response.status === 'ok' && response.data !== 'undefined' ? response.data : [],
      });
      yield put({
        type: 'changeFileImageLoading',
        payload: false,
      });
    },
  },

  reducers: {
    clear() {
      return {
        fileloading: false,
        imageloading: false,
        images: [],
        files: [],
        fileImages: [],
        loading: false,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        ...action,
      };
    },
    changeFileLoading(state, action) {
      return {
        ...state,
        fileloading: action.payload,
      };
    },
    changeImageLoading(state, action) {
      return {
        ...state,
        imageloading: action.payload,
      };
    },
    changeFileImageLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    saveFileList(state, action) {
      return {
        ...state,
        files: action.payload,
      };
    },
    saveImageList(state, action) {
      return {
        ...state,
        images: action.payload,
      };
    },
    saveFileImage(state, action) {
      return {
        ...state,
        fileImages: action.payload,
      };
    },
  },
};

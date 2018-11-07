import { message } from 'antd';
import {
  GetFileToken,
  DeleteFile,
  GetFileList,
  GetImageList,
  GetFileImage,
  UpdateFileImage,
  DeleteFileImage,
  GetCommonFileImage,
  UpdaFIOrdVie,
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
        type: 'changeFileLoading',
        payload: true,
      });
      const response = yield call(DeleteFile, payload);
      yield put({
        type: 'saveFileList',
        payload: response,
      });
      yield put({
        type: 'changeFileLoading',
        payload: false,
      });
    },
    *deleteImage({ payload }, { call, put }) {
      yield put({
        type: 'changeImageLoading',
        payload: true,
      });
      const response = yield call(DeleteFile, payload);
      yield put({
        type: 'saveImageList',
        payload: response,
      });
      yield put({
        type: 'changeImageLoading',
        payload: false,
      });
    },
    *deleteFileImage({ payload }, { call, put }) {
      yield put({
        type: 'changeFileImageLoading',
        payload: true,
      });
      const response = yield call(DeleteFileImage, payload);
      yield put({
        type: 'saveFileImage',
        payload: response,
      });
      yield put({
        type: 'changeFileImageLoading',
        payload: false,
      });
    },
    *getFilelist(_, { call, put }) {
      yield put({
        type: 'changeFileLoading',
        payload: true,
      });
      const response = yield call(GetFileList);
      yield put({
        type: 'saveFileList',
        payload: response,
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
        payload: response,
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
        type: 'changeFileLoading', // 借用files变量，从而避免重新声明变量
        payload: true,
      });
      const response = yield call(GetFileImage, payload);
      yield put({
        type: 'saveFileList',
        payload: response,
      });
      yield put({
        type: 'changeFileLoading',
        payload: false,
      });
    },
    *getCommonFileImage(_, { call, put }) {
      yield put({
        type: 'changeFileImageLoading',
        payload: true,
      });
      const response = yield call(GetCommonFileImage);
      yield put({
        type: 'saveFileImage',
        payload: response,
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
    *updateFileImage({ payload }, { call, put }) {
      yield put({
        type: 'changeFileLoading',
        payload: true,
      });
      const response = yield call(UpdateFileImage, payload); // 绑定窗口，从窗口上解绑
      yield put({
        type: 'saveFileList',
        payload: response,
      });
      yield put({
        type: 'changeFileLoading',
        payload: false,
      });
    },
    *updaFIOrdVie({ payload }, { call, put }) {
      yield put({
        type: 'changeFileLoading',
        payload: true,
      });
      const response = yield call(UpdaFIOrdVie, payload);
      yield put({
        type: 'saveFileList',
        payload: response,
      });
      if (response.status === 'ok') {
        message.success('保存成功');
      }
      yield put({
        type: 'changeFileLoading',
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
    saveFileList(state, { payload }) {
      return {
        ...state,
        files: payload.status === 'ok' ? (payload.data === null ? [] : payload.data) : state.files,
      };
    },
    saveImageList(state, { payload }) {
      return {
        ...state,
        images:
          payload.status === 'ok' ? (payload.data === null ? [] : payload.data) : state.images,
      };
    },
    saveFileImage(state, action) {
      const { payload } = action;
      return {
        ...state,
        fileImages:
          payload.status === 'ok' ? (payload.data === null ? [] : payload.data) : state.fileImages,
      };
    },
  },
};

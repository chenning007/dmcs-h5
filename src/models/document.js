import { message } from 'antd';
import { getdocument, DeleteFile } from '../services/api';

export default {
  namespace: 'document',
  state: {
    tech_document: [],
    loading: false,
    files: [],
    images:[],
  },

  effects: {
    *getDocument({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getdocument, payload);
      yield put({
        type: 'changeTech_document',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *deleteFile({ payload }, { call, put }){
      yield put({
        type: 'changeLoading',
        payload:true,
      });
      const response = yield call(DeleteFile, payload);
      yield put({
        type: 'changeLoading',
        payload:false,
      })
      if(response.status==='ok'){
        message.success('修改成功');
      }
    }
  },

  reducers: {
    clear() {
      return {
        loading: false,
        tech_document: [],
        images:[],
        files:[],
      };
    },
    changeTech_document(state, { payload }) {
      return {
        ...state,
        tech_document: payload.data === undefined ? [] : [...payload.data],
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        ...action,
      };
    },
  },
};

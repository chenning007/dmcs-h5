import { message } from 'antd';
import { GetFileToken, DeleteFile, GetFileList, GetImageList } from '../services/api';

export default {
  namespace: 'document',
  state: {
    tech_document: [],
    loading: false,
    files: [],
    images:[],
  },

  effects: {
    *deleteFile({ payload }, { call, put }) {
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
    },

    *getFilelist(_,{call, put}) {
      yield put({
        type: 'changeLoading',
        payload:true,
      });
      const response =yield call(GetFileList);
      yield put({
        type: 'saveFileList',
        payload:response,
      });
      if(response.status==='error'){
        message.error('获取信息失败');
      }
      yield put({
        type:'changeLoading',
        payload:false,
      })
    },
    *getImagelist(_,{call,put}) {
      yield put({
        type: 'changeLoading',
        payload:true,
      });
      const response =yield call(GetImageList);
      yield put({
        type: 'saveImageList',
        payload:response,
      });
      if(response.status==='error'){
        message.error('获取信息失败');
      }
      yield put({
        type:'changeLoading',
        payload:false,
      })
    },
    *getFileToken(_,{call}) {
      const response = yield call(GetFileToken);
      if(response.status==='error'){
        message.error('令牌获取失败');
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
    changeLoading(state, action) {
      return {
        ...state,
        ...action,
      };
    },
    saveFileList(state,{ payload }){
      return {
        ...state,
        files:( payload.status==='ok' && payload.data!=='undefined') ? payload.data:files, 
      }
    },
    saveImageList(state,{payload}){
      return {
        ...state,
        images:( payload.status==='ok' && payload.data!=='undefined') ? payload.data:images,
      }
    }
  },
};

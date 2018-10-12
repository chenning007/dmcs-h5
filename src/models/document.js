import { message } from 'antd';
import { GetFileToken, DeleteFile, GetFileList, GetImageList } from '../services/api';

export default {
  namespace: 'document',
  state: {
    fileloading: false,
    imageloading: false,
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
        type: 'changeFileLoading',
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
      if(response.status==='ok'){
        yield put({
          type:'changeFileLoading',
          payload:false,
        });
      }
    },
    *getImagelist(_,{call,put}) {
      yield put({
        type: 'changeImageLoading',
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
      if(response.status==='ok'){
        yield put({
          type:'changeImageLoading',
          payload:false,
        });
      }
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
        fileloading: false,
        imageloading: false,
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
    changeFileLoading(state,action) {
      return {
        ...state,
        fileloading: action.payload,
      };
    },
    changeImageLoading(state,action) {
      return {
        ...state,
        imageloading: action.payload,
      }
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

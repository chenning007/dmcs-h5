import { routerRedux } from 'dva/router';
import { accountLogin, accountTemcheck } from '../services/api';

import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';


export default {
  namespace: 'login',

  state: {
    status: undefined,
    currentUser:{},
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
    },
    *temcheck({ payload }, { call, put}){
      yield put({
        type: 'save',
        payload: true,
      });
      const response = yield call(accountTemcheck, payload);
      yield put({
        type: 'changeTemcheck',
        payload: response,
      });
      if(response.status === 'ok'){
        reloadAuthorized();
      }
      if(response.status === 'error'){
        yield put(routerRedux.push('/user/update-result'));
      }
    },
    *logout(_, { put, }) {
      //try {
        // get location pathname
      //  const urlParams = new URL(window.location.href);
      //  const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
      //  urlParams.searchParams.set('redirect', pathname);
      //  window.history.replaceState(null, 'login', urlParams.href);
     // } finally {
      //  yield put({
      //    type: 'changeLoginStatus',
      //    payload: {
      //      status: false,
      //      currentAuthority: 'guest',
       //   },
      //  });
        yield put({
          type:'clear',
        })
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      //}
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.data==undefined ? 'guest' : payload.data.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        currentUser: payload.data,
        submitting: false,
      };
    },
    changeTemcheck(state, { payload }) {
      setAuthority(payload.data==undefined ? 'guest' : payload.data.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        currentUser: payload.data==undefined ? {} : payload.data,
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
      };
    },
    clear(){
      return {
        status: undefined,
        currentUser:{},
        submitting: false,
      }
    }
  },
};

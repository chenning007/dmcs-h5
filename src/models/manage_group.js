import { queryadminuser, deleteadminuser, addAdminuser, changeauthority } from '../services/api'
export default {
    namespace: 'manage_group',

    state: {
        adminusers : {},
        loading: true,
        AdminUser : {},
    },
  
    effects: {
        *getadminuser({ payload }, { call, put }) {
           yield put({
               type: 'changLoading',
               payload: true,
            });
           const reponse = yield call( queryadminuser,payload );
            yield put({
               type: 'changeadminuser',
               payload: response,
            })
            /******这里需要对reponse状态做出判断 */
            /*****这是最后的妥善处理情况 */
            yield put({
                type: 'changLoading',
                payload: false,
            });
        },
        /***删除用户 */
        *deleteAdminuser({payload}, {call, put}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const reponse = yield call(deleteadminuser,payload);
            yield put ({
                type: 'save',
                payload: response,
            })
            yield put({
                type: 'changeLoading',
                payload: false,
            })
        },
        /*****添加用户 */
        *addAdminuser({payload}, {call,put}) {
            yield put({
                type: 'changeLoadin',
                payload: true,
            })
            const reponse  = yield call(addAdminuser,payload);
            yield put ({
                type: 'save',
                payload: response,
            })
            yield put ({
                type: 'changeLoading',
                payload: false,
            })
        },
        *changeAuthority({payload}, {call, put }){
            yield put({
                type: 'changeLoading',
                payload: true,
            })
            const response = yield call(changeauthority,payload);
            yield put({
                type: 'save',
                payload: response,
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            })
        }

    },

    reducers: {
        clear() {
            return {
                adminusers: {},
                loading: true,
            }
        },
        changeLoading (state, action) {
            return {
                ...state,
                loading: action.payload,
            }
        },
        changeadminuser (state, {payload}) {
            return{
                ...state,
                adminusers: payload.data==undefined? {}:payload.data,
                loading: false,
            };
        },
        save (state, {payload}) {
            return {
                ...state,
                ...payload,
            } ;  
        },


    },
};
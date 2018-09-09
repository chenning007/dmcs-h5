import {getdocument, deletedocument} from '../services/api';
export default{
    namespace:'document',
    state: {
        tech_document:[],
        loading:false,
    },

    effects: {
        *getDocument(_,{call,put}) {
            yield put({
                type:'changeLoading',
                payload: true,
            })
            const response = yield call(getdocument);
            yield put({
                type:'changeTech_document',
                payload: response,
            })
            yield put({
                type:'changeLoading',
                payload: false,
            })
        },

        *deleteDocument({payload},{call,put}) {
            yield put({
                type:'changeLoading',
                payload: true,
            })
            const response =yield call(deletedocument, payload)
            yield put({
                type:'deleTech_document',
                payload: response,
            })
            yield put({
                type:'changeLoading',
                payload: true,
            })
        }
    },

    reducers :{
        clear() {
            return{
                loading:fasle,
                tech_document: [],
            }
        },
        changeTech_document(state, {payload}) {
            return{
                ...state,
                tech_document: payload.data === undefined ? []:payload.data,
            }
        },
        deleteTech_document(state, {payload}) {
            return{
                ...state,
                tech_document: payload.data === undefined ? tech_document:payload.data,
            }
        }
    }
}
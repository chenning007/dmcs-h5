export default {
    namespace: 'tem_store',

    state: {
        tem_src: undefined,
        tem_id: undefined,
    },

    effects: {
        *addid(_,{put}){
            yield put({
                type: 'Addid',
                payload: false,
            })
        }

    },

    reducers: {
        clear(){
            return {
                tem_src: undefined,
                tem_id: undefined,
            }
        },
        Addid(state, action){
            return {
                ...state,
                tem_id: action.payload,
            }
        },
    }


}
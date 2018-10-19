export default {
  namespace: 'tem_store',

  state: {
    temsrc: undefined,
    temid: undefined,
  },

  effects: {
    *addid({ payload }, { put }) {
      yield put({
        type: 'Addid',
        payload: payload.id,
      });
    },
  },

  reducers: {
    clear() {
      return {
        temsrc: undefined,
        temid: undefined,
      };
    },
    Addid(state, action) {
      return {
        ...state,
        temid: action.payload,
      };
    },
  },
};

import http from '../helpers/HttpHelper';

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
    error: null,
  },
  mutations: {
    setSessionData(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
      state.error = null;
    },
    setError(state, payload) {
      state.error = payload;
    },
    deleteSessionData(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    setUser(state, payload) {
      state.user = payload.user;
      state.error = null;
    },
  },
  actions: {
    async verify(context, token) {
      console.log(token);
      try {
        const result = await http(context).get(
          `/registration/verify?token=${token}`,
        );
        context.commit('setUser', result);
      } catch (err) {
        context.commit('setError', err.response?.data || err);
        console.log(err);
      }
    },
  },
};

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
  },
  actions: {
    async verify(context, token) {
      try {
        const result = await http(context).get(
          `/registration/verify?token=${token}`,
        );
        context.commit('profile/setUser', result.data, { root: true });
      } catch (err) {
        context.commit('setError', err.response?.data || err);
      }
    },
    async login(context, user) {
      context.commit('deleteSessionData');
      try {
        const result = await http(context).post('/signin', user);
        context.commit('profile/setUser', result.data.user, { root: true });
      } catch (err) {
        context.commit('setError', err.response?.data || err);
      }
    },
    logout(context) {
      context.commit('profile/deleteSessionData', null, { root: true });
    },
  },
};

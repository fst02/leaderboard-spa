import http from '../helpers/HttpHelper';

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
    error: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
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
  },
  actions: {
    async update(context, data) {
      try {
        const result = await http(context).put(
          `/profile/update/${JSON.parse(data.get('user')).id}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        context.commit('setUser', result.data);
      } catch (err) {
        context.commit('setError', err.response?.data.error || err);
      }
    },
  },
};

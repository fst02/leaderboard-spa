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
  },
  actions: {
    async update(context, data) {
      try {
        console.log(data.user.id);
        console.log(`/profile/update/${data.user.id}`);
        const result = await http(context).put(
          `/profile/update/${data.user.id}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        context.commit('setUser', result.data);
      } catch (err) {
        context.commit('setError', err.response?.data || err);
      }
    },
  },
};

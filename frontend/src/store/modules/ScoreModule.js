import http from '../helpers/HttpHelper';

export default {
  namespaced: true,
  state: {
    scores: [],
    error: null,
  },
  mutations: {
    setScores(state, payload) {
      state.scores = payload;
      state.error = null;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    async getAll(context) {
      try {
        const results = await http(context).get('/score/all');
        context.commit('setScores', results.data);
      } catch (err) {
        context.commit('setError', err.response?.data || err);
      }
    },
  },
};

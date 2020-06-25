import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import AuthModule from './modules/AuthModule';

Vue.use(Vuex);

const persistence = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth'],
});

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: AuthModule,
  },
  plugins: [
    persistence.plugin,
  ],
});

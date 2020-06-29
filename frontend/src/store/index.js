import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import AuthModule from './modules/AuthModule';
import ScoreModule from './modules/ScoreModule';

Vue.use(Vuex);

const persistence = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth', 'score'],
});

export default new Vuex.Store({
  modules: {
    auth: AuthModule,
    score: ScoreModule,
  },
  plugins: [
    persistence.plugin,
  ],
});

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import AuthModule from './modules/AuthModule';
import ScoreModule from './modules/ScoreModule';
import ProfileModule from './modules/ProfileModule';

Vue.use(Vuex);

const persistence = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth', 'score', 'profile'],
});

export default new Vuex.Store({
  modules: {
    auth: AuthModule,
    score: ScoreModule,
    profile: ProfileModule,
  },
  plugins: [
    persistence.plugin,
  ],
});

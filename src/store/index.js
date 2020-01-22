import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';

const vp = new VuexPersistence({
  key: 'store',
  storage: window.localStorage
});

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vp.plugin],
  state: {
    user: false,
    session_token: false,
    user_id: null
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

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
    user_id: null,
    members: null,
    members: [],
      member: false,
      token_session: false
  },
  mutations: {
    setMembers(state, members) {
      state.members = members;
    },
    setSessionMember(state, data) {
      if(data) {
        state.member = data.member;
        state.token_session = data.token;
      } else {
        state.member = false;
        state.token_session = false;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})

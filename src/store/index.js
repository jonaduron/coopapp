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
    session_token: null,
    members: [],
    channels: [],
    member: null,
  },
  mutations: {
    setMembers(state, members) {
      state.members = members;
    },
    setSessionMember(state, data) {
        state.member = data.member;
        state.session_token = data.token;
        state.user = true;
    },
    unsetSessionMember(state, data) {
        state.member = false;
        state.session_token = false;
        state.user = false;
        state.members = null;
        state.channels = null;
    },
    setChannels(state, data) {
      state.channels = data;
    }
  },
  actions: {
  },
  modules: {
  }
})

import Vue from "vue";
import Vuex from "vuex";
import "firebase/auth";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    overlay: false,
    user: {
      loggedIn: false,
      data: null,
    },
  },
  mutations: {
    addOverlay (state) {
      state.overlay = !state.overlay;
    },
    SET_LOGGED_IN (state, value) {
      state.user.loggedIn = value;
    },
    SET_USER (state, data) {
      state.user.data = data;
    },
  },
  actions: {
    updateOverlay (context) {
      context.commit("addOverlay");
    },
    fetchUser ({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        commit("SET_USER", null);
      }
    },

  },
  getters: {
    user: (state) => state.user,
  },
  modules: {
  },
});

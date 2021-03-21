import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    overlay: false,
  },
  mutations: {
    addOverlay (state) {
      state.overlay = !state.overlay;
    },
  },
  actions: {
    updateOverlay (context) {
      context.commit("addOverlay");
    },
  },
  getters: {
  },
  modules: {
  },
});

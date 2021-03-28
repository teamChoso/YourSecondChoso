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
    categoryObjectDatabase: {},
    centerMap: [0, 0],
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
    SET_CATEGORY_OBJECT (state, objectDatabase) {
      state.categoryObjectDatabase = objectDatabase;
    },
    SET_CENTER_MAP (state, center) {
      state.centerMap = center;
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
    updateCategoryObjectDatabase (context, objectDatabase) {
      context.commit("SET_CATEGORY_OBJECT", objectDatabase);
    },
    updateCenterMap (context, center) {
      context.commit("SET_CENTER_MAP", center);
    },
  },
  getters: {
    user: (state) => state.user,
    categoryObjectDatabase: (state) => state.categoryObjectDatabase,
    centerMap: (state) => state.centerMap,
  },
  modules: {
  },
});

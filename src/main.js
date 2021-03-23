import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "tailwindcss/tailwind.css";
import "./assets/css/index.css";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import firebase from "firebase/app";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_njEx_NgiJQQlOVVKF1s9dmTLYvxxUMA",
  authDomain: "your-second-choso.firebaseapp.com",
  projectId: "your-second-choso",
  storageBucket: "your-second-choso.appspot.com",
  messagingSenderId: "547688449506",
  appId: "1:547688449506:web:e84034a313417ef9a1e5bb",
  measurementId: "G-PERXKXV2W6",
};

// Inicilizar Firebase
firebase.initializeApp(firebaseConfig);

// eslint-disable-next-line init-declarations
let app;

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

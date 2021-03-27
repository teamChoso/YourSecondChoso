import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "tailwindcss/tailwind.css";
import "./assets/css/index.css";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import firebase from "firebase/app";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import vueSmoothScroll from "vue2-smooth-scroll";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

Vue.use(vueSmoothScroll);

library.add(faAngleDoubleUp);
Vue.component("font-awesome-icon", FontAwesomeIcon);

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

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

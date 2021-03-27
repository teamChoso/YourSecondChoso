import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Foro from "../views/Foro.vue";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/foro",
    name: "Foro",
    component: Foro,
  },
  {
    path: "/",
    name: "Contact Us",
    component: Home,
  },
  {
    path: "/about",
    name: "About Us",
    // Esto hace que no se puede acceder a esta página si no se está logeado
    /*
     * Route level code-splitting
     * this generates a separate chunk (about.[hash].js) for this route
     * which is lazy-loaded when the route is visited.
     */
    component: () => import(/* WebpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    // Esto hace que no se puede acceder a esta página si no se está logeado
    /*
     * Route level code-splitting
     * this generates a separate chunk (about.[hash].js) for this route
     * which is lazy-loaded when the route is visited.
     */
    component: () => import(/* WebpackChunkName: "about" */ "../views/Profile.vue"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  scrollBehavior: function (to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// Comprobar que el usuario esta autenticado para permitir o no el acceso a paginas y redigir a login en caso de que no lo este
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    console.log(isAuthenticated);
    next("/login");
  } else if (!requiresAuth && !isAuthenticated) {
    next();
  } else {
    next();
  }
});

export default router;

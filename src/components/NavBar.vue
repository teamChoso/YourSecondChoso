<template>
<div class="fixed">
  <v-card>
    <v-toolbar
      color="#e4b61a"
      dark
      flat
      class="navbar-color"
    >
      <v-toolbar-title class="text-mustard">Your Second Choso</v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <h1>{{user}}</h1> -->
      <div class="flex justify-end space-x-9 mt-10">
        <div>
          <v-btn
            class="text-white w-12 text-sm md:w-48 "
            outlined
            rounded
            @click="updateOverlay"
          >
            Buscar
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>

        <div class="space-x-3">
          <v-btn
            class="w-12 text-sm md:w-40"
            v-if="!user.loggedIn"
            rounded
            dark
            color="#e4b61a"
            to="/login"
          >
            Iniciar Sesión
          </v-btn>
          <v-btn
            class="w-12 text-sm md:w-40"
            v-if="!user.loggedIn"
            rounded
            dark
            color="#e4b61a"
            to="/register"
          >
            Registrarse
          </v-btn>

          <v-btn

            v-if="user.loggedIn"
            @click="signOut"
            rounded
            dark
            color="#e4b61a"
          >
            Sign Out
          </v-btn>

          <v-btn

            v-if="user.loggedIn"
            to="/profile"
            rounded
            dark
            color="#e4b61a"
          >
            Perfil
          </v-btn>
        </div>
      </div>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="#e4b61a"></v-tabs-slider>

          <v-tab
            v-smooth-scroll
            v-for="(item, i) in items"
            :key="item"
            :to="pagesRef[i]"
          >
            {{item}}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "NavBar",
  data () {
    return {
      zIndex: 0,
      tab: null,
      items: [
        "Restaurantes", "Playas", "Eventos", "Tiendas",
      ],
      pagesRef: [{ path: "/", hash: "#cat1" }, { name: "Home", hash: "#cat2" }, { path: "/", hash: "#cat3" }, { path: "/", hash: "#cat4" }],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  methods: {
    ...mapActions(["updateOverlay"]),
    signOut () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "login" });
        });
    },
  },
  computed: {
    ...mapState(["overlay"]),
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>

<style scoped>
/* .navbar-color {
  background: rgb(44,50,88);
  background: -moz-linear-gradient(38deg, rgba(44,50,88,1) 0%, rgba(254,233,112,1) 100%);
  background: -webkit-linear-gradient(38deg, rgba(44,50,88,1) 0%, rgba(254,233,112,1) 100%);
  background: linear-gradient(38deg, rgba(44,50,88,1) 0%, rgba(254,233,112,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2c3258",endColorstr="#fee970",GradientType=1);
} */
</style>
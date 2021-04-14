<template>
  <div>
    <v-card>
      <v-toolbar color="#2c3258" dark flat class="navbar-color">
        <img
          src="logo_transparent.png"
          alt="Logo de Your Second Choso"
          @click="toHome"
          class="lg:w-28 lg:h-28 w-12 h-12"
        />
        <v-toolbar-title class="text-mustard">
          <p @click="toHome" class="lg:mb-4 mb-0">Your Second Choso</p>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- <h1>{{user}}</h1> -->
        <div class="lg:hidden w-20">
          <DropDown class="mr-8" />
        </div>
        <div class="lg:flex lg:justify-end lg:space-x-9 lg:mt-10 hidden">
          <v-btn
            class="text-white w-12 text-sm md:w-48 lg:block hidden"
            outlined
            rounded
            @click="updateOverlay"
          >
            Buscar
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <PrimaryButton
            class="w-12 text-sm md:w-40 mb-2"
            v-if="!user.loggedIn"
            path="/login"
            name="Iniciar Sesión"
          />
          <PrimaryButton
            class="w-12 text-sm md:w-40 mb-2 ml-2"
            v-if="!user.loggedIn"
            path="/register"
            name="Registrarse"
          />

          <PrimaryButton v-if="user.loggedIn" path="/profile" name="Perfil" />

          <PrimaryButton
            v-if="user.loggedIn"
            name="Cerrar Sesión"
            @click.native="signOut"
          />
        </div>

        <template v-slot:extension class="fixed">
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="#e4b61a"></v-tabs-slider>

            <v-tab
              v-smooth-scroll
              v-for="(item, i) in items"
              :key="item"
              :to="pagesRef[i]"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import DropDown from "../DropDown/DropDown";

export default {
  name: "NavBar",
  data () {
    return {
      zIndex: 0,
      tab: null,
      items: ["Restaurantes", "Playas", "Eventos", "Tiendas", "Foro"],
      pagesRef: [
        { path: "/", hash: "#restaurantes" },
        { name: "Home", hash: "#playas" },
        { path: "/", hash: "#eventos" },
        { path: "/", hash: "#tiendas" },
        { path: "/foro" },
      ],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
    toHome () {
      this.$router.replace({ name: "Home" });
    },
  },
  computed: {
    ...mapState(["overlay"]),
    ...mapGetters({
      user: "user",
    }),
  },
  components: {
    PrimaryButton,
    DropDown,
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
.fixed {
  position: fixed;
}
</style>
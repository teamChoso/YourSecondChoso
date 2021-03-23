<template>
  <v-app>
    <NavBar/>
    <v-main>
      <router-view/>
      <v-overlay
      :z-index="zIndex"
      :value="overlay"
      >
        <v-btn
          class="white--text"
          color="teal"
          @click="updateOverlay"
        >
          Hide Overlay
        </v-btn>
      </v-overlay>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { mapState, mapActions } from "vuex";

export default {
  name: "App",

  components: {
    NavBar,
    Footer,
  },

  data: () => ({
    _authorized: false,
    zIndex: 0,
  }),
  methods: {
    ...mapActions(["updateOverlay"]),
  },
  computed: {
    ...mapState(["overlay"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

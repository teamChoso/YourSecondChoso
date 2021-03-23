<template>
  <v-card>
    <v-toolbar
      color="#2c3258"
      dark
      flat
    >

      <v-toolbar-title class="text-mustard">Your Second Choso</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="flex justify-end space-x-9 mt-10">
        <div>
          <v-btn
            class="white--text"
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
            rounded
            outlined
            dark
            to="/login"
          >
            Iniciar Sesión
          </v-btn>
          <v-btn
            rounded
            outlined
            dark
            to="/register"
          >
            Registrarse
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
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "NavBar",
  data () {
    return {
      zIndex: 0,
      tab: null,
      items: [
        "Categoría 1", "Categoría 2", "Categoría 3", "Categoría 4",
      ],
      pagesRef: ["/", "/about", "/", "/about"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  methods: {
    ...mapActions(["updateOverlay"]),
  },
  computed: {
    ...mapState(["overlay"]),
  },
};
</script>

<style scoped>

</style>
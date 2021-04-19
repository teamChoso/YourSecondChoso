<template>
    <div>
        <v-parallax height="100%" :src="img" class="h-full lg:h-screen">
        <v-layout column align-center justify-center >
          <h1 class="lg:text-6xl mt-20 text-3xl mb-5 text-shadow">{{cat}}</h1>
          <div class="flex-col justify-center bg-gray-400  bg-opacity-40 w-68 p-5 rounded-lg">
          <v-row class="w-60 lg:w-80" justify="center">
            <v-expansion-panels class="w-60 lg:w-80 accordion elevation-0">
              <v-expansion-panel class="elevation-0" style="background-color: rgba(255,255,255,0);">
                <v-expansion-panel-header class="bg-mustard text-white rounded-full py-3 px-6 text-shadow lg:text-2xl" @click="pressedCatUno">{{strShow}}  subcategorías</v-expansion-panel-header>
                <v-expansion-panel-content class="text-white py-2 text-shadow">
                  <router-link style="color: white"  class="block text-white py-2 hover:bg-mustard rounded-full text-2xl" :to="{name: 'Subcategory'}" v-for="(item,index) in subCat" :key="index" @click.native="updateData(cat, item)">{{ item }}</router-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
          </div>
        </v-layout>
        </v-parallax>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data () {
    return {
      strShow: "Mostrar",
    };
  },
  props: {
    img: {
      type: String,
      default: "",
    },
    cat: {
      type: String,
      default: "",
    },
    subCat: {
      type: Array,
      default: null,
    },
  },
  methods: {
    pressedCatUno () {
      // (this.mostrarCatUno ? this.mostrarCatUno = false : this.mostrarCatUno = true);
      (this.strShow === "Mostrar" ? this.strShow = "Ocultar" : this.strShow = "Mostrar");
    },
    pressedCatDos (cat, subcat) {
      console.log(cat + " : " + subcat);
      // (this.mostrarCatDos ? this.mostrarCatDos = false : this.mostrarCatDos = true);;
    },
    updateData (category, subcategory) {
      this.updateCurrentCategory(category);
      this.updateCurrentSubcategory(subcategory);
    },
    ...mapActions(["updateCurrentSubcategory", "updateCurrentCategory"]),
  },
};
</script>

<style lang="scss" scoped>
.v-expansion-panel::before {
   box-shadow: none !important;
}
.text-shadow {
  text-shadow: 0 0 5px black;
}
</style>
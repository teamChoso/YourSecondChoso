<template>
    <div>
        <v-parallax :height="600" :src="img">
        <v-layout column align-center justify-center >
          <h1 class="mt-20 text-3xl mb-5 ">{{cat}}</h1>
          <div class="flex-col justify-center bg-gray-400  bg-opacity-40 w-68 p-5 rounded-lg">
          <v-row class="w-60" justify="center">
            <v-expansion-panels class="w-60 accordion elevation-0">
              <v-expansion-panel class="elevation-0" style="background-color: rgba(255,255,255,0);">
                <v-expansion-panel-header class="bg-mustard text-white rounded-full py-3 px-6" @click="pressedCatUno">{{strShow}}  subcategorías</v-expansion-panel-header>
                <v-expansion-panel-content class="text-white py-2">
                  <p v-for="(item,index) in subCat" :key="index">{{ item }}</p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
          </div>
          <!-- <v-btn rounded class="text-white texto-blanco bg-mustard-500 hover:bg-mustard-700 w-60"  @click="pressedCatUno" color="#e4b61a">{{strShow}} subcategorias</v-btn > -->
          <div class="flex-col justify-center bg-gray-400 bg-opacity-40 w-40 p-5 rounded" v-if="mostrarCatUno" >
            <p>Guachinches</p>
            <p>Italianos</p>
          </div>
        </v-layout>
        </v-parallax>
    </div>
</template>

<script>
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
    pressedCatDos () {
      // (this.mostrarCatDos ? this.mostrarCatDos = false : this.mostrarCatDos = true);
      (this.strShow === "Mostrar" ? this.strShow = "Ocultar" : this.strShow = "Mostrar");
    },
  },
};
</script>

<style lang="scss" scoped>
.v-expansion-panel::before {
   box-shadow: none !important;
}
</style>
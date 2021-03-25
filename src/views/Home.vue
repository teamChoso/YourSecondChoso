<template>
  <!-- <HelloWorld/> -->
  <!-- <Carousel /> -->
  <div>
    <template>
      <div id="cat1"></div>
      <v-parallax src="https://deih43ym53wif.cloudfront.net/la-geria-wine-grow-lanzarote-canary-islands-shutterstock_661595281_34f3af3ad8.jpeg">
        <v-layout column align-center justify-center>
          <h1 class="mt-20 text-3xl mb-5">Restaurantes</h1>
          <v-btn rounded class="text-white texto-blanco bg-mustard-500 hover:bg-mustard-700 w-60"  @click="pressedCatUno" color="#e4b61a">{{strShow}} subcategorias</v-btn >
          <div class="flex-col justify-center bg-gray-400 bg-opacity-40 w-40 p-5 rounded" v-if="mostrarCatUno" >
            <p>Guachinches</p>
            <p>Italianos</p>
          </div>
        </v-layout>
      </v-parallax>
      <div id="cat2"></div>
      <v-parallax src="https://entremontanas.com/wp-content/uploads/tour_img-1380315-99.jpg">
      <v-layout column align-center justify-center>
          <h1  class="mt-20 text-3xl mb-5">Playas</h1>
          <v-btn rounded class="text-white texto-blanco bg-mustard-500 hover:bg-mustard-700 w-60"  @click="pressedCatDos" color="#e4b61a">{{strShow}} subcategorias</v-btn >
          <div class="flex-col justify-center bg-gray-400 bg-opacity-40 w-40 p-5 rounded" v-if="mostrarCatDos" >
            <p>Mesa del Mar</p>
            <p>Las Teresitas</p>
          </div>
        </v-layout>
      </v-parallax>
      <div id="cat3"></div>
      <v-parallax src="https://s0.blt.ro/guidetocanaryislands.com/img/o/media/grancanaria/events/carnival/las-palmas-de-gran-canaria/las-palmas-de-gran-canaria-carnival-spain-1200-675.1594383467.jpg"></v-parallax>
      <div id="cat4"></div>
      <v-parallax src="https://f.intersailclub.com//logos/4/f/e/4fe7e0544920140110d9c9e056a037115b8ed8876b2bd-ab25e-fit-1920-1080.jpg"></v-parallax>
      <a href="#top">Go up</a>
</template>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Carousel from "@/components/Carousel.vue";

export default {
  data () {
    return {
      strShow: "Mostrar",
      mostrarCatUno: false,
      mostrarCatDos: false,
    };
  },
  methods: {
    pressedCatUno () {
      (this.mostrarCatUno ? this.mostrarCatUno = false : this.mostrarCatUno = true);
      (this.strShow === "Mostrar" ? this.strShow = "Ocultar" : this.strShow = "Mostrar");
    },
    pressedCatDos () {
      (this.mostrarCatDos ? this.mostrarCatDos = false : this.mostrarCatDos = true);
      (this.strShow === "Mostrar" ? this.strShow = "Ocultar" : this.strShow = "Mostrar");
    },
  },
  name: "Home",
  components: {
    /*
     * HelloWorld,
     * Carousel,
     */
  },
};
</script>

<style lang ="scss" scoped>
a{
  position:fixed;
  bottom:1%;
  right:1%;
  z-index:9999;
  border: 10px;
  }

.texto-blanco {
  color:white;
}

</style>

<template>
  <div>
    <div id="cat1"></div>
    <Parallax
      cat="Restaurantes"
      :subCat="subcat1"
      img="https://blogimages.musement.com/2019/09/Comida-Canaria-AdobeStock_272575441.jpg"
    />
    <div id="cat2"></div>
    <Parallax
      cat="Playas"
      :subCat="subcat2"
      img="https://www.hdhotels.com/cobi/media/hdhotels.com/56/07/Papagayo_Lanzarote.jpg"
    />
    <div id="cat3"></div>
    <Parallax
      cat="Eventos"
      :subCat="subcat3"
      img="https://s0.blt.ro/guidetocanaryislands.com/img/o/media/grancanaria/events/carnival/las-palmas-de-gran-canaria/las-palmas-de-gran-canaria-carnival-spain-1200-675.1594383467.jpg"
    />
    <div id="cat4"></div>
    <Parallax
      cat="Tiendas"
      :subCat="subcat4"
      img="https://www.webtenerife.com/es/que-hacer/ocio/compras/centros-comerciales/lists/galeriamultimediatenerife/siammall-1.jpg"
    />
    <v-btn
      class="custom"
      color="#fee970"
      fab
      dark
      href="#top"
    >
      <v-icon>mdi-arrow-up-bold-outline</v-icon>
    </v-btn>
    <!-- <a href="#top" v-smooth-scroll>Go up</a> -->
  </div>
</template>

<script>
import Parallax from "../../components/Parallax/Parallax";

export default {
  data () {
    return {
      subcat1: ["Guachinches", "Areperas"],
      subcat2: ["Arena blanca", "Arena negra"],
      subcat3: ["General"],
      subcat4: ["Tradicionales"],
    };
  },
  methods: {
    track () {
      this.$ga.page("/");
    },
  },
  name: "Home",
  components: {
    Parallax,
  },
};
</script>

<style lang ="scss" scoped>

.custom {
  position: fixed;
  bottom: 1%;
  right: 1%;
  z-index: 9999;
  border: 10px;
  color: #9b9183;
}
</style>
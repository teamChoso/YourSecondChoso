<template>
  <div>
    <div id="restaurantes"></div>
    <Parallax
      cat="Restaurantes"
      :subCat="subcat1"
      :img="require('../../assets/inicio/restaurantes.jpg')"
    />
    <div id="playas"></div>
    <Parallax
      cat="Playas"
      :subCat="subcat2"
      :img="require('../../assets/inicio/playas.jpg')"
    />
    <div id="eventos"></div>
    <Parallax
      cat="Eventos"
      :subCat="subcat3"
      :img="require('../../assets/inicio/eventos.jpg')"
    />
    <div id="tiendas"></div>
    <Parallax
      cat="Tiendas"
      :subCat="subcat4"
      :img="require('../../assets/inicio/tiendas.jpg')"
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
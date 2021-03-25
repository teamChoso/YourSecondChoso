<template>
  <div>
    <div id="cat1"></div>
    <Parallax cat="Restaurantes" :subCat="subcat1" img="https://deih43ym53wif.cloudfront.net/la-geria-wine-grow-lanzarote-canary-islands-shutterstock_661595281_34f3af3ad8.jpeg"/>
    <div id="cat2"></div>
    <Parallax cat="Playas" :subCat="subcat2" img="https://entremontanas.com/wp-content/uploads/tour_img-1380315-99.jpg"/>
    <div id="cat3"></div>
    <Parallax cat="Cat3" :subCat="subcat3" img="https://s0.blt.ro/guidetocanaryislands.com/img/o/media/grancanaria/events/carnival/las-palmas-de-gran-canaria/las-palmas-de-gran-canaria-carnival-spain-1200-675.1594383467.jpg"/>
    <div id="cat4"></div>
    <Parallax cat="Cat4" :subCat="subcat4" img="https://f.intersailclub.com//logos/4/f/e/4fe7e0544920140110d9c9e056a037115b8ed8876b2bd-ab25e-fit-1920-1080.jpg"/>
    <a href="#top">Go up</a>
    <!-- <a href="#top" v-smooth-scroll>Go up</a> -->
  </div>
</template>

<script>
import Parallax from "../components/Parallax";

export default {
  data () {
    return {
      subcat1: ["Guachinches", "Italianos"],
      subcat2: ["Las Teresitas", "Mesa del Mar"],
    };
  },
  name: "Home",
  components: {
    Parallax,
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
</style>

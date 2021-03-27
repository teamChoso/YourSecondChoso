<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          src: "https://deih43ym53wif.cloudfront.net/la-geria-wine-grow-lanzarote-canary-islands-shutterstock_661595281_34f3af3ad8.jpeg",
        },
        {
          src: "https://entremontanas.com/wp-content/uploads/tour_img-1380315-99.jpg",
        },
        {
          src: "https://s0.blt.ro/guidetocanaryislands.com/img/o/media/grancanaria/events/carnival/las-palmas-de-gran-canaria/las-palmas-de-gran-canaria-carnival-spain-1200-675.1594383467.jpg",
        },
        {
          src: "https://f.intersailclub.com//logos/4/f/e/4fe7e0544920140110d9c9e056a037115b8ed8876b2bd-ab25e-fit-1920-1080.jpg",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
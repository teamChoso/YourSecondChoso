<template>
  <div class="container bg-grey w-1/2 mt-6 rounded-md">
    <h1 class="text-4xl font-bold my-2">Compra realizada con éxito</h1>
    <h2 class="text-2xl mb-3">¡Muchas gracias por su compra!</h2>
    <p class="text-xl mb-3">A continuación puede observar un resumen de lo que ha comprado:</p>
    <v-card
      max-width="600"
      class="mx-auto mb-6"
    >
      <v-list
        subheader
        two-line
      >
        <v-subheader inset>Productos</v-subheader>

        <v-list-item
          v-for="(item,index) in products"
          :key="index"
        >
          <v-list-item-avatar>
            <v-img
            height="40"
            width="40"
            :src="item.path"
          ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>

            <v-list-item-subtitle v-text="item.eur"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="'x '+item.amount"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="mb-4">
        <PrimaryButton
          name="Volver a la página"
          @click.native="returnIndex"
        />
      </div>
    </v-card>
  </div>
</template>

<script>
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

export default {
  data () {
    return {
      products: [],
    };
  },
  methods: {
    returnIndex () {
      this.$router.replace({ path: "/" });
    },
  },
  mounted () {
    if (localStorage.getItem("products")) {
      this.products = JSON.parse(localStorage.getItem("products"));
    }
  },
  components: {
    PrimaryButton,
  },

};
</script>

<style>

</style>
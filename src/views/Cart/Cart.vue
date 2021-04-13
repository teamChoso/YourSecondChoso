<template>
  <div class="container">

    <v-card
      max-width="600"
      class="mx-auto"
    >
      <v-toolbar
        color="blue"
        dark
      >
        <v-toolbar-title>Carrito</v-toolbar-title>
      </v-toolbar>

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

          <v-list-item-action>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="addOne(index)"
            >
              Añadir
            </v-btn>
            <v-btn
              color="#e4b61a"
              text
              @click="removeOne(index)"
            >
              Quitar
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <StripeComponent/>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StripeComponent from "../../components/StripeComponent/StripeComponent";

export default {
  name: "Cart",
  components: {
    StripeComponent,
  },
  data () {
    return {
      items: [],
    };
  },
  computed: {
    ...mapGetters({
      products: "products",
    }),
  },
  methods: {
    addOne (index) {
      this.products[index].amount = this.products[index].amount + 1;
      this.updateProductsCart(this.products);
    },
    removeOne (index) {
      if (this.products[index].amount > 0) {
        this.products[index].amount = this.products[index].amount - 1;
        this.updateProductsCart(this.products);
      }
      if (this.products[index].amount === 0) {
        this.products.splice(index, 1);
      }
    },
    ...mapActions(["updateProductsCart"]),
  },

};
</script>

<style>

</style>
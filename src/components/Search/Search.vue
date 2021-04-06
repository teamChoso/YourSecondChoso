<template>
  <div class="container">
    <div class="grid grid-cols-6">
      <div class="col-start-3 col-span-3">
        <v-radio-group
          v-model="categorySelected"
          row
        >
          <v-radio
            v-for="(item,index) in categories"
            :key="index"
            :label="item"
            :value="index"
          ></v-radio>
        </v-radio-group>
      </div>
      <div class="col-start-3 col-span-3">
        <v-radio-group
          v-model="subcategorySelected"
          row
        >
          <v-radio
            v-for="(item,i) in subcategories[categorySelected]"
            :key="i"
            :label="item"
            :value="i"
          ></v-radio>
        </v-radio-group>
      </div>
      <div class="col-span-6">
        <v-card color="#2c3258">
          <v-card-title>
            Buscador
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            light
            :headers="headers"
            :items="elements"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn
                color="#e4b61a"
                @click="itemSelected(item)"
              >
                Ir a la página
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    search: "",
    categorySelected: 0,
    subcategorySelected: 0,
    categories: ["Todas", "Restaurantes", "Playas", "Eventos", "Tiendas"],
    subcategories:
    [
      ["Todas", "Guachinches", "Areperas", "Arena Blanca", "Arena Negra", "Rocosa", "Carnavales", "Romerías", "Centros Comerciales", "Tiendas tradicionales"],
      ["Todas", "Guachinches", "Areperas"],
      ["Todas", "Arena Blanca", "Arena Negra", "Rocosa"],
      ["Todas", "Carnavales", "Romerías"],
      ["Todas", "Centros Comerciales", "Tiendas tradicionales"],
    ],
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Categoría",
        align: "center",
        sortable: false,
        value: "category",
      },
      {
        text: "Subcategoría",
        align: "center",
        sortable: false,
        value: "subcategory",
      },
      {
        text: "",
        align: "end",
        sortable: false,
        value: "actions",
      },
    ],
    elements: [
      {
        name: "Frozen Yogurt",
        category: 159,
        subcategory: 6.0,
        path: "/",
      },
      {
        name: "Ice cream sandwich",
        category: 237,
        subcategory: 9.0,
        path: "/about",
      },
      {
        name: "Eclair",
        category: 262,
        subcategory: 16.0,
        path: "/subcategory",
      },
      {
        name: "Cupcake",
        category: 305,
        subcategory: 3.7,
        path: "/chat",
      },
      {
        name: "Gingerbread",
        category: 356,
        subcategory: 16.0,
        path: "/",
      },
      {
        name: "Jelly bean",
        category: 375,
        subcategory: 0.0,
        path: "/chat",
      },
    ],
  }),
  computed: {
  },
  methods: {
    ...mapActions(["updateOverlay"]),
    itemSelected (item) {
      this.$router.replace({ path: this.elements[this.elements.indexOf(item)].path });
      this.updateOverlay();
    },
  },
};
</script>

<style>

</style>
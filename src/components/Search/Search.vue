<template>
  <div class="container">
    <div class="grid grid-cols-6">
      <div class="col-start-3 col-span-3">
        <v-radio-group
          v-model="categorySelected"
          row
        >
          <v-radio
            label="Todas"
            value="todas"
          ></v-radio>
          <v-radio
            v-for="(item,index) in categories"
            :key="index"
            :label="item"
            :value="item"
          ></v-radio>
        </v-radio-group>
      </div>
      <!-- <div class="col-start-3 col-span-3">
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
      </div> -->
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
            :items="categorySelected === 'todas' ? elements:filterElements"
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
    categorySelected: "todas",
    subcategorySelected: 0,
    categories: ["Restaurantes", "Playas", "Eventos", "Tiendas"],
    subcategories:
    [
      ["Guachinches", "Areperas"],
      ["Arena Blanca", "Arena Negra", "Rocosa"],
      ["Carnavales", "Romerías"],
      ["Centros Comerciales", "Tiendas tradicionales"],
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
        name: "Casa Lito",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "El Pole",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "La Casona",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "Los Gómez",
        category: "Eventos",
        subcategory: "Guachinches",
      },
      {
        name: "Los Rincones",
        category: "Playas",
        subcategory: "Guachinches",
      },
      {
        name: "Casa Lito",
        category: "Tiendas",
        subcategory: "Areperas",
      },
    ],
  }),
  computed: {
    filterElements () {
      // Return this.elements.filter((element) => element.category.includes(this.categories[this.categorySelected]) && element.subcategory.includes(this.subcategories[this.subcategorySelected]));
      return this.elements.filter((element) => element.category.includes(this.categorySelected));
    },
  },
  methods: {
    ...mapActions(["updateOverlay", "updateCurrentSubcategory", "updateCurrentCategory"]),
    itemSelected (item) {
      const category = this.elements[this.elements.indexOf(item)].category;
      const subCategory = this.elements[this.elements.indexOf(item)].subcategory;
      this.updateCurrentCategory(category);
      this.updateCurrentSubcategory(subCategory);
      this.updateOverlay();
      this.$router.replace({ path: "/subcategory" });
    },
  },
};
</script>

<style>

</style>
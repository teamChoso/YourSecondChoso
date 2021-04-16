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
            :items-per-page="5"
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
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "Restaurante Chipi-Chipi",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "Restaurante El Guachinche Palmero",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "El Asador del Campesino",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "Guachinche Aguadara",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "Guachinche Las LAPAS",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "La Bodeguita de Fa",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "Asador Las Colmenas",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "Restaurante La Laguna Grande",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "Restaurante Cuatro Caminos",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "Casa Josefina",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "La Cuevita Ayagaures",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "Guachinche El Novelero Melenara",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "La Marisma de Mariquita Hierro",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "Guachinche +Que Carne",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "La Bodega de Jandia",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "LA DOÑA GUACHINCHE",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "Casa Juan Ramón",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "Taberna El Bocadito",
        category: "Restaurantes",
        subcategory: "Guachinches",
      },
      {
        name: "La Catirita Los Cristianos",
        category: "Restaurantes",
        subcategory: "Areperas",
      },
      {
        name: "Punto criollo",
        category: "Restaurantes",
        subcategory: "Areperas",
      },
      {
        name: "Arepera La Terraza",
        category: "Restaurantes",
        subcategory: "Areperas",
      },
      {
        name: "Arepera El Rinconcito",
        category: "Restaurantes",
        subcategory: "Areperas",
      },
      {
        name: "AREPERA BERACA",
        category: "Restaurantes",
        subcategory: "Areperas",
      },
      {
        name: "Arepera La Criolla",
        category: "Restaurantes",
        subcategory: "Areperas",
      },
      {
        name: "Arepera Cachapera Salto Ángel",
        category: "Restaurantes",
        subcategory: "Areperas",
      },
      {
        name: "Arepas Llaneras Venezolanas",
        category: "Restaurantes",
        subcategory: "Areperas",
      },
      {
        name: "El Bounty del Muelle",
        category: "Restaurantes",
        subcategory: "Areperas",
      },
      {
        name: "Lanzarepa",
        category: "Restaurantes",
        subcategory: "Areperas",
      },
      {
        name: "Sabor Venezolano",
        category: "Restaurantes",
        subcategory: "Areperas",
      },
      {
        name: "Los enanos",
        category: "Eventos",
        subcategory: "General",
      },
      {
        name: "La bajada de la Virgen",
        category: "Eventos",
        subcategory: "General",
      },
      {
        name: "Bajada de la Virgen de los Reyes",
        category: "Eventos",
        subcategory: "General",
      },
      {
        name: "Carnaval",
        category: "Eventos",
        subcategory: "General",
      },
      {
        name: "Tablas de San Andrés",
        category: "Eventos",
        subcategory: "General",
      },
      {
        name: "Romería de Tegueste",
        category: "Eventos",
        subcategory: "General",
      },
      {
        name: "Romería de San Roque",
        category: "Eventos",
        subcategory: "General",
      },
      {
        name: "Bajada de la Rama de Agaete",
        category: "Eventos",
        subcategory: "General",
      },
      {
        name: "Suelta del Perro maldito",
        category: "Eventos",
        subcategory: "General",
      },
      {
        name: "Iron Man",
        category: "Eventos",
        subcategory: "General",
      },
      {
        name: "Fiesta de la Virgen de los Dolores",
        category: "Eventos",
        subcategory: "General",
      },
      {
        name: "La Romería de la Peña",
        category: "Eventos",
        subcategory: "General",
      },
      {
        name: "Festival Internacional de Cometas",
        category: "Eventos",
        subcategory: "General",
      },
      {
        name: "Playa de Benijo",
        category: "Playas",
        subcategory: "Arena negra",
      },
      {
        name: "Playa Quemada",
        category: "Playas",
        subcategory: "Arena negra",
      },
      {
        name: "Playa de Nogales",
        category: "Playas",
        subcategory: "Arena negra",
      },
      {
        name: "Playa Timijiraque",
        category: "Playas",
        subcategory: "Arena negra",
      },
      {
        name: "Playa de Tarajalejo",
        category: "Playas",
        subcategory: "Arena negra",
      },
      {
        name: "Playa del Nogales",
        category: "Playas",
        subcategory: "Arena negra",
      },
      {
        name: "Playa del Hombre",
        category: "Playas",
        subcategory: "Arena negra",
      },
      {
        name: "Playa del Inglés",
        category: "Playas",
        subcategory: "Arena negra",
      },
      {
        name: "Playa de Morro Jable",
        category: "Playas",
        subcategory: "Arena blanca",
      },
      {
        name: "Playa de los Charcos",
        category: "Playas",
        subcategory: "Arena blanca",
      },
      {
        name: "Playa Caleta del Congrio",
        category: "Playas",
        subcategory: "Arena blanca",
      },
      {
        name: "Playa de Maspalomas",
        category: "Playas",
        subcategory: "Arena blanca",
      },
      {
        name: "Las Teresitas",
        category: "Playas",
        subcategory: "Arena blanca",
      },
      {
        name: "Artesanía SanLupe",
        category: "Tiendas",
        subcategory: "Tradicionales",
      },
      {
        name: "HECHOENLAPALMA",
        category: "Tiendas",
        subcategory: "Tradicionales",
      },
      {
        name: "Tienda Isús",
        category: "Tiendas",
        subcategory: "Tradicionales",
      },
      {
        name: "Adorna T",
        category: "Tiendas",
        subcategory: "Tradicionales",
      },
      {
        name: "Tienda Casa de Los Balcones",
        category: "Tiendas",
        subcategory: "Tradicionales",
      },
      {
        name: "La Empleita",
        category: "Tiendas",
        subcategory: "Tradicionales",
      },
      {
        name: "Los Calados Artesanía",
        category: "Tiendas",
        subcategory: "Tradicionales",
      },
      {
        name: "Artenerife",
        category: "Tiendas",
        subcategory: "Tradicionales",
      },
      {
        name: "Artesanía Santa Catalina",
        category: "Tiendas",
        subcategory: "Tradicionales",
      },
      {
        name: "La Molina Artesanía",
        category: "Tiendas",
        subcategory: "Tradicionales",
      },
      {
        name: "Canary Gourmet",
        category: "Tiendas",
        subcategory: "Tradicionales",
      },
      {
        name: "Mercado Agro-Artesanal",
        category: "Tiendas",
        subcategory: "Tradicionales",
      },
      {
        name: "Algomás",
        category: "Tiendas",
        subcategory: "Tradicionales",
      },
      {
        name: "Enkanto Lanzarote",
        category: "Tiendas",
        subcategory: "Tradicionales",
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
<template>
  <div class="container">
    <div class="grid grid-cols-6">
      <div class="col-start-3 col-span-2">
        <v-radio-group
          v-model="row"
          row
        >
          <v-radio
            label="Categoría 1"
            value="radio-1"
          ></v-radio>
          <v-radio
            label="Categoría 2"
            value="radio-2"
          ></v-radio>
        </v-radio-group>
      </div>
      <div class="col-start-3 col-span-2">
        <v-radio-group
          v-model="row"
          row
        >
          <v-radio
            label="Subcategoría 1"
            value="radio-1"
          ></v-radio>
          <v-radio
            label="Subcategoría 2"
            value="radio-2"
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
            :items="desserts"
            :search="search"
          ></v-data-table>
        </v-card>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data () {
    return {
      search: "",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
      ],
    };
  },
};
</script>

<style>

</style>
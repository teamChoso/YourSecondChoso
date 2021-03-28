<template>

  <div class="container">
    <div class="flex justify-center flex-wrap">
      <div v-for="(item,key) in objectDatabase" class="m-10" :key="key">
        <v-card
          width="350"
          elevation="24"
          outlined
          shaped
        >

          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>{{key}}</v-card-title>

          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="2.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">
                4.5 (413)
              </div>
            </v-row>

            <div class="my-4 text-xl">
              {{item.municipality}}
            </div>

            <div><span class="font-bold">Dirección:</span> {{item.address}}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="reserve"
            >
              Centrar en el mapa
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    {{this.objectDatabase}}
    <div class="flex justify-center">
      <LeafLetMap/>
    </div>
  </div>

</template>

<script>
import LeafLetMap from "../components/LeafLetMap";
import { mapGetters } from "vuex";

export default {
  name: "About",
  components: {
    LeafLetMap,
  },
  computed: {
    ...mapGetters({
      objectDatabase: "categoryObjectDatabase",
    }),
  },
  mounted () {
    this.getValuesDatabase();
  },
};
</script>

<style>

</style>
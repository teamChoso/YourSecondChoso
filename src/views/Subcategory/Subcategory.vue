<template>
  <div class="container">
    <v-combobox
      class="mx-auto w-8/12"
      v-model="chips"
      :items="items"
      chips
      clearable
      label="Seleccione la isla"
      multiple
      prepend-icon="mdi-filter-variant"
      solo
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click="select"
          @click:close="remove(item)"
        >
          <strong>{{ item }}</strong>
        </v-chip>
      </template>
    </v-combobox>

    <div class="flex justify-center flex-wrap">
      <div v-for="(item,key) in objectDatabase" class="m-10" :key="key">
        <v-card
          v-if="(chips.includes(item.island)) || (chips.length === 0)"
          width="350"
          elevation="24"
          outlined
          shaped
        >
          <v-img
            height="250"
            :src="imgURL"
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
              @click="updateCenterMap([Number(item.latitude), Number(item.longitude)])"
            >
              Centrar en el mapa
            </v-btn>
            <v-btn
              v-if="subCategory === 'Tiendas'"
              color="#e4b61a"
              text
              @click="shop"
            >
              Ir a la tienda
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <div class="flex justify-center">
      <LeafLetMap :chips="chips"/>
    </div>
  </div>

</template>

<script>
import LeafLetMap from "../../components/LeafLetMap/LeafLetMap.vue";
import { mapGetters, mapActions } from "vuex";
import firebase from "firebase/app";

export default {
  name: "About Us",
  data () {
    return {
      chips: [],
      items: [],
      imgURL: "",
    };
  },
  components: {
    LeafLetMap,
  },
  computed: {
    ...mapGetters({
      objectDatabase: "categoryObjectDatabase",
      subCategory: "subCategory",
    }),
  },
  methods: {
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    assignCategories () {
      Object.entries(this.objectDatabase).forEach(([key, value]) => {
        if (!this.items.includes(value.island)) {
          this.items.push(value.island);
        }
      });
      console.log(this.items);
    },
    getSubcategoryImg () {
      firebase.storage().ref("/subcategory/" + this.subCategory + ".jpg").getDownloadURL().then((imgUrl) => {
        this.imgURL = imgUrl;
      }).then((res) => { console.log("Imagenes cargadas correctamente"); });
    },
    shop () {
      this.$router.replace({ name: "Shop" });
    },
    ...mapActions(["updateCenterMap"]),
  },
  updated () {
    this.assignCategories();
    this.getSubcategoryImg();
  },
  mounted () {
    this.getSubcategoryImg();
  },
};
</script>

<style>

</style>
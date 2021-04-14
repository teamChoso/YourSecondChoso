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

    <template v-for="i in Math.ceil(Object.entries(objectFiltered).length / 6)">
      <section v-if="page == i" :key="i">
        <div class="flex justify-center flex-wrap">
          <div v-for="(item,index) in Object.entries(objectFiltered).slice((i - 1) * 6, i * 6)" class="m-10" :key="index">
            <v-card
              width="350"
              elevation="24"
              outlined
              shaped
            >
              <v-img
                height="250"
                :src="imgURL"
              ></v-img>

              <v-card-title>{{Object.entries(objectFiltered)[index+currentPage][0]}}</v-card-title>

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
                  {{Object.entries(objectFiltered)[index+currentPage][1].municipality}}
                </div>
                <div><span class="font-bold">Dirección:</span> {{Object.entries(objectFiltered)[index+currentPage][1].address}}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="deep-purple lighten-2"
                  text
                  @click="updateCenterMap([Number(Object.entries(objectFiltered)[index+currentPage][1].latitude), Number(Object.entries(objectFiltered)[index+currentPage][1].longitude)])"
                >
                  Centrar en el mapa
                </v-btn>
                <v-btn
                  v-if="category === 'Tiendas'"
                  color="#e4b61a"
                  text
                  @click="shop(Object.entries(objectFiltered)[index+currentPage][1].island)"
                >
                  Ir a la tienda
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </section>
    </template>
    <div class="text-center mb-10">
      <v-pagination
        v-model="page"
        :length="Math.ceil(Object.entries(objectFiltered).length / 6)"
        circle
      ></v-pagination>
    </div>
    <div class="flex justify-center">
      <LeafLetMap :chips="chips"/>
    </div>
    <v-overlay
      z-index="0"
      :value="loading"
      >
        <v-progress-circular
          :size="100"
          :width="10"
          color="#e4b61a"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
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
      page: 1,
      currentPage: 0,
      loading: false,
    };
  },
  components: {
    LeafLetMap,
  },
  computed: {
    ...mapGetters({
      objectDatabase: "categoryObjectDatabase",
      category: "category",
      subCategory: "subCategory",
    }),
    objectFiltered () {
      return Object.fromEntries(Object.entries(this.objectDatabase).filter(([key, value]) => (this.chips.includes(value.island)) || (this.chips.length === 0)));
    },
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
    },
    getSubcategoryImg () {
      firebase.storage().ref("/subcategory/" + this.category + ".jpg").getDownloadURL().then((imgUrl) => {
        this.imgURL = imgUrl;
      }).then((res) => {
        console.log("Imagenes cargadas correctamente");
        setTimeout(() => { this.loading = false; }, 1000);
      });
    },
    shop (island) {
      localStorage.setItem("island", island);
      this.$router.replace({ name: "Shop" });
    },
    ...mapActions(["updateCenterMap"]),
  },
  updated () {
    this.assignCategories();
  },
  watch: {
    page () {
      if (this.page === 1) {
        this.currentPage = 0;
      }
      if (this.page === 2) {
        this.currentPage = 6;
      }
      if (this.page === 3) {
        this.currentPage = 12;
      }
      if (this.page === 4) {
        this.currentPage = 18;
      }
    },
    subCategory () {
      this.loading = true;
      this.assignCategories();
      this.getSubcategoryImg();
    },
  },
  mounted () {
    this.loading = true;
    this.getSubcategoryImg();
    this.assignCategories();
  },
};
</script>

<style>

</style>
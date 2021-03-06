<template>
  <div class="sizeMap">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="updateCenter"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      @click="showParagraph = false"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />

      <template v-for="(item,index) in markers">
        <l-marker v-if="(chips.includes(item.island)) || (chips.length === 0)" :lat-lng="item.latLong" :key="index" @click="showParagraph = false">
          <l-popup class="w-44">
            <div>
              <div class="flex justify-center text-xl font-semibold">{{item.name}}</div>
              <div class="flex justify-center">
                <button @click="showLongText" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
                  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 960 560">
                  <g id="Rounded_Rectangle_33_copy_4_1_">
                    <path d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937
                            c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937
                            c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"/>
                  </g>
                  </svg>
                  <span>Información</span>
                </button>
              </div>
              <div v-show="showParagraph">
                <ul>
                  <li class="font-serif text-base"><span class="font-bold">Ciudad: </span>{{item.town}}</li>
                  <li class="font-serif text-base"><span class="font-bold">Municipio: </span>{{item.municipality}}</li>
                  <li class="font-serif text-base"><span class="font-bold">Dirección: </span>{{item.address}}</li>
                </ul>
              </div>
            </div>
          </l-popup>
        </l-marker>
      </template>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import firebase from "firebase/app";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LeafletMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  props: {
    chips: {
      type: Array,
      default: null,
    },
  },
  data () {
    return {
      zoom: 13,
      center: latLng(0, 0),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
      markers: [],
      showParagraph: false,
      latitude: 0,
      longitude: 0,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      rtDatabase: firebase.database(),
    };
  },
  computed: {
    ...mapGetters({
      centerMap: "centerMap",
      category: "category",
      subCategory: "subCategory",
    }),
    updateCenter () {
      return latLng(this.centerMap[0], this.centerMap[1]);
    },
  },
  methods: {
    ...mapActions(["updateCategoryObjectDatabase", "updateCenterMap"]),
    zoomUpdate (zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate (center) {
      this.currentCenter = center;
    },
    showLongText () {
      this.showParagraph = !this.showParagraph;
    },
    assignValuesDatabase (objectDatabase) {
      this.markers = [];
      Object.entries(objectDatabase).forEach(([key, value]) => {
        this.markers.push({
          name: key,
          latLong: latLng(Number(value.latitude), Number(value.longitude)),
          municipality: value.municipality,
          town: value.town,
          address: value.address,
          island: value.island,
        });
        this.latitude = Number(value.latitude);
        this.longitude = Number(value.longitude);
      });

      this.updateCategoryObjectDatabase(objectDatabase);
      this.updateCenterMap([this.latitude, this.longitude]);
    },
    getValuesDatabase () {
      this.rtDatabase.ref("/" + this.category + "/" + this.subCategory).get()
        .then((snapshot) => {
          let objeto = "";
          if (snapshot.exists()) {
            objeto = snapshot.val();
          } else {
            console.log("No data available");
          }
          return (objeto);
        })
        .then((response) => {
          this.assignValuesDatabase(response);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  watch: {
    // Cada vez que la pregunta cambie, esta función será ejecutada
    subCategory: function () {
      this.getValuesDatabase();
    },
  },
  mounted () {
    this.getValuesDatabase();
  },
};
</script>

<style>
  .sizeMap{
    height: 55vh;
    width: 55vw;
  }
</style>
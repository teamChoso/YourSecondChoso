<template>
  <div class="sizeMap">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :lat-lng="withPopup">
        <l-popup>
          <div>
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div>
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import firebase from "firebase/app";
import "firebase/database";

export default {
  name: "LeafletMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
  },
  data () {
    return {
      zoom: 13,
      center: latLng(28.3647389, -16.4031035),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
      withPopup: latLng(0, 0),
      withTooltip: latLng(0, 0),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      latitude: 0,
      longitude: 0,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      rtDatabase: firebase.database().ref("/"),
    };
  },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate (center) {
      this.currentCenter = center;
    },
    showLongText () {
      this.showParagraph = !this.showParagraph;
    },
    setValuesDatabase (lat, long) {
      this.withPopup = latLng(lat, long);
    },
    getValuesDatabase () {
      this.rtDatabase.child("Restaurante").child("Los Rincones").get()
        .then(function (snapshot) {
          let objeto = "";
          if (snapshot.exists()) {
            // Console.log(snapshot.val());
            objeto = snapshot.val();
          } else {
            console.log("No data available");
          }
          return (objeto);
        })
        .then((response) => {
          this.setValuesDatabase(Number(response.latitude), Number(response.longitude));
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  mounted () {
    this.getValuesDatabase();
  },
};
</script>

<style>
  .sizeMap{
    height: 50vh;
    width: 50vw;
  }
</style>
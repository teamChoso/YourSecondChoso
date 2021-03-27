<template>
  <div class="container">
    <h1>Bienvenid@ {{user.data.email}}!</h1>
    <hr>
        <v-form class="loginForm" @submit.prevent="pressed"
          ref="form"
        >
          <div class="grid grid-cols-12">
            <v-select
              :items="items"
              class="col-start-4 col-span-5"
              label="Categorías"
              dense
              v-model="category"
              outlined
            ></v-select>
          </div>
          <div class="grid grid-cols-12">
            <v-text-field
              class="col-start-4 col-span-5"
              type="text"
              v-model="elementCategory"
              label="Elemento"
              required
            ></v-text-field>
          </div>

          <template v-if="category === 'Restaurante'">
            <div class="grid grid-cols-12">
              <v-text-field
                class="col-start-4 col-span-5"
                type="text"
                v-model="municipality"
                label="Municipio"
                required
              ></v-text-field>
            </div>

            <div class="grid grid-cols-12">
              <v-text-field
                class="col-start-4 col-span-5"
                type="text"
                v-model="town"
                label="Población"
                required
              ></v-text-field>
            </div>

            <div class="grid grid-cols-12">
              <v-text-field
                class="col-start-4 col-span-5"
                type="text"
                v-model="address"
                label="Dirección"
                required
              ></v-text-field>
            </div>
          </template>

          <div class="grid grid-cols-12">
            <v-text-field
              class="col-start-4 col-span-2"
              v-model="latitude"
              type="text"
              name="input-10-1"
              label="Latitud"
            ></v-text-field>

            <v-text-field
              class="col-start-7 col-span-2"
              v-model="longitude"
              type="text"
              name="input-10-1"
              label="Longitud"
            ></v-text-field>
          </div>

          <div class="grid grid-cols-12">
            <v-btn
              color="#e4b61a"
              class="col-start-5 col-span-3 login-btn"
              rounded
              dark
              type="submit"
            >
              Guardar en la BD
            </v-btn>
          </div>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/database";

export default {
  data () {
    return {
      category: "",
      elementCategory: "",
      latitude: "",
      longitude: "",
      municipality: "",
      town: "",
      address: "",
      rtDatabase: firebase.database(),
      items: ["Restaurante", "Tienda", "Evento", "Otra categoría"],
    };
  },
  methods: {
    pressed () {
      this.rtDatabase.ref("/" + this.category + "/" + this.elementCategory).set({
        latitude: this.latitude,
        longitude: this.longitude,
        municipality: this.municipality,
        town: this.town,
        address: this.address,
      }).then((response) => {
        this.category = "";
        this.elementCategory = "";
        this.latitude = "";
        this.longitude = "";
        this.municipality = "";
        this.town = "";
        this.address = "";
      });
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>

<style scoped>
h1 {
  margin: 50px;
  font-size: 30px;
}
h1 {
  margin-top: 50px;
  font-size: 30px;
}
.loginForm {
  width: 1000px;
  margin: auto;
  margin-top: 60px;
}

.login-btn {
  color: white;
}
hr {
  margin:auto;
  width: 200px
}
</style>
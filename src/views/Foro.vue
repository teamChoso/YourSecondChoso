<template>
  <div class="container">
    <h1>Bienvenid@ {{user.data.email}}!</h1>
    <hr>
      <ul>{{category}}</ul>
        <li v-for="(i,key) in dataDB" :key="key">
          {{i}}
        </li>

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
              v-model="message"
              label="Mensaje"
              required
            ></v-text-field>
          </div>

          <div class="grid grid-cols-12">
            <v-text-field
              class="col-start-4 col-span-5"
              type="text"
              v-model="valoration"
              label="Valoracion"
              required
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
      category: "Restaurante",
      message: "Default",
      valoration: "0",
      dataDB: null,
      rtDatabase: firebase.database(),
      items: ["Restaurante", "Tienda", "Evento", "Playa", "Otra categoría"],
    };
  },
  methods: {
    pressed () {
      this.rtDatabase.ref("/Foro/" + this.category).push({
        category: this.category,
        message: this.message,
        user: this.user.data.email,
        valoration: this.valoration,
      }).then((response) => {
        this.message = "";
        this.valoration = "";
      }).then((res) => { this.getValuesDatabase(); },
      );
    },
    getValuesDatabase () {
      this.rtDatabase.ref("/Foro/" + this.category).get()
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
          this.dataDB = response;
          // Console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  updated () {
    this.getValuesDatabase();
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
<template>
  <div class="container mb-10 w-2/3">
    <h1 class="mt-10 text-4xl font-bold mb-2">Foro para usuarios</h1>
    <hr class="mb-5" />
    <v-card>
      <v-toolbar
        flat
        color="#9b9183"
        dark
      >
        <v-toolbar-title v-if="catSelected">{{ category }}</v-toolbar-title>
        <v-toolbar-title v-else>Escoge una categoría</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-select
            :items="items"
            class="col-start-4 col-span-5"
            label="Categorías"
            dense
            v-model="category"
            outlined
          ></v-select>

        <div v-if="user.loggedIn">
          <div v-if="catSelected">
            <v-textarea
              filled
              v-model="message"
                label="Mensaje"
                maxlength="600"
                required
            ></v-textarea>
          </div>
        </div>

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="flex justify-start mb-4">
          <v-btn
            :disabled="(message == '')"
            color="#e4b61a"
            rounded
            dark
            type="submit"
            @click="pressed"
          >
            Enviar mensaje
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>

    <div v-if="error.status" class="error">{{error.message}}</div>
    <h1 class="mt-12 text-3xl" v-if="catSelected">Comentarios</h1>
    <div class="mt-7 flex flex-col-reverse">
      <div v-for="(i, key) in dataDB" :key="key">
        <!-- {{i.message}} -->
        <ForoMessage
          :name="i.user"
          :category="i.category"
          :msg="i.message"
          :date="i.date"
          :img="i.image"
          class="my-3 "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import ForoMessage from "../../components/Foro/ForoMessage.vue";

export default {
  data () {
    return {
      currentUser: firebase.auth().currentUser,
      category: "",
      message: "",
      valoration: "",
      date: "",
      dataDB: null,
      image: "",
      error: {
        status: false,
        message: "",
      },
      rtDatabase: firebase.database(),
      items: ["Restaurante", "Tienda", "Evento", "Playa", "Otra categoría"],
    };
  },
  methods: {
    pressed () {
      if (this.message === "") {
        this.error.message = "Debes introducir los datos";
        this.error.status = true;
      } else {
        this.error.status = false;
        this.rtDatabase
          .ref("/Foro/" + this.category)
          .push({
            category: this.category,
            message: this.message,
            user: this.user.data.email,
            valoration: this.valoration,
            date: this.date,
            image: this.currentUser.photoURL,
          })
          .then((response) => {
            this.message = "";
            this.valoration = "";
          })
          .then((res) => {
            this.getValuesDatabase();
          });
      }
    },
    getValuesDatabase () {
      this.rtDatabase
        .ref("/Foro/" + this.category)
        .get()
        .then(function (snapshot) {
          let objeto = "";
          if (snapshot.exists()) {
            // Console.log(snapshot.val());
            objeto = snapshot.val();
          } else {
            console.log("No data available");
          }
          return objeto;
        })
        .then((response) => {
          this.dataDB = response;
          // Console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    MyGetDate () {
      return (new Date().getFullYear() + "-" + (Number(new Date().getMonth()) + 1) + "-" + new Date().getDate());
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
    catSelected () {
      return this.category !== "";
    },
  },
  updated () {
    this.date = this.MyGetDate();
    this.getValuesDatabase();
  },
  components: {
    ForoMessage,
  },
  mounted () {

  },
};
</script>

<style scoped>
.error {
    width: 400px;
    padding: 30px;
    margin: 20px;
    font-size: 21px;
    margin: auto;
    margin-top: 20px;
    color: white;
    border-radius: 10px
}
hr {
  margin: auto;
  width: 200px;
}
</style>
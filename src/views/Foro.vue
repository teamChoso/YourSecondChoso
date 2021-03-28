<template>
  <div class="container mb-10">
    <h1 v-if="catSelected">{{ category }}</h1>
    <h1 v-else>Escoge una categoría</h1>
    <v-form class="w-3/5 m-auto mt-16 justify-items-center" @submit.prevent="pressed" ref="form">
        <div class="grid grid-cols-11">
          <v-select
            :items="items"
            class="col-start-4 col-span-5"
            label="Categorías"
            dense
            v-model="category"
            outlined
          ></v-select>
        </div>
        <div v-if="user.loggedIn">
          <div v-if="catSelected">
            <div class="grid grid-cols-11">
              <v-text-field
                class="col-start-4 col-span-5"
                type="text"
                v-model="message"
                label="Mensaje"
                required
              ></v-text-field>
            </div>

            <div class="grid grid-cols-11">
              <v-text-field
                class="col-start-4 col-span-5"
                type="text"
                v-model="valoration"
                label="Valoracion"
                required
              ></v-text-field>
            </div>

            <div class="grid grid-cols-11">
              <v-btn
                color="#e4b61a"
                class="col-start-5 col-span-3"
                rounded
                dark
                type="submit"
              >
                Enviar mensaje
              </v-btn>
            </div>
          </div>
        </div>
      </v-form>

    <div v-if="error.status" class="error">{{error.message}}</div>

    <div class="mt-7 flex flex-col-reverse">
      <div v-for="(i, key) in dataDB" :key="key">
        <!-- {{i.message}} -->
        <ForoMessage
          :name="i.user"
          :val="i.valoration"
          :category="i.category"
          :msg="i.message"
          :date="i.date"
          class="my-3 "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/database";
import ForoMessage from "../components/ForoMessage.vue";

export default {
  data () {
    return {
      category: "",
      message: "",
      valoration: "",
      date: "",
      dataDB: null,
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
      if (this.message === "" || this.valoration === "") {
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
h1 {
  margin-top: 50px;
  font-size: 30px;
}

</style>
<template>
  <div>
    <h1 class="mt-10 text-2xl">Modifica tus datos personales</h1>
    <div class="flex justify-center m-10">
      <div class="mr-3">
        <img :src="profileImage" alt="" class="h-40 w-40 m-auto" />
        <div class="flex items-center justify-center bg-grey w-60 mt-4">
          <label
            class="flex flex-col items-center py-3 bg-white text-blue rounded-lg border border-blue cursor-pointer hover:bg-blue hover:text-white"
          >
            Cambiar foto de perfil
            <svg
              class="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
              />
            </svg>
            <input
              accept="image/png"
              type="file"
              class="hidden"
              v-on:change.prevent="saveImage($event)"
            />
          </label>
        </div>
      </div>
      <div class="w-60 text-left p-5">
        <template>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="username"
              :rules="nameRules"
              label="Username"
              required
            ></v-text-field>

            <PrimaryButton v-if="username!=''" class="w-12 text-sm md:w-40 mb-2"
            name="Cambiar username"
             @click.native="changeUsername"
          />
          <div v-else class="error">Debe introducir datos.</div>
          </v-form>
        </template>
        <!-- <span class="inline-block align-text-bottom my-2"
          ><b>Username:</b> {{ dataDB.username }}
        </span>
        <span class="inline-block align-text-bottom my-2"
          ><b>Correo:</b> {{ dataDB.email }}</span
        > -->
      </div>
    </div>
    <div v-if="error" class="error mb-10">{{error}}</div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { mapGetters } from "vuex";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
export default {
  data () {
    return {
      currentUser: firebase.auth().currentUser,
      profileImage: "",
      username: "",
      email: "",
      error: "",
      allUsernames: "",
      rtDatabase: firebase.database(),
      dataDB: null,
      emailRules: [
        (v) => !!v || "E-mail requerido",
        (v) => /.+@.+\..+/.test(v) || "El e-mail debe ser válido",
      ],
      nameRules: [
        (v) => !!v || "Username requerido",
        (v) => (v && v.length >= 4) || "El username debe tener al menos 4 caracteres",
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    validate () {
      this.$refs.form.validate();
    },
    saveImage (e) {
      this.profileImage = e.target.files[0];
      const username = this.currentUser;
      e.target.value = "";
      firebase
        .storage()
        .ref("profile/" + username.uid + "/default.png")
        .put(this.profileImage)
        .then((response) => {
          firebase
            .storage()
            .ref("profile/" + username.uid + "/default.png")
            .getDownloadURL()
            .then((imgUrl) => {
              username.updateProfile({
                photoURL: imgUrl,
              });
            })
            .then((res) => {
              this.profileImage = username.photoURL;
              console.log("Imagenes cargadas correctamente");
            });
        });
    },
    changeUsername () {
      console.log("entro");
      if (this.checkUserExists(this.username) || this.username === "") {
        console.log("Usuario ya existe");
        this.error = "El nombre de usuario ya existe";
      } else {
        const username = this.currentUser;
        console.log(this.dataDB);
        this.rtDatabase.ref("/User/" + username.uid)
          .set({
            username: this.username,
            email: this.email,
          }).then((data) => {
            this.rtDatabase
              .ref("/UserTaken/" + this.dataDB.username.username).remove()
              .then((res) => {
                this.rtDatabase
                  .ref("/UserTaken/" + this.username).set({
                    username: this.username,
                  });
                console.log("Ta OK")
                  .catch((error) => (console.log(error)));
              });
          });
      }
    },
    changeEmail () {},
    checkUserExists (username) {
      return (username in this.allUsernames);
    },
  },
  mounted () {
    this.profileImage = this.currentUser.photoURL;
    const username = this.currentUser;
    this.rtDatabase
      .ref("/User/" + username.uid)
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
        this.username = response.username;
        this.email = response.email;
        console.log(this.dataDB);
      })
      .catch(function (error) {
        console.error(error);
      });

    this.rtDatabase
      .ref("/UserTaken")
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
        this.allUsernames = response;
        console.log("carmeen" in response);
        // Console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  components: {
    PrimaryButton,
  },
};
</script>

<style scoped>
img {
  border-radius: 50%;
}
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
</style>
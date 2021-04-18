<template>
  <div>
    <h1 class="mt-10 text-4xl font-bold mb-2">Modifica tus datos personales</h1>
    <hr />
    <div class="lg:flex justify-center lg:m-10">
      <div class="mr-3 bg-yellow rounded-md p-5">
        <img
          :src="profileImage"
          alt="Imagen de perfil"
          class="h-40 w-40 m-auto"
        />
        <div
          class="lg:flex lg:items-center lg:justify-center bg-grey w-60 lg:mt-4 m-auto"
        >
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
      <div class="lg:w-60 w-auto text-left p-5 lg:m-0 m-auto shadow-2xl">
        <template>
          <p><b>Username actual:</b> {{ currentUser.displayName }}</p>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="username"
              :rules="nameRules"
              label="Nuevo username"
              required
            ></v-text-field>

            <PrimaryButton
              v-if="username != ''"
              class="w-12 text-sm md:w-40 mb-2"
              name="Cambiar username"
              @click.native="changeUsername"
            />
            <div
              class="lg:w-48 lg:p-8 text-lg m-auto mt-5 text-white rounded-xl h-auto bg-red-500 text-center"
              v-else
            >
              Debe introducir datos.
            </div>
          </v-form>
        </template>
      </div>
    </div>
    <div v-if="error" class="error mb-10">{{ error }}</div>
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
        (v) =>
          (v && v.length >= 4) ||
          "El username debe tener al menos 4 caracteres",
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
              console.log(username);
              return imgUrl;
            })
            .then((res) => {
              console.log(res);
              this.profileImage = res;
              console.log("Imagenes cargadas correctamente");
            });
        });
    },
    changeUsername () {
      if (this.checkUserExists(this.username)) {
        console.log("Usuario ya existe");
        this.error = "El nombre de usuario ya existe";
      } else if (this.username === "") {
        console.log("Añadir algún usuario");
        this.error = "Debes añadir algún username";
      } else {
        this.error = "";
        const username = this.currentUser;
        console.log("Usuario disponible");
        this.rtDatabase
          .ref("/User/" + username.uid)
          .set({
            username: this.username,
            email: this.email,
          })
          .then((data) => {
            console.log("this.dataDB.username: ", this.dataDB.username);
            this.rtDatabase
              .ref("/UserTaken/" + this.dataDB.username)
              .remove()
              .then((res) => {
                this.rtDatabase
                  .ref("/UserTaken/" + this.username)
                  .set({
                    username: this.username,
                  })
                  .then((res2) => {
                    this.$swal({
                      title: "Nombre de usuario cambiado correctamente.",
                      button: { backgroundColor: "#9acd32" },
                      icon: "success",
                    });
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
                        this.currentUser.displayName = this.username;
                      })
                      .catch(function (error) {
                        console.error(error);
                      });
                  });
                console.log("Ta OK").catch((error) => console.log(error));
              });
          });
      }
    },
    checkUserExists (username) {
      return username in this.allUsernames;
    },
    changeUserSuccess () {
      this.$swal("Usuario creado con éxito");
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
        // This.username = response.username;
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
hr {
  margin: auto;
  width: 200px;
}
</style>
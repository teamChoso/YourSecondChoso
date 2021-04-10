<template>
    <div>
      <h1 class="mt-20 text-2xl">Registro</h1>
      <hr>
        <v-form class="mb-20" @submit.prevent="pressed"
          ref="form"
        >
          <v-text-field
            class="p-8 w-2/5 m-auto"
            type="email"
            v-model="email"
            label="E-mail"
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            class="p-8 w-2/5 m-auto"
            type="text"
            v-model="userName"
            label="Username"
            :rules="nameRules"
            required
          ></v-text-field>

          <v-text-field
            class="p-8 w-2/5 m-auto"
            v-model="password"
            type="password"
            name="input-10-1"
            label="Contraseña"
            :rules="passwordRules"
            counter
          ></v-text-field>

          <!-- <div class="pl-8 w-2/5 m-auto">
          <div class="grid grid-cols-12">
            <div>
              <v-checkbox
                v-model="uploadImage"
              ></v-checkbox>
            </div>

            <div class="col-start-2 col-span-4">
              <div v-if="uploadImage" class="flex items-center justify-center bg-grey w-40">
                <label class="flex flex-col items-center py-3 bg-white text-blue rounded-lg border border-blue cursor-pointer hover:bg-blue hover:text-white">
                  <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <input required accept="image/*" type='file' class="hidden" v-on:change.prevent="saveImage($event)"/>
                </label>
              </div>
            </div>
          </div>
          </div> -->
          <PrimaryButton
            name="Registrarse"
            type="submit"
          />
    </v-form>
    <div v-if="error!=''" class="error mb-10">{{error}}</div>

    </div>
</template>

<script>
import firebase from "firebase/app";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
export default {
  name: "Register",
  data () {
    return {
      email: "",
      password: "",
      userName: "",
      name: "",
      surname: "",
      error: "",
      userNameList: Array,
      dataDB: null,
      rtDatabase: firebase.database(),
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "El E-mail debe ser válido",
      ],
      nameRules: [
        (v) => !!v || "Username is required",
        (v) => (v && v.length >= 4) || "El username debe tener al menos 4 caracteres",
      ],
      passwordRules: [
        (v) => !!v || "Contraseña requerida",
        (v) => (v && v.length >= 6) || "La contraseña debe tener al menos 6 caracteres",
      ],
    };
  },
  methods: {
    pressed () {
      if (this.checkUserExists(this.userName)) {
        console.log("Usuario ya existe");
        this.error = "El nombre desuario ya existe";
      } else {
        firebase.storage().ref("profile/default/default.png").getDownloadURL().then((imgUrl) => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((data) => {
              data.user.updateProfile({
                displayName: this.userName,
                photoURL: imgUrl,
              });
            })
            .then(() => {
              this.rtDatabase
                .ref("/User/" + firebase.auth().currentUser.uid)
                .set({
                  email: this.email,
                  username: this.userName,
                })
                .then(() => {
                  this.rtDatabase
                    .ref("/UserTaken/" + this.userName).set({
                      username: this.userName,
                    });
                });
            })
            .then(() => {
              this.$router.replace({ path: "/" });
            })
            .catch((error) => (this.error = error));
        }).then((res) => {
          console.log("Imagenes cargadas correctamente");
        });
      }
    },
    checkUserExists (username) {
      console.log(this.dataDB);
      if (this.dataDB !== "") {
        return username in this.dataDB;
      }
      return false;
    },
  },
  mounted () {
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
        this.dataDB = response;
      })
      .catch(function (error) {
        this.error = error;
      });
  },
  components: {
    PrimaryButton,
  },
};
</script>

<style scoped>
/* Da error con lang=scss */
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
  margin:auto;
  width: 200px
}
</style>
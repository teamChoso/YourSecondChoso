<template>
    <div class="lg:flex lg:justify-center my-16">
      <div class="lg:justify-center lg:bg-blue lg:block hidden">
        <img
          src="logo_transparent.png"
          alt="Logo de Your Second Choso"
          class="lg:w-52 lg:h-52 w-12 h-12 mt-9"
        />
        <!-- <p class="text-white">Acceda a su cuenta para disfrutar de las ventajas de ser usuario</p> -->
      </div>
      <div  class="lg:w-2/5 shadow-2xl">
        <h1 class="mt-10 text-4xl font-bold mb-2">Registro</h1>
        <hr>
          <v-form class="mb-20" @submit.prevent="pressed"
            ref="form"
          >
            <v-text-field
              class="p-8 w-3/5 m-auto"
              type="email"
              v-model="email"
              label="E-mail"
              :rules="emailRules"
              required
            ></v-text-field>

            <v-text-field
              class="p-8 w-3/5 m-auto"
              type="text"
              v-model="userName"
              label="Username"
              :rules="nameRules"
              required
            ></v-text-field>

            <v-text-field
              class="p-8 w-3/5 m-auto"
              v-model="password"
              type="password"
              name="input-10-1"
              label="Contraseña"
              :rules="passwordRules"
              counter
            ></v-text-field>
            <PrimaryButton
              name="Registrarse"
              type="submit"
            />
        </v-form>
        <div v-if="error!=''" class="error mb-10">{{error}}</div>
      </div>
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
        (v) =>
          (v && v.length >= 4) ||
          "El username debe tener al menos 4 caracteres",
      ],
      passwordRules: [
        (v) => !!v || "Contraseña requerida",
        (v) =>
          (v && v.length >= 6) ||
          "La contraseña debe tener al menos 6 caracteres",
      ],
    };
  },
  methods: {
    pressed () {
      if (this.checkUserExists(this.userName)) {
        console.log("Usuario ya existe");
        this.error = "El nombre desuario ya existe";
      } else {
        firebase
          .storage()
          .ref("profile/default/default.png")
          .getDownloadURL()
          .then((imgUrl) => {
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
                    this.rtDatabase.ref("/UserTaken/" + this.userName).set({
                      username: this.userName,
                    });
                  });
              })
              .then(() => {
                this.$router.replace({ path: "/" });
              })
              .catch((error) => (this.error = error));
          })
          .then((res) => {
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
  border-radius: 10px;
}
hr {
  margin: auto;
  width: 200px;
}
</style>
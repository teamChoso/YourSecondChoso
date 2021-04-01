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
            label="User name"
            :rules="nameRules"
            required
          ></v-text-field>

          <v-text-field
            class="p-8 w-2/5 m-auto"
            v-model="password"
            type="password"
            name="input-10-1"
            label="Password"
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

          <v-btn
            color="#e4b61a"
            class="mr-4"
            rounded
            dark
            type="submit"
          >
            Registrarse
          </v-btn>
    </v-form>
    <div v-if="error" class="error mb-10">{{error}}</div>

    </div>
</template>

<script>
import firebase from "firebase/app";
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
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      nameRules: [
        (v) => !!v || "Username is required",
        (v) => (v && v.length >= 4) || "Username must be at least 4 characters",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
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
                });
              this.rtDatabase
                .ref("/UserTaken/" + this.userName).set({
                  username: this.userName,
                });
              this.$router.replace({ name: "Profile" });
            })
            .catch((error) => (this.error = error));
        }).then((res) => { console.log("Imagenes cargadas correctamente"); });
        // If (!this.uploadImage) {

        /*
         * } else {
         *   firebase
         *     .auth()
         *     .createUserWithEmailAndPassword(this.email, this.password)
         *     .then((data) => {
         *       console.log(data.uid);
         *       firebase.storage().ref("profile/" + data.uid + "/default.png").put(this.profileImage).then((response) => {
         *         const username = this.username;
         *         firebase.storage().ref("profile/" + data.uid + "/default.png").getDownloadURL().then((imgUrl) => {
         *           data.user.updateProfile({
         *             displayName: username,
         *             photoURL: imgUrl,
         *           });
         *         }).then((res) => { console.log("Imagenes cargadas correctamente"); });
         *       });
         *     })
         *     .then(() => {
         *       this.rtDatabase
         *         .ref("/User/" + firebase.auth().currentUser.uid)
         *         .set({
         *           email: this.email,
         *           username: this.userName,
         *         });
         *       this.rtDatabase
         *         .ref("/UserTaken/" + this.userName).set({
         *           username: this.userName,
         *         });
         *       this.$router.replace({ name: "Profile" });
         *     })
         *     .catch((error) => (this.error = error));
         * }
         */
      }
    },
    checkUserExists (username) {
      return (username in this.dataDB);
    },
    /*
     * SaveImage (e) {
     *   this.profileImage = e.target.files[0];
     *   console.log(e.target.files[0]);
     * },
     */
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
        console.log("carmeen" in response);
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
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
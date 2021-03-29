<template>
    <div>
      <h1 class="mt-20 text-2xl">Register</h1>
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

          <v-btn
            color="#e4b61a"
            class="mr-4"
            rounded
            dark
            type="submit"
          >
            Register
          </v-btn>
    </v-form>
    <div v-if="error" class="error mb-10">{{error}}</div>

    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
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
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            data.user.updateProfile({
              displayName: this.userName,
            });
          // Console.log(data);
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
      }
    },
    checkUserExists (username) {
      return (username in this.dataDB);
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
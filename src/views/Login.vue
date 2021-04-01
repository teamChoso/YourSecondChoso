<template>
    <div>
        <h1 class="mt-20 text-2xl">Login</h1>
        <hr>
        <v-form class="mb-20" @submit.prevent="pressed"
          ref="form"
        >
          <v-text-field
            class="p-8 w-2/5 m-auto"
            type="email"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            class="p-8 w-2/5 m-auto"
            v-model="password"
            type="password"
            name="input-10-1"
            label="Password"
            :rules="passwordRules"
          ></v-text-field>

          <v-btn
            color="#e4b61a"
            class="mr-4"
            rounded
            dark
            type="submit"
          >
            Login
          </v-btn>
    </v-form>
        <div v-if="error" class="error mb-10">{{error.message}}</div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Login",
  data () {
    return {
      email: "",
      password: "",
      error: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
      ],
    };
  },
  methods: {
    pressed () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          console.log(data);
          this.$router.replace({ name: "Profile" });
        })
        .catch((error) => {
          this.error = error;
        });
    },
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
  margin:auto;
  width: 200px
}
</style> ;,
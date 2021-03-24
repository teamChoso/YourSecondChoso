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
            required
          ></v-text-field>

          <v-text-field
            class="p-8 w-2/5 m-auto"
            v-model="password"
            type="password"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
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
    <div v-if="error" class="error">{{error.message}}</div>

    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  methods: {
    pressed () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.updateProfile({
            displayName: this.email,
          });
          console.log("here");
          this.$router.replace({ name: "example" });
        })
        .catch((error) => (this.error = error));
    },
  },
  data () {
    return {
      email: "",
      password: "",
      error: "",
    };
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
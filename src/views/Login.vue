<template>
    <div>
        <h1>Login</h1>
        <hr>
        <v-form class="loginForm" @submit.prevent="pressed"
          ref="form"
        >
          <v-text-field
            class="login-input"
            type="email"
            v-model="email"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            class="login-input"
            v-model="password"
            type="password"
            name="input-10-1"
            label="Password"
          ></v-text-field>

          <v-btn
            color="#e4b61a"
            class="mr-4 login-btn"
            rounded
            dark
            type="submit"
          >
            Login
          </v-btn>
    </v-form>
        <div v-if="error" class="error">{{error.message}}</div>
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
    };
  },
  methods: {
    pressed () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          console.log(data);
          this.$router.replace({ name: "addCategory" });
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
h1 {
  margin-top: 50px;
  font-size: 30px;
}
.loginForm {
  width: 1000px;
  margin: auto;
  margin-top: 60px;
}

.login-btn {
  color: white;
}

.login-input{
  width: 600px;
  margin: auto;
}
hr {
  margin:auto;
  width: 200px
}
</style>
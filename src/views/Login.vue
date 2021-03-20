<template>
    <div>
        Login
        <form @submit.prevent="pressed">
            <div class="login">
                <input type="email" v-model="email" placeholder="login">
            </div>
            <div class="password">
                <input type="password" v-model="password" placeholder="password">
            </div>
            <button type="submit">Login</button>
        </form>
        <div v-if="error" class="error">{{error.message}}</div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
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
          this.$router.replace({ name: "About" });
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },

};
</script>

<style scoped>
div {
  color: inherit;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
.error {
  color: red;
}
</style>
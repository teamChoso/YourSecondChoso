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
            label="Contraseña"
            :rules="passwordRules"
          ></v-text-field>

          <PrimaryButton
            name="Iniciar Sesión"
            type="submit"
          />
    </v-form>
        <div v-if="error" class="error mb-10">{{error.message}}</div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
export default {
  name: "Login",
  data () {
    return {
      email: "",
      password: "",
      error: "",
      emailRules: [
        (v) => !!v || "E-mail requerido",
        (v) => /.+@.+\..+/.test(v) || "El e-mail debe ser válido",
      ],
      passwordRules: [
        (v) => !!v || "Contraseña requerida",
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
          this.error.message = "Credenciales erróneas";
        });
    },
  },
  components: {
    PrimaryButton,
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
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
      <div class="lg:w-2/5 shadow-2xl">
        <h1 class="mt-10 text-4xl font-bold mb-2">Inicio de sesión</h1>
        <hr>
        <v-form class="mb-20" @submit.prevent="pressed"
          ref="form"
        >
          <v-text-field
            class="p-8 w-3/5 m-auto"
            type="email"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            class="p-8 w-3/5 m-auto"
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
      passwordRules: [(v) => !!v || "Contraseña requerida"],
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
  border-radius: 10px;
}

hr {
  margin: auto;
  width: 200px;
}
</style> ;,
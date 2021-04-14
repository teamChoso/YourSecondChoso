<template>
  <div>
    <template>
      <v-row justify="space-around">
        <v-menu
          rounded="rounded"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
              rounded
              dark
              color="#e4b61a"
              class="white--text ma-5"
              v-on="on"
            >
              Mostrar
            </v-btn>
          </template>

          <v-list v-if="!user.loggedIn"  class="bg-black">
              <v-list-item-title><router-link :to="{path: '/login'}"><span class="text-black">Iniciar sesión</span> </router-link></v-list-item-title>
              <v-list-item-title><router-link :to="{path: '/register'}"><span class="text-black">Registro</span> </router-link></v-list-item-title>
          </v-list>

          <v-list v-if="user.loggedIn" class="bg-black">
              <v-list-item-title><router-link :to="{path: '/profile'}"><span class="text-black">Perfil</span></router-link></v-list-item-title>
              <v-list-item-title @click="signOut"><router-link :to="{path: '/login'}"><span class="text-black">Cerrar sesión</span></router-link></v-list-item-title>
          </v-list>
        </v-menu>
      </v-row>
    </template>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { mapGetters } from "vuex";

export default {
  methods: {
    signOut () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "login" });
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
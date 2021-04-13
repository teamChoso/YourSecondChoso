<template>
  <v-footer
    color="#2c3258"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="(value,index) in paths"
        :key="index"
        color="white"
        text
        rounded
        @click="changeView(value.path)"
        class="my-2"
      >
        {{ value.name }}
      </v-btn>
      <v-col
        class="bg-blue lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>YSC</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    paths: [
      { name: "Inicio", path: "/" },
      { name: "Nosotros", path: "/about" },
      { name: "Foro", path: "/foro" },
      { name: "Contacto", path: "/chat" },
    ],
  }),
  methods: {
    changeView (path) {
      this.$router.replace({ path: path });
    },
  },
};
</script>
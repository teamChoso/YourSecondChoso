<template>
  <div class ="flex justify-center w-auto w-64">
    <div class="mt-4">
      <v-avatar
      size="50px">
        <img
        src="https://librenoticias.com/wp-content/uploads/2020/08/default-user-image.png"
        :alt="name"
      >
      </v-avatar>
    </div>
    <div class="p-3 w-2/3">
      <v-card elevation="2" outlined class="">
        <v-card-title class="text-blue inline justify-start">{{name}}</v-card-title>
        <v-card-subtitle class="text-blue inline justify-self-end">{{date}}</v-card-subtitle>
        <v-card-text class="text-blue">{{msg}}</v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    msg: {
      type: String,
      default: "",
    },
    val: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
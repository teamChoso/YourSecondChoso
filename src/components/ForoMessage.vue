<template>
  <div>
    <v-card elevation="2" outlined shaped class="p-3 w-2/3 m-auto">
        <v-card-title class="text-mustard">{{name}}</v-card-title>
        <v-card-subtitle class="text-blue">{{date}}</v-card-subtitle>
        <v-card-text class="text-blue">{{msg}}</v-card-text>
    </v-card>
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
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div>
    <v-card elevation="2" outlined shaped>
        <v-card-title>{{name}}</v-card-title>
        <v-card-subtitle>{{category}}</v-card-subtitle>
        <v-card-text>{{msg}}</v-card-text>
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
<template>
    <div>
        <v-btn v-if="type===''"
            rounded
            dark
            color="#e4b61a"
            :to="path"
          >
          {{name}}
          </v-btn>
          <v-btn v-if="type!==''"
            rounded
            dark
            color="#e4b61a"
            :type="type"
          >
          {{name}}
          </v-btn>
    </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    path: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
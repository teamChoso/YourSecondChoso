<template>
  <div class ="lg:flex lg:flex-col lg:w-auto lg:my-7 lg:h-40 px-8">
    <div class ="lg:flex lg:items-stretch shadow-2xl my-auto">
      <div class="lg:w-40 lg:ml-6 lg:mr-10 my-auto">
        <v-avatar
        size="70px">
          <img
          :src="img"
          :alt="name"
        >
        </v-avatar>
        <div class="mt-3">
          <div class="text-blue font-bold">{{name}}</div>
          <div class="text-blue italic">{{date}}</div>
        </div>
      </div>
      <div class="w-8/9 my-auto p-3">
        <div class="text-blue mx-auto text-xl my-4 mr-4">{{msg}}</div>
      </div>
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
    img: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
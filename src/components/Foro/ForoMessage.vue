<template>
  <div class ="flex flex-col w-auto h-36 px-8">
    <div class ="flex items-stretch shadow-2xl my-auto">
      <div class="w-4 ml-6 mr-20 my-auto">
        <v-avatar
        size="70px">
          <img
          src="https://librenoticias.com/wp-content/uploads/2020/08/default-user-image.png"
          :alt="name"
        >
        </v-avatar>
      </div>
      <div class="w-8/9 my-auto">
        <div class="flex justify-start">
          <div class="text-blue font-bold">{{name}}</div>
          <div class="text-blue italic">{{date}}</div>
        </div>
        <div class="text-blue mx-auto text-xl">{{msg}}</div>
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
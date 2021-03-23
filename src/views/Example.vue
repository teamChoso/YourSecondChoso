<template>
  <div>
    <h1>Bienvenid@ {{user.data.email}}!</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 50px;
  font-size: 30px;
}
</style>
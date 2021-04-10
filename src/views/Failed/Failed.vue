<template>
  <div class="container bg-grey w-1/2 mt-6 pb-5 rounded-md">
    <h1 class="text-4xl font-bold my-2">Compra fallida</h1>
    <h2 class="text-2xl mb-3">Ha ocurrido un problema con su compra, lo siento</h2>
    <PrimaryButton
      name="Volver a la página"
      @click.native="returnIndex"
    />
  </div>
</template>

<script>
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

export default {
  methods: {
    returnIndex () {
      this.$router.replace({ path: "/" });
    },
  },
  components: {
    PrimaryButton,
  },
};
</script>

<style>

</style>
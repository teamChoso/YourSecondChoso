<template>

  <div class="container">
    <div class="flex justify-around mb-10">
      <div class="box-content h-48 w-48 bg-mustard">Caja1</div>
      <div class="box-content h-48 w-48 bg-grey">Caja2</div>
      <div class="box-content h-48 w-48 bg-yellow">Caja3</div>
    </div>
    <div class="flex justify-center">
      <LeafLetMap/>
    </div>
  </div>

</template>

<script>
import LeafLetMap from "../components/LeafLetMap";

export default {
  name: "About",
  components: {
    LeafLetMap,
  },

};
</script>

<style>

</style>
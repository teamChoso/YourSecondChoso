<template>
<div class="container">
  <div class="text-center my-20">
    <h1 class=" title-font  mb-4 text-4xl font-extrabold leading-10 tracking-tight sm:text-5xl sm:leading-none md:text-6xl">About Us</h1>
    <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quaerat soluta temporibus libero alias sint similique rem eos minima pariatur, sequi perspiciatis dolore tempore possimus ipsa molestias corrupti! Quis fuga repellendus pariatur earum accusantium cumque! Ad earum id iure minima temporibus deserunt, perferendis reiciendis magnam asperiores non sequi ducimus dignissimos.</p>
    <div class="flex mt-6 justify-center">
      <div class="w-40 h-1 rounded-full bg-indigo-500 inline-flex"></div>
    </div>
  </div>

  <!-- First Profile  -->
  <div class="grid grid-cols-4 my-5">
    <div class="col-span-3 h-64">
        <div class="flex justify-around items-center">

          <img src="https://http.cat/405" class="h-64" alt="">

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eveniet placeat voluptatum accusamus quia et laborum,
            saepe explicabo, quibusdam quidem facilis nemo dicta perferendis dolores quaerat expedita natus ducimus hic.</p>

        </div>
    </div>
  </div>

<!-- Second Profile -->
  <div class="grid grid-cols-4 my-5">
    <div class="col-start-2 col-span-3 h-64 bg-yellow">
        <div class="flex justify-around items-center">

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eveniet placeat voluptatum accusamus quia et laborum,
            saepe explicabo, quibusdam quidem facilis nemo dicta perferendis dolores quaerat expedita natus ducimus hic.</p>

          <img src="https://http.cat/405" class="h-64" alt="">

        </div>
    </div>
  </div>

<!-- Third Profile -->
  <div class="grid grid-cols-4 my-5">
    <div class="col-span-3 h-64">
        <div class="flex justify-around items-center">

          <img src="https://http.cat/405" class="h-64" alt="">

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eveniet placeat voluptatum accusamus quia et laborum,
            saepe explicabo, quibusdam quidem facilis nemo dicta perferendis dolores quaerat expedita natus ducimus hic.</p>

        </div>
    </div>
  </div>

</div>
</template>

<script>
<<<<<<< HEAD:src/views/About.vue
export default {

=======
import LeafLetMap from "../../components/LeafLetMap/LeafLetMap.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "About Us",
  data () {
    return {
      chips: [],
      items: [],
    };
  },
  components: {
    LeafLetMap,
  },
  computed: {
    ...mapGetters({
      objectDatabase: "categoryObjectDatabase",
    }),
  },
  methods: {
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    assignCategories () {
      Object.entries(this.objectDatabase).forEach(([key, value]) => {
        if (!this.items.includes(value.island)) {
          this.items.push(value.island);
        }
      });
      console.log(this.items);
    },
    ...mapActions(["updateCenterMap"]),
  },
  updated () {
    this.assignCategories();
  },
>>>>>>> main:src/views/Subcategory/Subcategory.vue
};
</script>

<style>

</style>
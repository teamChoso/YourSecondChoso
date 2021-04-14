<template>
<div class="container">
  <!-- About Us Title -->
  <div class="text-center my-20">
    <h1 class=" title-font  mb-4 text-4xl font-extrabold leading-10 tracking-tight sm:text-5xl sm:leading-none md:text-6xl text-blue">Sobre nosotros</h1>
    <p class="text-lg leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Donde las sociedades se juntan. Donde la diversidad es infinita. Donde la felicidad es un don innato y la tranquilidad reina. Desde estas tierras africanas, con carácter europeo y  pasión latina, te queremos mostrar lo mejor de las islas. <br>Nosotros, junto a <strong>Your Second Choso</strong>, seremos tu guía por ese camino que tanto tiene por descubrir. </p>
    <div class="flex mt-6 justify-center">
      <div class="w-96 h-1 rounded-full bg-blue inline-flex"></div>
    </div>
  </div>

  <!-- First Profile  -->
  <div class="grid grid-cols-4 my-5">
    <div class="col-span-3 h-64 rounded">
      <div class="grid grid-cols-3  rounded border-r-8 border-mustard ">
        <div class="col-span-1"><img src="../../assets/About/jp_juanpa.jpg" class="h-64 w-72 rounded-2xl" alt=""></div>
        <div class="col-span-2 h-64 text-left">
         <h1 class="text-2xl  text-blue font-bold">Juan Pablo Claros Romero</h1>
         <h2 class="text-xl mb-4 text-mustard">Front-End Developer |</h2>
         <p class="mr-4">Mas conocido como Juampi el palmero. Soy un apasionado de los videojuegos y todo aquello que tenga que ver con el desarrollo de aplicaciones y el auto aprendizaje. Me gusta practicar deportes, sobre todo el fútbol y comer arepitas de la arepera 23(recomendado 100%).</p>
         <a href="https://github.com/juanpabloclaros"><v-icon size=50 title="Github">mdi-github</v-icon></a>
         <a href="https://www.google.com"><v-icon size=50 title="Linkedin">mdi-linkedin</v-icon></a>
        </div>
      </div>
    </div>
  </div>

<!-- break line -->
    <div class="flex mt-6 justify-center">
      <div class="w-3/4 h-1 rounded-full bg-gray-300 inline-flex"></div>
    </div>

<!-- Second Profile -->
  <div class="grid grid-cols-4 my-5">
    <div class="col-start-2 col-span-4 h-64">
        <div class="grid grid-cols-3 rounded border-l-8 border-mustard ">
          <div class="col-span-2 h-64 text-right">
            <h1 class="text-2xl text-blue font-bold">Carmen Castro González</h1>
            <h2 class="mb-4 text-xl text-mustard">Front-End Developer |</h2>
            <p class=" ml-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, facilis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, accusantium?</p>
            <a href="https://www.google.com"><v-icon size=50 title="Linkedin">mdi-linkedin</v-icon></a>
            <a href="https://github.com/carcasgon"><v-hover value="true"><v-icon size=50 title="Github">mdi-github</v-icon></v-hover></a>
          </div>
          <div class="col-span-1 flex justify-end"><img src="../../assets/About/ca_carmen.jpg" class="h-64 w-72 rounded-2xl" alt=""></div>
        </div>
    </div>
  </div>

<!-- break line -->
    <div class="flex mt-6 justify-center">
      <div class="w-3/4 h-1 rounded-full bg-gray-300 inline-flex"></div>
    </div>

<!-- Third Profile -->
  <div class="grid grid-cols-4 my-5">
    <div class="col-span-3 h-64 rounded">
      <div class="grid grid-cols-3 rounded border-r-8 border-mustard ">
        <div class="col-span-1 h-64"><img src="../../assets/About/br_bruno.jpg" class="h-64 w-72 rounded-2xl" alt=""></div>
        <div class="col-span-2 h-64 text-left">
          <h1 class="text-2xl  text-blue font-bold">Bruno Aggierni</h1>
          <h2 class="text-xl mb-4 text-mustard">Front-End Developer | Campeón de chistes malos</h2>
          <p class="mr-4">Aventurero, explorador, políglota y amante del cafe. Fruta favorita: Papaya. Deporte favorito: Fútbol. Peor vino del mundo? - Vino mi suegra. </p>
          <a href="https://github.com/Braggiouy"><v-icon size=50 title="Github">mdi-github</v-icon></a>
          <a href="https://www.google.com"><v-icon size=50 title="Linkedin">mdi-linkedin</v-icon></a>
        </div>
      </div>
    </div>
  </div>

</div>

</template>

<script>
export default {
};
</script>
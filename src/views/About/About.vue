<template>
  <div class="container lg:none flex flex-wrap">
    <!-- About Us Title -->
    <div class="text-center my-5">
      <h1
        class="title-font mb-4 text-4xl font-extrabold leading-10 tracking-tight sm:text-5xl sm:leading-none md:text-6xl"
      >
        Sobre nosotros
      </h1>
      <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto w-3/4">
        Donde las sociedades se juntan. Donde la diversidad es infinita. Donde
        la felicidad es un don innato y la tranquilidad reina. Desde estas
        tierras africanas, con carácter europeo y pasión latina, te queremos
        mostrar lo mejor de las islas. <br />Nosotros, junto a
        <strong>Your Second Choso</strong>, seremos tu guía por ese camino que
        tanto tiene por descubrir.
      </p>
      <div class="flex mt-6 justify-center">
        <div class="w-96 h-1 rounded-full bg-blue inline-flex"></div>
      </div>
    </div>

    <div class="lg:mx-36">
      <!-- First Profile  -->
      <div class="lg:grid lg:grid-cols-4 my-5">
        <div class="lg:col-span-3 rounded">
          <div class="lg:grid lg:grid-cols-3 rounded border-r-8 border-mustard ">
            <div class="lg:col-span-1 m-auto">
              <img
                src="../../assets/About/jp_juanpa.jpg"
                class="lg:h-64 lg:w-72 rounded-2xl h-40 w-40 m-auto"
                alt=""
              />
            </div>
            <div class="col-span-2 lg:text-left lg:ml-5 justify-center">
              <h1 class="text-2xl text-blue font-bold m-auto">Juan Pablo Claros Romero</h1>
              <h2 class="text-xl mb-4 text-mustard">Front-End Developer | Palmero hasta la tumba</h2>
              <p class="lg:mr-4 mr-0">Mas conocido como Juampi el palmero. Apasionado de los videojuegos y todo lo relacionado con desarrollo de aplicaciones y el auto aprendizaje. Me gusta practicar deportes, sobre todo el fútbol y comer arepitas de la arepera 23(recomendado 100%).
              </p>
              <a href="https://github.com/juanpabloclaros"><v-icon size=50 title="Github">mdi-github</v-icon></a>
              <a href="https://www.linkedin.com/in/juan-pablo-claros-romero-9068b7188/"><v-icon size=50 title="Linkedin">mdi-linkedin</v-icon></a>
            </div>
          </div>
        </div>
      </div>

      <!-- break line -->
      <div class="flex mt-6 justify-center">
        <div class="w-3/4 h-1 rounded-full bg-gray-300 inline-flex"></div>
      </div>

      <!-- Second Profile -->
      <div class="lg:grid lg:grid-cols-4 my-5">
        <div class="lg:col-start-2 lg:col-span-4 ">
          <div class="lg:grid lg:grid-cols-3 rounded border-l-8 border-mustard ">
            <div class="lg:col-span-2 lg:mr-5 lg:text-right">
              <h1 class="text-2xl text-blue font-bold">Carmen Castro González</h1>
              <h2 class="mb-4 text-xl text-mustard">Front-End Developer |</h2>
              <p class="ml-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita, ad!              </p>
              <a href="https://www.google.com"><v-icon size=50 title="Linkedin">mdi-linkedin</v-icon></a>
              <a href="https://github.com/carcasgon"><v-hover value="true"><v-icon size=50 title="Github">mdi-github</v-icon></v-hover></a>
            </div>
            <div class="col-span-1 flex justify-end">
              <img
                src="../../assets/About/ca_carmen.jpg"
                class="lg:h-64 lg:w-72 rounded-2xl h-40 w-40 m-auto"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <!-- break line -->
      <div class="flex mt-6 justify-center">
        <div class="w-3/4 h-1 rounded-full bg-gray-300 inline-flex"></div>
      </div>

      <!-- Third Profile -->
      <div class="lg:grid lg:grid-cols-4 my-5">
        <div class="lg:col-span-3 rounded">
          <div class="lg:grid lg:grid-cols-3 rounded border-r-8 border-mustard ">
            <div class="lg:col-span-1">
              <img
                src="../../assets/About/br_bruno.jpg"
                class="lg:h-64 lg:w-72 rounded-2xl h-40 w-40 m-auto"
                alt=""
              />
            </div>
            <div class="col-span-2 lg:ml-5 lg:text-left">
              <h1 class="text-2xl text-blue font-bold">Bruno Aggierni</h1>
              <h2 class="text-xl mb-4 text-mustard">Front-End Developer | Campeón de chistes malos</h2>
              <p class="mr-4">Aventurero, explorador, políglota y amante del cafe. Apasionado por viajar y perderse. Fruta favorita: Papaya. Deporte favorito: Fútbol. Peor vino del mundo? - Vino mi suegra. </p>
              <a href="https://github.com/Braggiouy"><v-icon size=50 title="Github">mdi-github</v-icon></a>
              <a href="https://www.linkedin.com/in/bruno-aggierni/"><v-icon size=50 title="Linkedin">mdi-linkedin</v-icon></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<template>
  <div class="container">
    <div class="flex justify-center flex-wrap">
      <div v-for="(item,index) in filterIsland" class="m-10" :key="index">
        <v-card
          width="350"
          elevation="24"
          outlined
          shaped
        >
          <v-img
            height="250"
            :src="item.path"
          ></v-img>

          <v-card-title>{{item.name}}</v-card-title>

          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >

              <div class="text-lg">
                <span class="font-bold">Cantidad:</span> {{item.amount}}
              </div>
            </v-row>

            <div class="my-4 text-xl">
              <span class="font-bold">Precio:</span> {{item.eur}}
            </div>
            <div>{{item.description}}</div>
          </v-card-text>

          <v-card-actions>

            <v-btn
              color="deep-purple lighten-2"
              text
              @click="addOne(index)"
            >
              Añadir
            </v-btn>
            <v-btn
              color="#e4b61a"
              text
              @click="removeOne(index)"
            >
              Quitar
            </v-btn>
            <v-btn
              color="red"
              text
              @click="buy"
            >
              Ir al carrito
            </v-btn>
          </v-card-actions>

        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Shop",
  data () {
    return {
      products:
      [
        { islands: ["La Palma", "Tenerife", "Lanzarote", "Fuerteventura", "Gran Canaria"], path: require("../../assets/tienda/arehucasBlanco.jpg"), name: "Arehucas Oro", description: "Arehucas Oro es un ron de aroma ligero aunque bien definido, equilibrado, con el sabor preciso para dejar su sello en cualquier combinado, o producto de repostería.", price: "price_1Ie1U3JbbCeLpGyvR3Qt8OVW", amount: 0, eur: "10,30€" },
        { islands: ["La Palma", "Tenerife", "Gran Canaria", "La Gomera", "El Hierro"], path: require("../../assets/tienda/arehucasOro.jpg"), name: "Arehucas Blanco", description: "Ron Arehucas es una marca de ron que es fabricada en el municipio de Arucas, Gran Canaria con caña de azúcar.", price: "price_1Ie1SbJbbCeLpGyvDtrwE5fo", amount: 0, eur: "10,20€" },
        { islands: ["La Gomera", "Tenerife", "Lanzarote", "Gran Canaria", "El Hierro"], path: require("../../assets/tienda/mojoVerde.jpg"), name: "Mojo Verde", description: "El mojo verde canario es una salsa hecha a base de cilantro y ajo muy utilizada en la gastronomía canaria y que tiene miles de usos.", price: "price_1Ie1QdJbbCeLpGyv90RWjkCa", amount: 0, eur: "4,85€" },
        { islands: ["La Palma", "Tenerife", "Gran Canaria", "Fuerteventura", "La Gomera"], path: require("../../assets/tienda/mojoRojo.jpg"), name: "Mojo Rojo", description: "El mojo picón es el acompañamiento indispensable de algunos platos típicos de la gastronomía canaria como las papas arrugadas.", price: "price_1Ie1O8JbbCeLpGyv6kbZVYSp", amount: 0, eur: "4,60€" },
        { islands: ["La Gomera", "Tenerife", "Gran Canaria", "Fuerteventura", "El Hierro"], path: require("../../assets/tienda/chorizoTeror.jpg"), name: "Chorizo de Teror", description: "El chorizo canario es un chorizo de pasta blanda típico de Canarias.", price: "price_1Ie1MdJbbCeLpGyvXk64o3IL", amount: 0, eur: "4,85€" },
        { islands: ["Gran Canaria", "La Gomera", "El Hierro"], path: require("../../assets/tienda/bienmesabe.jpg"), name: "Bienmesabe", description: "Bienmesabe es un postre popular en la cocina de las Islas Canarias, donde se sirve con galletas de lengua de gato.", price: "price_1Ie1JsJbbCeLpGyvDY5BFKuI", amount: 0, eur: "6,40€" },
        { islands: ["La Palma", "Tenerife", "La Gomera", "El Hierro"], path: require("../../assets/tienda/quesoHerreño.jpg"), name: "Queso Herreño", description: "El queso herreño es un queso de leche de cabra, vaca y oveja cruda elaborado en El Hierro, la isla más occidental y meridional de las Islas Canarias, situada en el océano Atlántico.", price: "price_1Ie1H2JbbCeLpGyvEAHYEqTi", amount: 0, eur: "19,70€" },
        { islands: ["La Palma", "Tenerife", "Lanzarote", "Fuerteventura"], path: require("../../assets/tienda/clipper.jpg"), name: "Clipper de fresa", description: "Clipper es un refresco de origen español. Comenzó a fabricarse en 1956 en las Islas Canarias y cuenta con varios sabores, destacando el de fresa como el más vendido y representativo de la marca.", price: "price_1Ie1BDJbbCeLpGyv0zufKUsP", amount: 0, eur: "1,78€" },
        { islands: ["Lanzarote", "Fuerteventura", "Gran Canaria", "La Gomera", "El Hierro"], path: require("../../assets/tienda/doradaEspecial.png"), name: "Dorada Especial Negra", description: "Cerveza tipo Pilsen, elaborada con métodos tradicionales y los mejores ingredientes naturales, 100% malta. Tiene un aroma y sabor suave, así como un agradable color dorado.", price: "price_1Ie18RJbbCeLpGyviwsuf4Of", amount: 0, eur: "1,50€" },
        { islands: ["Lanzarote", "Fuerteventura"], path: require("../../assets/tienda/tropical.jpg"), name: "Cerveza Tropical", description: "Su aroma es muy suave. Predomina la malta con toques ácidos. Su sabor también es muy suave con toques frutales y un amargor muy agradable.", price: "price_1Ie14cJbbCeLpGyvYCvvcRu5", amount: 0, eur: "1,50€" },
        { islands: ["La Palma", "Tenerife", "Lanzarote", "Fuerteventura", "Gran Canaria"], path: require("../../assets/tienda/morcilla.jpg"), name: "Morcilla dulce canaria", description: "La morcilla canaria se elabora con sangre de cerdo, tocino y magro y se le añade, pasas, almendras y especias como el orégano y la canela.", price: "price_1Ie12IJbbCeLpGyvtpQYgAmj", amount: 0, eur: "5,49€" },
        { islands: ["Fuerteventura", "Gran Canaria", "La Gomera"], path: require("../../assets/tienda/gofio.jpg"), name: "Gofio", description: "El Gofio es un alimento conformado por una harina no cernida de cereales tostados, generalmente de trigo o millo, usada en diferentes preparaciones alimenticias.", price: "price_1Ie0o2JbbCeLpGyv6gjebXiP", amount: 0, eur: "1,64€" },
        { islands: ["Tenerife", "Lanzarote", "Fuerteventura", "Gran Canaria"], path: require("../../assets/tienda/almogrote.jpeg"), name: "Almogrote", description: "El almogrote​ es un mojo con textura de paté, elaborado a base de queso añejo, típico de La Gomera, muy sabroso y ligeramente picante.", price: "price_1IdJhKJbbCeLpGyvdy3mPYkq", amount: 0, eur: "4,00€" },
      ],
      island: localStorage.getItem("island"),
    };
  },
  methods: {
    addOne (index) {
      this.filterIsland[index].amount = this.filterIsland[index].amount + 1;
    },
    removeOne (index) {
      if (this.filterIsland[index].amount > 0) {
        this.filterIsland[index].amount = this.filterIsland[index].amount - 1;
      }
    },
    buy () {
      const products = [];
      this.filterIsland.forEach((item) => {
        if (item.amount > 0) {
          products.push(item);
        }
      });
      this.updateProductsCart(products);
      this.$router.replace({ name: "Cart" });
    },
    ...mapActions(["updateProductsCart"]),
  },
  computed: {
    filterIsland () {
      return this.products.filter((item) => item.islands.includes(this.island));
    },
  },
};
</script>

<style>

</style>
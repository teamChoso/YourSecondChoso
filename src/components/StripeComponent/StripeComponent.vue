<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="v => loading = v"
    />
    <PrimaryButton class="w-12 text-sm md:w-40 mb-6" name="Comprar!" @click.native="assignProducts"/>
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { mapGetters } from "vuex";

export default {
  components: {
    StripeCheckout,
    PrimaryButton,
  },
  data () {
    this.publishableKey = "pk_test_51IdHiWJbbCeLpGyvYKr6TQ1BgmfciiDNb8uaQPgohMnrMaCFm9F7HyaXSWk37xoawWFQgfmdgCtfCn80yrmeSk9F00fkg4jI1Y";
    return {
      loading: false,
      lineItems: [],
      successURL: "https://yoursecondchoso.com/success",
      cancelURL: "https://yoursecondchoso.com/failed",
    };
  },
  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
    assignProducts () {
      const parsed = JSON.stringify(this.products);
      localStorage.setItem("products", parsed);
      this.products.forEach((product) => {
        this.lineItems.push({ price: product.price, quantity: product.amount });
      });
      this.submit();
    },
  },
  computed: {
    ...mapGetters({
      products: "products",
    }),
  },
};
</script>
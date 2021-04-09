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
    <button @click="submit">Pay now!</button>
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
export default {
  props: {
    items: {
      type: [],
      default: [{ price: "price_1IdJhKJbbCeLpGyvdy3mPYkq", quantity: 1 }],
    },
  },
  components: {
    StripeCheckout,
  },
  data () {
    this.publishableKey = "pk_test_51IdHiWJbbCeLpGyvYKr6TQ1BgmfciiDNb8uaQPgohMnrMaCFm9F7HyaXSWk37xoawWFQgfmdgCtfCn80yrmeSk9F00fkg4jI1Y";
    return {
      loading: false,
      lineItems: this.items,
      successURL: "https://tahichemena.github.io/curso_frontend_2019/stripe/success.html",
      cancelURL: "https://tahichemena.github.io/curso_frontend_2019/stripe/canceled.html",
    };
  },
  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>
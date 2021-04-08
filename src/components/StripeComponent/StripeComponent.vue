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
  components: {
    StripeCheckout,
  },
  data () {
    this.publishableKey = "pk_test_51IdHiWJbbCeLpGyvYKr6TQ1BgmfciiDNb8uaQPgohMnrMaCFm9F7HyaXSWk37xoawWFQgfmdgCtfCn80yrmeSk9F00fkg4jI1Y";
    return {
      loading: false,
      lineItems: [
        {
          price: "price_1IdJhKJbbCeLpGyvdy3mPYkq", // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
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
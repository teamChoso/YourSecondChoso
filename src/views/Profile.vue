<template>
    <div>
        <h1>Bienvenid@ {{user.data.email}}!</h1>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import "firebase/database";

export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>
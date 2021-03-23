<template>
    <div>
        Logged In
        <span v-if="loggedIn">Yes</span>
        <span v-else>No</span>
        <div>
            <button @click="signOut">Sign out</button>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data () {
    return {
      loggedIn: false,
    };
  },
  methods: {
    async signOut () {
      try {
        const data = await firebase.auth().signOut();
        console.log(data);
        this.$router.replace({ name: "login" });
      } catch (err) {

      }
    },
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  },
  mounted () {

  },
};
</script>

<style lang="scss" scoped>

</style>
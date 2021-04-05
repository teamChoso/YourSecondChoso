<template>
  <div class="container">
    <div class="wrapper">
      <header>
        <h1 class="text-3xl">YSC Chat</h1>
        <button class="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 border-b-4 border-purple-900 hover:border-purple-600 rounded" @click="finished">Terminar consulta</button>
      </header>
      <section>
        <main>
          <div v-for="(msg, index) in messages" v-bind:key="'index-'+index"
              :class="['message', sentOrReceived(msg.userUID)]">
            <img class="profilePhoto" :src="msg.photoURL" :alt="msg.displayName">
            <p v-if="msg.type == 'text'">{{ msg.text }}</p>
            <img v-if="msg.type == 'img'" class="imgChat" :src="msg.text" :alt="msg.displayName">
          </div>

          <div ref="scrollable"></div>
        </main>

        <form>
          <input class="input-text" v-model="message" type="text" placeholder="Escribe un mensaje!">
          <button class="bg-blue hover:bg-purple-900 font-bold py-2 px-4 border border-purple-900" :disabled="!message" v-on:click.prevent="sendMessage($event,'text')">📩</button>
          <div>
              <label class="w-24 h-full flex flex-col items-center py-7 bg-blue text-blue cursor-pointer hover:bg-purple-900">
                  <span class="">📎</span>
                  <input accept="image/*" type='file' class="hidden" v-on:change.prevent="sendMessage($event,'img')"/>
              </label>
          </div>
        </form>
    </section>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
  name: "Chat",
  mounted () {
    this.getMessages();
  },
  data () {
    return {
      user: firebase.auth().currentUser,
      db: firebase.firestore(),
      message: "",
      messages: [],
      type: "",
    };
  },
  methods: {
    sentOrReceived (userUID) {
      return userUID === this.user.uid ? "sent" : "received";
    },
    async sendMessage (e, type) {
      let messageInfo = {};
      if (type === "text") {
        messageInfo = {
          userUID: this.user.uid,
          type: type,
          displayName: this.user.displayName,
          photoURL: this.user.photoURL,
          text: this.message,
          alt: "",
          createdAt: Date.now(),
        };
        await this.db.collection("messages").add(messageInfo);
      } else {
        this.message = e.target.files[0];

        await firebase.storage().ref("images/" + this.user.uid + "/" + this.message.name).put(this.message).then((response) => {
          const altMessage = this.message.name;
          firebase.storage().ref("images/" + this.user.uid + "/" + this.message.name).getDownloadURL().then((imgUrl) => {
            this.db.collection("messages").add({
              userUID: this.user.uid,
              type: type,
              displayName: this.user.displayName,
              photoURL: this.user.photoURL,
              text: imgUrl,
              alt: altMessage,
              createdAt: Date.now(),
            });
          }).then((res) => { console.log("Imagenes cargadas correctamente"); });
        });
      }
      this.message = "";
      this.$refs.scrollable.scrollIntoView({ behavior: "smooth" });
    },
    finished () {
      this.$router.replace({ name: "Home" });
    },
    getMessages () {
      this.db.collection("messages").orderBy("createdAt")
        .onSnapshot((querySnap) => {
          this.messages = querySnap.docs.map((doc) => doc.data());
        });
    },
  },
  destroyed () {
    this.db.collection("messages").where("userUID", "==", this.user.uid).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.db.collection("messages").doc(doc.id).delete().then(() => {
            console.log("Document successfully deleted!");
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  },
};
</script>

<style lang="scss">
body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
  }
  .wrapper {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    header {
      background-color: rgb(58,58,58);
      height: 10vh;
      min-height: 50px;
      color: white;
      width: 100%;
      max-width: 728px;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 99;
      padding: 10px;
      box-sizing: border-box;
    }
    section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 80vh;
      background-color: #9b9183;
      main {
        padding: 10px;
        height: 80vh;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        &::-webkit-scrollbar {
          width: 0.25rem;
        }
        &::-webkit-scrollbar-track {
          background: #1e1e24;
        }
        &::-webkit-scrollbar-thumb {
          background: #6649b8;
        }
      }
      form {
        height: 10vh;
        bottom: 0;
        background-color: rgb(24, 23, 23);
        width: 100%;
        max-width: 728px;
        display: flex;
        font-size: 1.5rem;
        button {
          width: 20%;
        }
        .input-text {
          line-height: 1.5;
          width: 100%;
          font-size: 1.5rem;
          background: rgb(58, 58, 58);
          color: white;
          outline: none;
          border: none;
          padding: 0 10px;
        }
      }
    }
    button, input {
      color: #fff;
    }
    p {
      max-width: 500px;
      margin-bottom: 12px;
      line-height: 24px;
      padding: 10px 20px;
      border-radius: 25px;
      position: relative;
      color: white;
      text-align: center;
    }
    .message {
      display: flex;
      align-items: center;
      &.received {
        p {
          background: #e5e5ea;
          color: #000;
        }
      }
      &.sent {
        flex-direction: row-reverse;
        p {
          color: #fff;
          background: #0b93f6;
          align-self: flex-end;
        }
      }
      .profilePhoto {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 2px 5px;
      }
      .imgChat{
        width: 12vw;
        height: 10vh;
        border-radius: 10px;
        margin: 4px 5px;
      }
      p {
        max-width: 500px;
        margin-bottom: 12px;
        line-height: 24px;
        padding: 10px 20px;
        border-radius: 25px;
        position: relative;
        color: #fff;
        text-align: center;
      }
    }
  }
</style>
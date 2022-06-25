<template>
  <v-layout fill-height>

    <v-flex hidden-sm-and-down md6 bg-pink>
      <SideDescription />
    </v-flex>

    <v-flex xs12 md6 bg-white>
      <v-layout column wrap fill-height justify-center text-start class="form-header" mx-auto>
        <div class="hidden-md-and-up header mb-12">
          <img class="letter-img" src="@/assets/letter.svg" alt="letter-img">
          <p class="text-h5 font-weight-bold">La boite à message</p>
        </div>
        <div>
          <p class="text-h5 font-weight-bold">Ou en est ton message ? :</p>
        </div>
        <v-form>
          <v-text-field v-model="messageId" label="ID du message" clearable regular required color="#d81b60" />
        </v-form>

        <v-btn @click="getMessageStatus()" rounded x-large class="mb-5" color="#d96b93">
          Rechercher
        </v-btn>
        <router-link class="page-link text-center" to="/">
          <p>Retour</p>
        </router-link>
      </v-layout>
    </v-flex>
    <v-alert text v-model="alert.display" :color="alert.color" class="alert-position">
      {{ alert.message }}
    </v-alert>
  </v-layout>
</template>

<script>
import axios from 'axios'
import SideDescription from './shared/SideDescription.vue'
export default {
  name: 'Status',
  components: {
    SideDescription
  },
  data: () => ({
    messageId: '',
    alert: {
      display: false,
      type: '',
      color: '',
      message: ''
    }
  }),
  methods: {
    getMessageStatus() {
      if (!this.messageId) {
        this.alert = {
          display: true, type: 'warning', color: 'orange', message: 'Le formulaire n\'est pas remplis'
        }
        this.removeNotify()
        return
      }

      axios.get(`${process.env.VUE_APP_API_URL}/messages?message_id=${this.messageId}&_limit=1`)
        .then((res) => {
          switch (res.data[0].status) {
            case 0:
              this.alert = {
                display: true, type: 'info', color: 'blue', message: 'Le message est enregistré et sera bientot envoyé'
              }
              this.removeNotify()
              break
            case 1:
              this.alert = {
                display: true, type: 'success', color: 'green', message: 'Le message est envoyé ! Regarde notre insta :)'
              }
              this.removeNotify()
              break
            case 2:
              this.alert = {
                display: true, type: 'error', color: 'red', message: 'Le message est contre nos règles, il à été supprimer'
              }
              this.removeNotify()
              break
            default:
              break;
          }
        })
    },
    removeNotify() {
      setTimeout(() => {
        this.alert = { display: false }
      }, 3000)
    }
  }
}
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.message {
  max-height: 300px;
}

.letter-img {
  width: 150px;
  height: auto;
}

.alert-position {
  z-index: 2;
  position: absolute;
  width: 40vw;
  text-align: center;
  position: absolute;
  top: 5%;
  left: 75%;
  transform: translate(-50%, -50%);
}

@media screen and (max-width: 960px) {
  .alert-position {
    left: 50%;
    width: 80vw;
  }

}
</style>
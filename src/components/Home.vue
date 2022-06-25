<template>
  <v-layout fill-height>

    <v-flex hidden-sm-and-down md6 bg-pink>
      <SideDescription />
    </v-flex>

    <v-flex xs12 md6 bg-white>
      <v-layout column wrap class="form-header form-position" mx-auto>
        <div class="hidden-md-and-up header mb-2">
          <img class="letter-img" src="@/assets/letter.svg" alt="letter-img">
          <p class="text-h5 font-weight-bold">La boite à message</p>
        </div>
        <div>
          <p class="text-h6 font-weight-bold">Envoi ton message anonyme :</p>
          <router-link class="page-link hidden-md-and-up" to="/help">
            <p>comment envoyer un message ?</p>
          </router-link>
        </div>
        <v-form>
          <v-text-field v-model="message.target" label="Destinataire (sans @)" clearable regular required tabindex="1"
            color="#d81b60" />
          <v-textarea v-model="message.text" class="message" placeholder="Ton message" clearable regular required
            tabindex="2" color="#d81b60" />
        </v-form>

        <v-btn @click="newMessage()" :disabled="disableForm" rounded x-large class="mb-5" color="#d96b93">
          {{ disableForm ? "L'envoi est desactiver" : "Envoyer" }}
        </v-btn>
        <router-link class="page-link text-center" to="/status">
          <p>Ou en est mon message ?</p>
        </router-link>
        <div class="flex-center" v-if="this.message.id">
          <p>Enregistre l'id du message pour voir le status</p>
          <v-text-field readonly v-model="message.id" ref="textToCopy"></v-text-field>
          <v-btn @click="copyText">copy</v-btn>
        </div>
      </v-layout>
    </v-flex>
    <v-alert text v-model="alert.display" :color="alert.color" class="alert-position">
      {{ alert.message }}
    </v-alert>
    <div class="bot-status">
      <div class="status-dot" :style="{ backgroundColor: bot_status.color }" />
      <p>{{ bot_status.text }}</p>
    </div>
  </v-layout>
</template>

<script>
import axios from 'axios'
import SideDescription from './shared/SideDescription.vue'
export default {
  name: 'Home',
  components: {
    SideDescription
  },
  data: () => ({
    userInfos: {},
    message: {
      target: '',
      text: '',
      id: ''
    },
    alert: {
      display: false,
      type: '',
      color: '',
      message: ''
    },
    bot_status: {
      color: '#52C41A',
      text: 'Fonctionnel',
    },
    disableForm: false
  }),
  beforeMount() {
    axios.get(`/api/getip`)
      .then((res) => {
        axios.get(`/api/getipinfos/${res.data.ip}?api-key=b2b8f9e599738dbdda1df2f419c353f74c0cfd07a296fa1e1d3dadf4`)
          .then((res) => {
            this.userInfos = { ...res.data }
          })
      })

    axios.get(`${process.env.VUE_APP_API_URL}/infos?info=bot_status&_limit=1`)
      .then((res) => {
        switch (res.data[0].status) {
          case '0':
            this.bot_status = {
              color: "#52C41A",
              text: "Fonctionnel",
            }
            this.disableForm = false
            break;
          case '1':
            this.bot_status = {
              color: "orange",
              text: "Mode lent",
            }
            this.disableForm = false
            break;
          case '2':
            this.bot_status = {
              color: "red",
              text: "Bot arreter",
            }
            this.disableForm = true
            break;
          case '3':
            this.bot_status = {
              color: "orange",
              text: "En test - mode lent",
            }
            this.disableForm = true
            break;
          default:
            break;
        }
      })
  },
  methods: {
    async newMessage() {
      if (this.message.target.length == 0 || this.message.text.length == 0) {
        this.alert = {
          display: true, type: 'warning', color: 'orange', message: 'Le formulaire n\'est pas complet'
        }
        this.removeNotify()
        return
      }
      const message_id = Date.now()
      axios.post(`${process.env.VUE_APP_API_URL}/messages`, {
        target: this.message.target,
        message: this.message.text,
        sender: this.userInfos.ip,
        social: 0,
        infos: { ...this.userInfos },
        message_id: `${message_id}`
      })
        .then((res) => {
          this.alert = { display: true, type: 'sucess', color: 'green', message: 'Message envoyé' }
          this.message = { target: '', message: '', id: res.data.message_id }
          this.removeNotify()

        })
        .catch(() => {
          this.alert = { display: true, type: 'error', color: 'red', message: 'Erreur' }
          this.removeNotify()
        })
    },
    copyText() {
      navigator.clipboard.writeText(this.message.id)
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
  width: 75px;
  height: auto;
}

.flex-center {
  display: flex;
  flex-direction: column;
  text-align: center;
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

.bot-status {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  gap: 10px;
  width: auto;
  height: 30px;
  padding: 10px;
  background-color: rgb(222, 222, 222);
  border-radius: 20px;

  z-index: 2;
  position: absolute;
  text-align: center;
  position: absolute;
  bottom: 1%;
  left: 75%;
  transform: translate(-50%, -50%);
}

.bot-status p {
  align-self: center;
  margin: 0 !important;
  text-transform: uppercase;
  font-weight: bold;
  color: rgb(78, 78, 78);
  font-size: 12px;
}

.status-dot {
  align-self: center;
  width: 12px;
  height: 12px;
  border-radius: 100%;
}

@media screen and (max-width: 960px) {
  .alert-position {
    left: 50%;
    width: 80vw;
  }

  .bot-status {
    left: 50%;
  }
}
</style>
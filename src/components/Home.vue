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
          <p class="text-h5 font-weight-bold">Envoi ton message anonyme :</p>
          <router-link class="page-link hidden-md-and-up" to="/help">
            <p>comment envoyer un message ?</p>
          </router-link>
        </div>
        <v-form>
          <v-text-field id="target" v-model="target" label="Destinataire (sans @)" clearable regular required color="#d81b60
                                " />
          <v-textarea class="message" placeholder="Ton message" regular required color="#d81b60" />
        </v-form>

        <v-btn rounded x-large class="mb-5" color="#d96b93">
          Envoyer
        </v-btn>
        <router-link class="page-link hidden-md-and-up text-center"  to="/help">
            <p>Ou en est mon message ?</p>
        </router-link>
      </v-layout>
    </v-flex>

  </v-layout>
</template>

<script>
import SideDescription from './shared/SideDescription.vue'
export default {
  name: 'Home',
  components: {
    SideDescription
  },
  data: () => ({

  }),
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

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 300,
    'GRAD' 0,
    'opsz' 48
}
</style>
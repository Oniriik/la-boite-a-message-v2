<template>
    <v-layout fill-height>

        <v-flex hidden-sm-and-down md6 bg-pink>
            <SideDescription />
        </v-flex>

        <v-flex xs12 md6 bg-white>
            <v-layout column wrap fill-height justify-center text-center class="form-header" mx-auto>
                <div class="hidden-md-and-up header mb-12">
                    <img class="letter-img" src="@/assets/letter.svg" alt="letter-img">
                    <p class="text-h5 font-weight-bold">La boite à message</p>
                </div>
                <div>
                    <p class="text-h5 font-weight-bold">Tu es banni pour :</p>
                    <p class="text-h5 font-weight-bold">{{ this.reason }}</p>
                    <p>Fait ta demande de deban en DM <a class="page-link"
                            href="https://www.instagram.com/laboiteamessage" target="_blank">ici</a> !</p>
                </div>

            </v-layout>
        </v-flex>

    </v-layout>
</template>

<script>
import SideDescription from './shared/SideDescription.vue'
export default {
    name: 'Banned',
    components: {
        SideDescription
    },
    props: {
        reason: String,
    },
    data: () => ({

    }),
    beforeMount() {
        !this.reason && this.$router.push({ name: 'Home' })
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
</style>
<template>
    <v-layout column wrap fill-height justify-center text-center align-center>
        <img class="letter-img" src="@/assets/letter.svg" alt="letter-img">
        <p class="title text-h4 font-weight-bold white--text mb-12">
            La boite à message
        </p>

        <div class="tutorial mb-12">
            <div class="step">
                <v-icon color="white">
                    edit
                </v-icon>
                <span>Remplis le formulaire</span>
            </div>
            <div class="step">
                <v-icon color="white">
                    send
                </v-icon>
                <span>Envoi le message</span>

            </div>
            <div class="step">
                <v-icon color="white">
                    hourglass_empty
                </v-icon>
                <span>Attends le temps indiqué</span>
            </div>
            <div class="step">
                <v-icon color="white">
                    celebration
                </v-icon>
                <span>Ton message est visible sur <a class="link" href="https://www.instagram.com/laboiteamessage/"
                        target="_blank">instagram</a></span>
            </div>

        </div>
        <router-link class="page-link hidden-md-and-up" to="/">
            <p>Retour</p>
        </router-link>
    </v-layout>
</template>

<script>
export default {
    name: 'SideDescription',

    data: () => ({

    }),
}
</script>

<style scoped>
.tutorial {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    color: white;
    width: 100%;
}

.page-link {
    color: white !important;
}

.step {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    gap: 10px;
    width: 80%;
    margin: 0;
    font-size: 20px;
}

.link {
    color: inherit;
    text-decoration: underline;
}
.letter-img{
    width: 40vw;
    max-width: 300px;
}
@media screen and (max-width: 960px) {
    .step {
        gap: 10px;
        width: 90%;

    }
}
</style>
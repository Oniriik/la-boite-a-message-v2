<template>
  <v-app>
    <router-view />
  </v-app>

</template>

<script>
export default {
  name: 'App',

  data: () => ({

  }),
};
</script>

<style>
*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: inherit;
  text-decoration: none;
  list-style-type: none;
}

.bg-white {
  background-color: #fff;
}

.bg-pink {
  background-color: #d81b60;
}

.form-header {
  width: 80%;
  max-width: 460px;
}

.page-link {
  color: #d81b60 !important;
  text-decoration: underline;
}



.form-position {
  margin-top: 25vh;
}


@media screen and (max-width: 960px) {

  .form-position {
    margin-top: 10vh;
  }


}
</style>
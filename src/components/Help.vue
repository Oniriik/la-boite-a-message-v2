<template>
  <v-layout fill-height class="bg-pink">
      <SideDescription />
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
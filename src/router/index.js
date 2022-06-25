import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Help from '@/components/Help.vue'
import Status from '@/components/Status.vue'
import Banned from '@/components/Banned.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/status',
    name: 'Status',
    component: Status
  },
  {
    path: '/banned',
    name: 'Banned',
    props: true,
    component: Banned
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/connection',
    name: 'connection',
    component: () => import("../views/Connection")
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: () => import("../views/CreateAccount")
  },
  {
    path: '/channels',
    name: 'Channels',
    component: () => import("../views/Channels")
  },
  {
    path: '/channel/:id',
    name: 'Channel',
    component: () => import("../views/Channel")
  },
  {
    path: '/members',
    name: 'Members',
    component: () => import('../views/Members')
  },
  {
    path: '/member/:id',
    name: 'Member',
    component: () => import('../views/Member')
  }
]

const router = new VueRouter({
  routes
})

export default router

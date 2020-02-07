import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './../node_modules/bulma/css/bulma.css'

import { outils } from './outils'
Vue.mixin(outils);

window.axios = axios.create({
  baseURL: 'https://tools.sopress.net/iut/coop/api/',
  headers: { 'Authorization': '2929bce4e330ce300453976a646b1906516b9f40'}
});
Vue.config.productionTip = false

export const bus = new Vue();

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

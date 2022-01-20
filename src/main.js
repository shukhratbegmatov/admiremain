import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/store.js'
import  './assets/css/style.css'
import './assets/css/bootstrap-grid.css'
require('@/store/subscribe')
import axios from 'axios'

axios.defaults.baseURL = "https://unibeton.uz/v1/"
Vue.prototype.$axiosDefault = axios
//
store.dispatch('auth/attempt', localStorage.getItem('token'))
Vue.config.productionTip = false

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMask from 'v-mask'
Vue.use(VueMask);
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import VuePageTransition from 'vue-page-transition'

Vue.use(VuePageTransition)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

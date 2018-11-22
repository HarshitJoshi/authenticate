import Vue from 'vue'
import Router from './router';

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router: Router,
  render: h => h(App)
}).$mount('#app')


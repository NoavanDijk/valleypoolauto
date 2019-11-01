import Vue from 'vue'
import App from './App.vue'

import VueVisible from 'vue-visible';

Vue.use(VueVisible);

Vue.config.productionTip = false

require("./assets/style.scss");

new Vue({
  render: h => h(App),
}).$mount('#app')

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

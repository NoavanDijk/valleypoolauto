import Vue from 'vue'
import App from './App.vue'

import VueApexCharts from 'vue-apexcharts' ;
Vue.use (VueApexCharts);
Vue.component('apexchart', VueApexCharts)

import VueVisible from 'vue-visible';

Vue.use(VueVisible);

Vue.config.productionTip = false

require("./assets/style.scss");

new Vue({
  render: h => h(App),
}).$mount('#app')

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

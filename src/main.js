import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueVisible from 'vue-visible'
import VueApexCharts from 'vue-apexcharts'

import routes from './routes';

Vue.component('apexchart', VueApexCharts);

Vue.use(VueApexCharts);
Vue.use(VueRouter);
Vue.use(VueVisible);

Vue.config.productionTip = false

const router = new VueRouter({routes});

require("./assets/style.scss");

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

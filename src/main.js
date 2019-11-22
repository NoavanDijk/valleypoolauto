import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueVisible from 'vue-visible'
import VueApexCharts from 'vue-apexcharts'
import ApexCharts from 'apexcharts'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.component('apexchart', VueApexCharts);

Vue.use(VueApexCharts);
Vue.use(VueRouter);
Vue.use(VueVisible);

Vue.config.productionTip = false

require("./assets/style.scss");

new Vue({
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App)
}).$mount('#app')


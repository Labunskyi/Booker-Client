import Vue from 'vue'
import App from './App.vue'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import VueResource  from 'vue-resource'
Vue.use(VueResource)

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './routes'

import dateFilter from '@/filters/date.filter'


Vue.http.options.emulateJSON = true
Vue.config.productionTip = false
Vue.filter('date', dateFilter)


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

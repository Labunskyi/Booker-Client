import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import VueResource  from 'vue-resource'
import VueRouter from 'vue-router'
import router from './routes'
import dateFilter from '@/filters/date.filter'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuelidate)
Vue.http.options.emulateJSON = true
Vue.config.productionTip = false
Vue.filter('date', dateFilter)


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

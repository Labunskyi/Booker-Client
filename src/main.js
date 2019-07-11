import Vue from 'vue'
import App from './App.vue'
import VueResource  from 'vue-resource'
import VueRouter from 'vue-router'
import router from './routes'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

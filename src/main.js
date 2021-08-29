import Vue from 'vue'
import VueAudio from 'vue-audio-better'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAudio)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

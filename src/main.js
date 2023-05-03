import Vue from 'vue'
//import VueRouter from 'vue-router'
import VueAudio from 'vue-audio-better'
import App from './App.vue'
import store from './store'
import FolderContents from './components/FolderContents.vue'
//import Upload from './components/Upload.vue'

Vue.config.productionTip = false
Vue.use(VueAudio)

const routesDict = {
  '/': App,
  '/sxsw': FolderContents,
  '/chris': FolderContents
  //'/upload': Upload
}

new Vue({
  store,
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent() {
      console.log(this.currentRoute)
      console.log(routesDict[this.currentRoute])
      return routesDict[this.currentRoute]
    }
  },
  render(h) {
    return h(this.ViewComponent)
  }
}).$mount('#app')
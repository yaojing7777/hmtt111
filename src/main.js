import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
// import '@/styles/icon.less'
import MyIcon from '@/components/MyIcon'
// import '@/styles/reset.less'
import '@/styles/index.less'

// 一次性把它所有的按需导出全部导出来
import * as obj from '@/filters'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

Vue.component('MyIcon', MyIcon)

Vue.config.productionTip = false

Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import request from '@/utils/request'

import '@/icons' // icon
import '@/permission'
import axios from "axios"; // permission control
axios.defaults.baseURL = process.env.VUE_APP_BASE_API

// set ElementUI lang to EN
Vue.use(ElementUI, {locale})

Vue.prototype.req = request

Vue.config.productionTip = false

//携带登录信息，即允许后端写入cookie
axios.defaults.withCredentials = true

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

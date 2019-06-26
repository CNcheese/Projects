import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

import axios from 'axios'

import './styles/index.less'

import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// Axios请求拦截器
axios.interceptors.request.use(config => {
  const userInfo = JSON.parse(window.localStorage.getItem('user_Info'))
  // config.headers.Authorization = `Bearer $(userInfo.token)`
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// Axios 响应拦截器
axios.interceptors.response.use(response => {
  return response.data.data
}, error => {
  // return Promise.reject(error)
  const status = error.response.status
  if (status === 401) {
    window.localStorage.removeItem('user_info')
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})
Vue.prototype.$http = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import axios from './axios'
//import headerDetail from './components/header-detail/header-detail.vue'
//import {
//  createAPI
//} from 'cube-ui'

import './register'

import './common/stylus/index.styl'



Vue.config.productionTip = false
// createAPI(Vue, headerDetail)

new Vue({
  render: h => h(App),
  axios
}).$mount('#app')

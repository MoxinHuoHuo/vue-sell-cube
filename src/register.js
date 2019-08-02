import Vue from 'vue'
import headerDetail from './components/header-detail/header-detail.vue'
import shopCartList from './components/shop-cart-list/shop-cart-list.vue'
import food from './components/food/food.vue'

import {
  createAPI
} from 'cube-ui'

createAPI(Vue, headerDetail)
createAPI(Vue, shopCartList)
createAPI(Vue, food)

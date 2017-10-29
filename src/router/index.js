import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: _import('home/index'), name: '首页' },
        { path: '/category', component: _import('category/index'), name: '分类' },
        { path: '/cart', component: _import('cart/index'), name: '购物车' },
        { path: '/my', component: _import('my/index'), name: '我的' }
      ]
    }
  ]
})

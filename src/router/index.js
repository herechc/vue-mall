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
      path: '/login',
      component: _import('login/index')
    },
    {
      path: '/signup',
      component: _import('login/signup')
    },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: _import('home/index'), name: '首页' },
        { path: '/category', component: _import('category/index'), name: '分类' },
        { path: '/cart', component: _import('cart/index'), name: '购物车' },
        { path: '/my', component: _import('my/index'), name: '我的' },
        { path: '/detail', component: _import('detail/index'), name: '产品详情' },
        { path: '/address', component: _import('address/index'), name: '地址' }
      ]
    }
  ]
})

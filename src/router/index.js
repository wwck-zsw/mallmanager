import Vue from 'vue'
import Router from 'vue-router'

// import Login from '../components/login/login.vue'
// @ == src目录
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Index from '@/components/index.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'
import GoodsList from '@/components/goods/goodslist.vue'
import GoodsAdd from '@/components/goods/goodsadd.vue'
import CateParams from '@/components/goods/cateparams.vue'
import Goodscate from '@/components/goods/goodscate.vue'
import Orders from '@/components/order/order.vue'
import Reports from '@/components/reports/reports.vue'

import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [{
        // path: '/'  设置首页
        name: 'index',
        path: '/index',
        component: Index
      }, {
        name: 'users',
        path: '/users',
        component: Users
      }, {
        name: 'rights',
        path: '/rights',
        component: Right
      }, {
        name: 'roles',
        path: '/roles',
        component: Role
      }, {
        name: 'goods',
        path: '/goods',
        component: GoodsList
      }, {
        name: 'goodsadd',
        path: '/goodsadd',
        component: GoodsAdd
      }, {
        name: 'params',
        path: '/params',
        component: CateParams
      }, {
        name: 'categories',
        path: '/categories',
        component: Goodscate
      }, {
        name: 'orders',
        path: '/orders',
        component: Orders
      }, {
        name: 'reports',
        path: '/reports',
        component: Reports
      }]
    }
  ]
})
// 在路由配置失效之前 统一判断token
// 路由/导航守卫
// 路由守卫 在路由配置生效之前
// to -> 要去路由配置
// from -> 当前的路由配置
// /login home->login to就是login from就是home路由配置
router.beforeEach((to, form, next) => {
  // 如果要去的是登录 -> next()
  if (to.path === '/login') {
    next()
  } else {
    // 如果要去的不是登录
    // 获取token
    const token = localStorage.getItem('token')
    if (!token) {
      // 提示
      Message.warning('token失效，请重新登录')
      // token 没有 -> 登录
      router.push({name: 'login'})
      return
    }
  }
  next()
})
export default router

// node中间件
// app.use((req, res, next) => {
//   // req.body
//   // res.render()
//   // next() 会自动调用下一个中间件
//   next()
// })

// app.use((req, res, next) => {
//   // req.body
//   // res.render()
//   // next() 会自动调用下一个中间件
//   res.send()
//   next()
// })

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

Vue.use(Router)

export default new Router({
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
        name: 'role',
        path: '/role',
        component: Role
      }]
    }
  ]
})

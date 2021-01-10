// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// 不要忘记引入css文件
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式
import '@/assets/css/reset.css'
// 引入axios
// import axios from 'axios
// Vue.prototype.$http = axios
// 两种都可以，下面是写成插件导入（把一个不是vue插件的变成vue插件）
import MyServerHttp from '@/plugins/http.js'
import moment from 'moment'

// 使用element(组件库)
Vue.use(ElementUI)
Vue.use(MyServerHttp)

Vue.config.productionTip = false

// 全局过滤器 - 处理日期
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render: (h)=>h(App) 相当于下面两步操作
  components: { App },
  template: '<App/>'
})

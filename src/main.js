// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// 不要忘记引入css文件
import 'element-ui/lib/theme-chalk/index.css'

// 使用element(组件库)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render: (h)=>h(App) 相当于下面两步操作
  components: { App },
  template: '<App/>'
})

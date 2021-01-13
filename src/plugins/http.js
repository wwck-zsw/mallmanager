// 插件模块
import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
  // 需要授权的API 必须在请求头中使用Authorization 字段提供token令牌    (设置axios默认请求头)
  // const AUTH_TOKEN = localStorage.getItem('token')
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

  // 在请求发起之前 会先来到下面的回调函数
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 设置请求头 排除登录请求
    console.info(config.url)
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers['Authorization'] = AUTH_TOKEN
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  })
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}

export default MyHttpServer

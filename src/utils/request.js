import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 8000
})

// 请求拦截器
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  // const { user } = store.state
  // if (user && user.token) {
  //   config.headers.Authorization = `Bearer ${user.user.token}`
  // }
  // 在发送请求之前做些什么
  if (store.state.user && store.state.user.token) {
    config.headers = {
      Authorization: 'Bearer ' + store.state.user.token
    }
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
// instance.interceptors.request.use(function (response) {
//   return response
// }, function (err) {
//   return Promise.reject(err)
// })

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
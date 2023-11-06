// axios 的二次封装类
// 这是小项目,所以只有一个基请求文件 request.js
// 若是大型代码需要向多台不同的服务器发送请求时可以创建多个基请求文件 requestA requestB
import axios from 'axios'

// 创建 axios 实例, 将来对创建出来的实例,进行自定义配置; instance 译为"实例"
// 好处: 不会污染原始的axios实例
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/', // 基地址/路径前缀
  timeout: 7000 // 超时时间
  // headers: { 'X-Custom-Header': 'foobar' } // 请求头(暂时不需要)
})

// 自定义配置 - 请求拦截器/响应拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(默认axios会多包装一层 data, 需要响应拦截器预先处理一下)
  return response.data // 解构出data数据
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 导出
export default instance

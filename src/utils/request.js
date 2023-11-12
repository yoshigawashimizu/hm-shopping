// axios 的二次封装类
// 这是小项目,所以只有一个基请求文件 request.js
// 若是大型代码需要向多台不同的服务器发送请求时可以创建多个基请求文件 requestA requestB
import store from '@/store' // 导入 vuex 状态管理
import axios from 'axios'
import { Toast } from 'vant' // 导入 toast 组件

// 创建 axios 实例, 将来对创建出来的实例,进行自定义配置; instance 译为"实例"
// 好处: 不会污染原始的axios实例
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/', // 基地址/路径前缀
  timeout: 10000 // 超时时间
  // headers: { 'X-Custom-Header': 'foobar' } // 设置请求头 (暂时不需要)
})

// 请求拦截器/响应拦截器

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  /** 页面优化: toast 轻提示优化
   * (1) 添加loading效果
   * (2) 禁止背景点击(节流处理, 防止多次无效触发)
   */
  Toast.loading({
    duration: 0, // toast显示时长, 默认为2秒, 0为永不消失
    message: '加载中...', // 提示文本
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner' // 配置loading图标
  })

  // 优化代码: 往每一个请求的请求头里都添加token
  const token = store.getters.token // 尝试获取 token 令牌
  // 判断: token是否存在
  if (token) {
    config.headers['Access-Token'] = token // config 请求时完整的配置信息对象, 用到了中括号语法, 将带特殊字符的 Access-Token 变量存入
    config.headers.platform = 'H5' // 设置请求头: platform 平台信息
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 预期: 如果服务器返回的响应状态码不是200, 抛出一个 promise 错误, await 只会等待成功的 promise
  // 默认axios会多包装一层 data, 需要响应拦截器预先处理一下
  const res = response.data // res 单纯为服务器返回的响应对象本体
  // 判断: 服务器响应对象的响应码是否不是 200
  if (res.status !== 200) {
    // (1) 给页面反馈提示
    Toast.fail({
      message: res.message, // 这里的提示信息使用后台返回的"错误提示信息"
      duration: 3000 // 3秒后关闭, 增加用户阅读错误信息的时间
    })
    // (2) 抛出错误的promise
    return Promise.reject(res.message) // 抛出到控制台, 显示后台返回的"错误提示信息"
  } else {
    // 正确情况, 直接走业务核心逻辑
    Toast.clear() // 清除loading的效果
  }
  return res
  // 对响应数据做点什么()
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 导出
export default instance

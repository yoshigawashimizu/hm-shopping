// 此处存放所有与登录相关的接口请求, 新建请求模块,封装请求函数
import request from '@/utils/request' // 导入了 axios 的二次封装类

/**
 * 获取图形验证码
 * 请求路径: /captcha/image
 * 请求方法: get
 * 请求传参: none
 */
export const getPicCode = () => {
  return request.get('/captcha/image') // 细节: 必须 return
}

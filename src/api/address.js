// 请求'用户地址相关数据'的二次封装类
import request from '@/utils/request.js'// 导入 axios 的二次封装类

/** 获取用户收货地址列表
 * 请求路径: '/address/list'
 * 请求方法: get
 * 请求传参: (1) header 参数: Access-Token String 用户的 token 令牌 必需
 *                           platform String 当前请求的客户端（APP、小程序、H5等） 默认 H5 必需
 */
export const getAddressListApi = () => {
  return request.get('/address/list')
}

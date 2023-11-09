// 展示封装了 获取用户数据的请求的 方法
import request from '@/utils/request' // 导入 axios 的二次封装类

/** 获取个人信息
 * 请求路径: '/user/info'
 * 请求方法: get
 * 请求传参: 无
 */
export const getUserInfoDetailApi = () => {
  return request.get('/user/info')
}

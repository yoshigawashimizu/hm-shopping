// 请求'用户个人信息相关数据'的二次封装类

import request from '@/utils/request' // 导入 axios 的二次封装类

/** 获取个人信息
 * 请求路径: '/user/info'
 * 请求方法: get
 * 请求传参: 无
 */
export const getUserInfoDetailApi = () => {
  return request.get('/user/info')
}

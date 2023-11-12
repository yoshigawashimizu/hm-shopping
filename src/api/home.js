// 请求'首页相关数据'的二次封装类
import request from '@/utils/request.js' // 导入 axios 的二次封装类

/** 获取首页数据
 * 请求路径: '/page/detail'
 * 请求方法: get
 * 请求传参: pageId Number 页面id, 默认为 0
 *
 * @param {Number} pageId 页面id
 */
export const getHomeData = (pageId = 0) => {
  return request.get('/page/detail', {
    params: { // 注意, get 请求方法传参, 参数放在 params 对象里
      pageId
    }
  })
}

// 首页相关的 api 封装方法
import request from '@/utils/request.js' // 导入 axios 的二次封装类

/** 获取首页设计
 * 请求路径: '/page/detail'
 * 请求方法: get
 * 请求传参: pageId string 页面id默认就用0
 */
export const getHomeData = () => {
  return request.get('/page/detail', {
    // 注意, get 传参放在params里
    params: {
      pageId: 0
    }
  })
}

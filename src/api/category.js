// 请求'分类页相关数据'的二次封装类
import request from '@/utils/request' // 导入 axios 的二次封装类

/** 获取分类页数据
 * 访问路径: '/category/list'
 * 请求方式: get
 * 请求传参: 无
 */
export const getCategoryData = () => {
  return request.get('/category/list')
}

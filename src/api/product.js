// 这是获取商品展示列表的接口的封装文件
import request from '@/utils/request.js' // 导入 axios 的二次封装类

/** 获取商品展示列表的数据
 * 请求路径: '/goods/list'
 * 请求方法: get
 * 请求传参: {
 *           sortType String 结果排序规则; all-按综合搜索(默认)，sales-按销量搜索，price-按价格搜索
 *           sortPrice String 价格排序规则; 0-价格从低到高， 1-价格从高到低
 *           categoryId String 商品id
 *           goodsName String 商品名称
 *           page string 页码
 *           }
 */
export const getProList = (obj) => {
  // 设置传入数据的默认值, 如果设置为 null, undefined 的假值的话, axios会默认屏蔽掉
  const {
    sortType = 'all', // 结果排序规则, 默认为'all'按综合搜索
    sortPrice = null, // 价格排序规则, 可选
    categoryId = null, // 分类页id, 可选
    goodsName = null, // 商品名称, 可选
    page = 1 // 页码, 默认为 1
  } = obj
  return request.get('/goods/list', {
    params: {
      sortType,
      sortPrice,
      categoryId,
      goodsName,
      page
    }
  })
}

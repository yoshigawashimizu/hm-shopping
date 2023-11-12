// 请求'商品详情相关数据'的二次封装类
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
 * @param {Object} obj 传参载荷
 * @param {String} obj.sortType 结果排序规则
 * @param {String} obj.sortPrice 价格排序规则
 * @param {String} obj.categoryId 分类页id
 * @param {String} obj.goodsName 商品名称
 * @param {Number} obj.page 返回页码
 */
export const getProList = (obj) => {
  // 设置传入数据的默认值, 如果设置为 null, undefined 的假值的话, axios会默认屏蔽掉
  const {
    sortType = 'all', // 结果排序规则, 默认为'all'按综合搜索
    sortPrice = null, // 价格排序规则, 可选
    categoryId = null, // 分类页id, 可选
    goodsName = null, // 商品名称, 可选
    page = 1 // 返回页码, 默认为 1
  } = obj

  // console.log('结果排序规则:', sortType, '价格排序规则:', sortPrice, '分类页id:', categoryId, '商品名称:', goodsName, '当前页码', page) // 测试环境用, 发送请求前的请求传参是什么

  return request.get('/goods/list', {
    params: {
      sortType, // 结果排序规则
      sortPrice, // 价格排序规则
      categoryId, // 分类页id
      goodsName, // 商品名称
      page // 返回页码
    }
  })
}
/** 获取商品详情数据
 * 请求路径: '/goods/detail'
 * 请求方式: get
 * 请求传参: goodsId String 商品id 可选
 *
 * @param {String} goodsId 商品id
 *  */

export const getProDetail = (goodsId = null) => { // 如果传入的 goodsId 商品的id为undefined, 则默认值为null
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

/** 获取商品评价
 * 请求路径: '/comment/listRows'
 * 请求方法: get
 * 请求传参: goodsId String 商品id 必需
 *          limit String 最大评论展示数量 必需 默认为3
 * @param {String} goodsId 商品id
 * @param {Number} limit 最大评论展示数量
 */
export const getProComments = (goodsId, limit = 3) => { // 获取评论展示数量默认为3条
  return request.get('/comment/listRows', {
    params: {
      goodsId, // 商品id
      limit // 最大评论展示数量
    }
  })
}

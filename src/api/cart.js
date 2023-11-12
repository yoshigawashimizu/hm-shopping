// 请求'购物车相关数据'的二次封装类
import request from '@/utils/request' // 导入 axios 二次封装类

// 特别注意: header 传参中的 Access-Token 和 platform 已经在 axios 封装类里赋值了

/** 加入购物车
 * 请求路径: '/cart/add'
 * 请求方式: post
 * 请求传参: (1) header 参数: Access-Token String 用户的 token 令牌 必需
 *                           platform String 当前请求的客户端（APP、小程序、H5等） 默认 H5 必需
 *          (2) body 参数: goodsId String 商品ID 必填
 *                         goodsNum Number 商品数量 必填 默认为 1
 *                         goodsSkuId String 商品SkuId, 即不同商品规格id 选填 默认为 null
 *
 * @param {String} goodsId 商品ID
 * @param {Number} goodsNum 商品数量
 * @param {String} goodsSkuId 商品ID
 */
export const addCart = (goodsId, goodsNum = 1, goodsSkuId = null) => {
  // console.log('商品ID:', goodsId, '商品数量:', goodsNum, '商品SkuId:', goodsSkuId) // 调试用, 判断加入购物车的商品的具体信息

  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  }
  )
}

/** 加入购物车
 * 请求路径: '/cart/list'
 * 请求方式: get
 * 请求传参: (1) header 参数: Access-Token String 用户的 token 令牌 必需
 *                           platform String 当前请求的客户端（APP、小程序、H5等） 默认 H5 必需
 */
export const getCartList = () => {
  return request.get('/cart/list')
}

/** 更新购物车商品数量
 * 请求路径: '/cart/update'
 * 请求方法: post
 * 请求传参: (1) header 参数: Access-Token String 用户的 token 令牌 必需
 *                           platform String 当前请求的客户端（APP、小程序、H5等） 默认 H5 必需
 *          (2) body 参数: goodsId String 商品id 必需
 *                         goodsNum Number 商品数量 默认为 1 必需
 *                         goodsSkuId String 商品SKU 默认为 null 该项目只能传单值 必需
 *
 * @param {String} goodsId 商品id
 * @param {Number} goodsNum 商品数量
 * @param {String} goodsSkuId 商品规格id
 */
export const changeCountApi = (goodsId, goodsNum = 1, goodsSkuId = null) => {
  return request.post('/cart/update', {
    goodsId, // 商品id
    goodsNum, // 商品数量
    goodsSkuId // 商品SKU
  })
}

/** 删除购物车商品
 * 请求路径: '/cart/clear'
 * 请求方法: post
 * 请求传参: (1) header 参数: Access-Token String 用户的 token 令牌 必需
 *                           platform String 当前请求的客户端（APP、小程序、H5等） 默认 H5 必需
 *          (2) body 参数: cartIds Array<String> 购物车商品项id们, 是"每一个购物车的商品项本身就是数组中的一项数据, 然后这项数据中有个id"中的id 必需
 *
 * @param {Array} cartIds
 */
export const delSelectApi = (cartIds = []) => {
  return request.post('/cart/clear', {
    cartIds // 购物车商品项id们
  })
}

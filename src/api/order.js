// 封装订单结算api接口方法
import request from '@/utils/request'// 导入 axios 的二次封装类

/** 订单结算确认
 * 请求路径: '/checkout/order'
 * 请求方式: get
 * 请求传参: (1) header 参数: Access-Token String 用户的 token 令牌 必需
 *                           platform String 当前请求的客户端（APP、小程序、H5等） 默认 H5 必需
 *          (2) query 参数: mode String 订单模式: 是购物车下单(传cart)还是立即购买(传buyNow) 必需
 *                         delivery Number 配送方式 （10快递配送 20上门自提）默认为10 必需
 *                         shopId Number 自提门店ID 必需
 *                         couponId Number 优惠券ID 0为不使用优惠券 默认为0 必需
 *                         isUsePoints Number 是否使用积分抵扣 （1使用 0不使用） 默认 0 可选
 *                         cartIds String 购物车ID集 可选
 *
 * @param {String} mode 订单模式 购物车模式cart 立即购买 buyNow
 * @param {Object} obj 不同模式的不同传值: (1) cart 模式 → { cartIds } cartIds 购物车ID集 (2) buyNow 立即购买则传递 → { goodsId goodsNum goodsSkuId }
 */
export const checkOrder = (mode, obj) => {
  const {
    delivery = 10, // 配送方式
    shopId, // 自提门店ID
    couponId = 0, // 优惠券ID
    isUsePoints = 0, // 是否使用积分抵扣
    goodsId, // 购买的商品id
    goodsNum, // 商品购买数量
    goodsSkuId, // 商品配置id
    cartIds // 购物车商品数组
  } = obj

  let errorMessage // promise 返回的报错信息对象

  // 判断: 订单模式是否为 cart
  switch (mode) {
    case 'cart': // 是购物车模式, 传参为 cartIds 购物车数组
      return request.get('/checkout/order', {
        params: {
          mode, // 下单模式
          delivery, // 配送方式
          shopId, // 自提门店ID
          couponId, // 优惠券ID
          isUsePoints, // 是否使用积分抵扣
          cartIds // 购物车商品数组
        }
      })
    case 'buyNow':
      return request.get('/checkout/order', {
        params: {
          mode, // 下单模式
          delivery, // 配送方式
          shopId, // 自提门店ID
          couponId, // 优惠券ID
          isUsePoints, // 是否使用积分抵扣
          goodsId, // 购买的商品id
          goodsNum, // 商品购买数量
          goodsSkuId // 商品配置id
        }
      })
    default:
      errorMessage = new Error('传入的模式有误')
      return Promise.reject(errorMessage)
  }
}

/** 订单提交确认
 * 请求路径: '/checkout/submit'
 * 请求方法: post
 * 请求传参: (1) header 参数: Access-Token String 用户的 token 令牌 必需
 *                           platform String 当前请求的客户端（APP、小程序、H5等） 默认 H5 必需
 *           (2) body 参数: delivery Number/String 物流方式方式 默认为 '10' 必需
 *                          couponId Number/String 优惠券Id 默认为'0' 必需
 *                          isUsePoints Number 是否使用积分 1-使用, 0-不使用 默认为 0 必需
 *                          payType String 支付方式 '10'余额支付 必需
 *                          remark String 留言 默认为 '' 必需
 *                          mode String 购买方式 buyNow: 立即购买 cart: 购物车购买 必需
 *                          goodsId String 商品id (购物车下单无需传递, 商品详情页立即购买下单需要传递) 可选
 *                          goodsNum String 商品数量(购物车下单无需传递, 商品详情页立即购买下单需要传递) 可选
 *                          goodsSkuId String 商品SKU(购物车下单无需传递, 商品详情页立即购买下单需要传递) 可选
 *                          cartIds String 购物车id (购物车下单需传递, 商品详情页立即购买下单不需传递) 可选
 *
 * @param {String} mode 购买模式
 * @param {Object} obj 购买传参
 *                     如果是购物车购买:
 *                     { cartIds, remark } = obj
 *                     如果是立即购买:
 *                     { goodsId, goodsNum, goodsSkuId, remark } = obj
 */
export const submitOrderApi = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode, // 购买模式
    delivery: obj.delivery || 10, // 配送方式: 快递配送
    couponId: obj.couponId || 0, // 优惠券Id
    isUsePoints: 0, // 是否使用积分
    payType: obj.payType || 10, // 支付方式: 余额支付
    ...obj // 额外参数: 通过解构 obj 获取
  })
}

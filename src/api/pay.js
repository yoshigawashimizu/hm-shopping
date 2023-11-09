// 封装订单结算api接口方法
import request from '@/utils/request'// 导入 axios 的二次封装类

/** 订单结算接口
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
 * @param mode 订单模式 购物车模式cart 立即购买 buyNow
 * @param obj 不同模式的不同传值: (1) cart 模式 → { cartIds } cartIds 购物车ID集 (2) buyNow 立即购买则传递 → { goodsId goodsNum goodsSkuId }
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

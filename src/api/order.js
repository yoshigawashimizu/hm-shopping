// 请求'订单相关数据'的二次封装类
import request from '@/utils/request'// 导入 axios 的二次封装类

/** 结算前, 订单详情确认
 * 请求路径: '/checkout/order'
 * 请求方式: get
 * 请求传参: (1) header 参数: Access-Token String 用户的 token 令牌 必需
 *                           platform String 当前请求的客户端（APP、小程序、H5等） 默认 H5 必需
 *          (2) query 参数: mode String 订单模式: 是购物车下单(传cart)还是立即购买(传buyNow) 不同传值: (1) cart → { cartIds } 购物车ID集 (2) buyNow 立即购买则传递 → { goodsId goodsNum goodsSkuId } 必需
 *                         delivery Number 配送方式 （10快递配送 20上门自提）默认为10 必需
 *                         shopId Number 自提门店ID 必需
 *                         couponId Number 优惠券ID 0为不使用优惠券 默认为0 必需
 *                         isUsePoints Number 是否使用积分抵扣 （1使用 0不使用） 默认 0 可选
 *                         cartIds String 购物车ID集 可选
 *
 * @param {String} mode 订单模式 购物车模式cart 立即购买 buyNow
 * @param {Object} obj 传参载荷
 * @param {Number} obj.delivery 配送方式
 * @param {String} obj.shopId 自提门店ID
 * @param {Number} obj.couponId 优惠券ID
 * @param {Number} obj.isUsePoints 是否使用积分抵扣
 * @param {String} obj.goodsId 购买的商品id
 * @param {String} obj.goodsNum 商品购买数量
 * @param {String} obj.goodsSkuId 购买的商品规格id
 * @param {String} obj.cartIds 购物车商品数组
 */
export const checkOrder = (mode, obj) => {
  // 设置默认值
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
    case 'buyNow': // 是立即购买模式, 传参为 goodsId, goodsNum, 以及 goodsSkuId
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
  }
}

/** 订单结算请求
 * 请求路径: '/checkout/submit'
 * 请求方法: post
 * 请求传参: (1) header 参数: Access-Token String 用户的 token 令牌 必需
 *                           platform String 当前请求的客户端（APP、小程序、H5等） 默认 H5 必需
 *           (2) body 参数: delivery Number/String 物流方式方式 默认为 '10' 必需
 *                          couponId Number/String 优惠券Id 默认为'0' 必需
 *                          isUsePoints Number 是否使用积分 1-使用, 0-不使用 默认为 0 必需
 *                          payType Number 支付方式 '10'余额支付 必需
 *                          remark String 用户订单留言 默认为 '' 必需
 *                          mode String 购买方式 buyNow: 立即购买 cart: 购物车购买 必需
 *                          goodsId String 商品id (购物车下单无需传递, 商品详情页立即购买下单需要传递) 可选
 *                          goodsNum String 商品数量(购物车下单无需传递, 商品详情页立即购买下单需要传递) 可选
 *                          goodsSkuId String 商品SKU(购物车下单无需传递, 商品详情页立即购买下单需要传递) 可选
 *                          cartIds String 购物车id (购物车下单需传递, 商品详情页立即购买下单不需传递) 可选
 *
 * @param {String} mode 订单模式 购物车模式cart 立即购买 buyNow
 * @param {Object} obj 传参载荷
 * @param {Number} obj.delivery 配送方式
 * @param {Number} obj.couponId 优惠券ID
 * @param {Number} obj.isUsePoints 是否使用积分抵扣
 * @param {Number} obj.payType 支付方式
 * @param {String} obj.remark 订单用户留言
 * @param {String} obj.goodsId 购买的商品id
 * @param {String} obj.goodsNum 商品购买数量
 * @param {String} obj.goodsSkuId 购买的商品规格id
 * @param {String} obj.cartIds 购物车商品数组
 */
export const submitOrderApi = (mode, obj) => {
  // 设置默认数据
  const {
    delivery = 10, // 配送方式
    couponId = 0, // 优惠券ID
    isUsePoints = 0, // 是否使用积分抵扣
    payType = 10, // 支付方式
    remark = '', // 用户订单留言
    goodsId, // 购买的商品id
    goodsNum, // 商品购买数量
    goodsSkuId, // 商品配置id
    cartIds // 购物车商品数组
  } = obj
  return request.post('/checkout/submit', {
    mode, // 购买模式
    delivery, // 配送方式: 快递配送
    couponId, // 优惠券Id
    isUsePoints, // 是否使用积分
    payType, // 支付方式: 余额支付
    remark, // 用户订单留言
    goodsId, // 购买的商品id
    goodsNum, // 商品购买数量
    goodsSkuId, // 商品配置id
    cartIds // 购物车商品id们字符串
  })
}

/** 获取我的订单
 * 请求路径: '/order/list'
 * 请求方法: get
 * 请求传参: (1) header 参数: Access-Token String 用户的 token 令牌 必需
 *                           platform String 当前请求的客户端（APP、小程序、H5等） 默认 H5 必需
 *          (2) query 参数: dataType String 订单类型 all-全部，payment-待支付，delivery-待发货，received-待收货，comment-待评价 默认: all 必需
 *                          page string 返回页码 默认为1 必需  备注, 可以使用 vant 组件的 List 组件
 *
 * @param {String} dataType 订单类型
 * @param {String} page 返回页码
 */
export const getMyOrderListApi = (dataType = 'all', page = '1') => {
  return request.get('/order/list', {
    params: {
      dataType, // 订单类型
      page // 返回页码
    }
  })
}

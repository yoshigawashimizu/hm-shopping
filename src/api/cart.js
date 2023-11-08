// 存放封装了请求"分类页"数据的所有api 方法
import request from '@/utils/request' // 导入 axios 二次封装类

/** 加入购物车
 * 请求路径: '/cart/add'
 * 请求方式: post
 * 请求传参: (1) header 参数: Access-Token String 用户的 token 令牌
 *                           platform String 当前请求的客户端（APP、小程序、H5等） 默认 H5
 *          (2) body 参数: goodsId String 商品ID 必填
 *                         goodsNum Number 商品数量 必填 默认为 1
 *                         goodsSkuId String 商品SKUID,即不同商品规格id 选填 默认为 null
 */
export const addCart = (goodsId, goodsNum = 1, goodsSkuId = null) => {
  console.log('商品ID:', goodsId, '商品数量:', goodsNum, '商品SKUID:', goodsSkuId)
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  }
  )
}

<template>
  <div class="pay">
    <van-nav-bar fixed title="订单结算台" left-arrow @click-left="$router.go(-1)" />

    <!-- 地址相关 -->
    <div class="address">

      <div class="left-icon">
        <van-icon name="logistics" />
      </div>

      <div class="info" v-if="selectedAddress.address_id">
        <div class="info-content">
          <span class="name">{{ selectedAddress.name }}</span>
          <span class="mobile">{{ selectedAddress.phone }}</span>
        </div>
        <div class="info-address">
          {{ longAddress }}
        </div>
      </div>

      <div class="info" v-else>
        请选择配送地址
      </div>

      <div class="right-icon">
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 订单明细 -->
    <!-- 当订单中的的 goodsList 不为空, 即有商品时才渲染 -->
    <div class="pay-list" v-if="order.goodsList">
      <div class="list">
        <div class="goods-item" v-for="item in order.goodsList" :key="item.goods_id">
            <div class="left">
              <img :src="item.goods_image" alt="" />
            </div>
            <div class="right">
              <p class="tit text-ellipsis-2">
                <!-- 商品名称 -->
                {{ item.goods_name }}
              </p>
              <p class="info">
                <!-- 商品购买总数 -->
                <span class="count">x{{ item.total_num }}</span>
                <!-- 商品购买总价 -->
                <span class="price">¥{{ item.total_pay_price }}</span>
              </p>
            </div>
        </div>
      </div>

      <div class="flow-num-box">
        <!-- 订单总商品数量 -->
        <span>共 {{ order.orderTotalNum }} 件商品，合计：</span>
        <!-- 订单总价 -->
        <span class="money">￥{{ order.orderTotalPrice }}</span>
      </div>

      <div class="pay-detail">
        <div class="pay-cell">
          <span>订单总金额：</span>
          <span class="red">￥{{ order.orderTotalPrice }}</span>
        </div>

        <div class="pay-cell">
          <span>优惠券：</span>
          <span>无优惠券可用</span>
        </div>

        <div class="pay-cell">
          <span>配送费用：</span>
          <span v-if="!selectedAddress">请先选择配送地址</span>
          <span v-else class="red">+￥0.00</span>
        </div>
      </div>

  <!-- 支付方式 -->
  <div class="pay-way">
    <span class="tit">支付方式</span>
    <div class="pay-cell">
      <span><van-icon name="balance-o" />余额支付（可用 ¥ {{ personal.balance }} 元）</span>
      <span class="red"><van-icon name="passed" /></span>
    </div>
  </div>

  <!-- 买家留言 -->
  <div class="buytips">
    <textarea placeholder="选填：买家留言（50字内）" name="" id="" cols="30" rows="10" v-model="remark"></textarea>
  </div>
    </div>

    <!-- 底部提交 -->
    <div class="footer-fixed">
      <div class="left">实付款：<span>￥{{ order.orderTotalPrice }}</span></div>
      <!-- 提交订单按钮 -->
      <div class="tipsbtn" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import { getAddressListApi } from '@/api/address.js' // 导入'发送获取用户收货地址列表请求'方法
import { checkOrder, submitOrderApi } from '@/api/order' // 导入 订单结算接口 的api接口封装方法

export default {
  name: 'PayIndex', // 支付模块模块
  data () {
    return {
      addressList: [ // 用户收货地址列表 备注: 后台接口返回的值为空, 因此此处的用户收货地址列表将使用固定数据
        {
          address_id: 10012,
          name: '张小',
          phone: '18999292929',
          province_id: 782,
          city_id: 783,
          region_id: 785,
          detail: '北京路1号楼8888室',
          user_id: 10003,
          region: { // 省 市 区
            province: '上海',
            city: '上海市',
            region: '徐汇区'
          }
        }
      ],
      order: {}, // 生成的订单信息
      personal: {}, // 用户信息, 包括用户余额等
      setting: {}, // 用户积分相关
      remark: '' // 用户对商品的留言
    }
  },
  computed: {
    /** 被使用的/提交时的用户收货地址 */
    selectedAddress () {
      // 这里的地址管理非主线业务, 所以直接以第一项为准
      return this.addressList[0] || {} // 未取到值时, 返回一个空对象
    },

    /** 获取完整的收货地址 */
    longAddress () {
      const region = this.selectedAddress.region
      return region.province + region.city + region.region + this.selectedAddress.detail // 地址的字符串拼接: 省 + 实 + 区 + 详细地址
    },

    /** 获取传递的支付方式 mode */
    mode () {
      return this.$route.query.mode // 获取路径中的 mode 传参
    },

    /** 获取传递的购物车商品项 cartIds */
    cartIds () {
      return this.$route.query.cartIds
    },

    /** 获取的地址栏里传递的商品id goodsId */
    goodsId () {
      return this.$route.query.goodsId
    },

    /** 获取的地址栏里传递的商品数量 goodsNum */
    goodsNum () {
      return this.$route.query.goodsNum
    },

    /** 获取的地址栏里传递的商品规格id goodsSkuId */
    goodsSkuId () {
      return this.$route.query.goodsSkuId
    }
  },
  methods: {

    /** 存入/更新用户收货地址列表
     * 备注: 从服务器处无法拿到收货地址, 因此该方法默认会返回一个固定地址
     * 如果从服务器拿到了收货地址, 则会存储收货地址
     */
    async setAddressList () {
      const { data: { list } } = await getAddressListApi() // 获取用户收货地址
      // 备注: 从服务器处无法拿到收货地址, 因此在此处将使用写死的默认地址
      this.addressList = list.length > 0 ? list : this.addressList
      console.log(this.addressList)
    },

    /** 发送请求, 获取/更新结算订单数据 */
    async setOrderList () {
      // 判断: 订单模式 mode 是否是 cart 购物车模式
      if (this.mode === 'cart') {
        // 调用 api 方法, 传入 订单模式 与 传递的购物车商品项
        const { data: { order, personal, setting } } = await checkOrder(this.mode, { cartIds: this.cartIds })
        // console.log('生成的订单信息:', order, '用户信息:', personal, '积分信息:', setting) // 返回主体为: order: 生成的当前订单信息; setting: 积分; personal: 用户信息, 包括余额
        this.order = order
        this.personal = personal
        this.setting = setting
      } else if (this.mode === 'buyNow') {
        // 调用 api 方法, 传入 订单模式 与 传递的购物车商品项
        const { data: { order, personal, setting } } = await checkOrder(this.mode, {
          goodsId: this.goodsId, // 购买的商品id, 路径传参
          goodsNum: this.goodsNum, // 商品购买数量, 路径传参
          goodsSkuId: this.goodsSkuId // 商品配置id, 路径传参
        })
        // console.log('生成的订单信息:', order, '用户信息:', personal, '积分信息:', setting) // 返回主体为: order: 生成的当前订单信息; setting: 积分; personal: 用户信息, 包括余额
        this.order = order
        this.personal = personal
        this.setting = setting
      }
    },

    /** 点击按钮, 提交订单 */
    async submitOrder () {
      // 判断: 根据不同的 mode 发送不同的请求传参
      if (this.mode === 'cart') {
        // 调用 api 方法, 传入 订单模式 与 传递的购物车商品项
        await submitOrderApi(this.mode, {
          cartIds: this.cartIds, // 购物车列表
          remark: this.remark // 用户订单评价
        })
      } else if (this.mode === 'buyNow') {
        // 调用 api 方法, 传入 订单模式 与 传递的购物车商品项
        await submitOrderApi(this.mode, {
          goodsId: this.goodsId, // 购买的商品id
          goodsNum: this.goodsNum, // 商品购买数量
          goodsSkuId: this.goodsSkuId, // 商品配置id
          remark: this.remark // 用户订单评价
        })
      }
      this.$toast.success('支付成功')// 用户提示
      this.$router.replace('/myorder')// 页面跳转
    }
  },

  async created () {
    // 一进入页面, 发送请求, 获取用户收货地址列表
    await this.setAddressList() // 调用'获取用户收货地址列表'方法
    // 一进入页面, 方式请求, 获取结算订单

    this.setOrderList()
  }
}
</script>

<style lang="less" scoped>
.pay {
  padding-top: 46px;
  padding-bottom: 46px;
  ::v-deep {
    .van-nav-bar__arrow {
      color: #333;
    }
  }
}
.address {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-size: 14px;
  color: #666;
  position: relative;
  background: url(@/assets/border-line.png) bottom repeat-x;
  background-size: 60px auto;
  .left-icon {
    margin-right: 20px;
  }
  .right-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-7px);
  }
}
.goods-item {
  height: 100px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 100px;
    img {
      display: block;
      width: 80px;
      margin: 10px auto;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    padding-right: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: #333;
    .info {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      .price {
        color: #fa2209;
      }
    }
  }
}

.flow-num-box {
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px;
  font-size: 14px;
  border-bottom: 1px solid #efefef;
  .money {
    color: #fa2209;
  }
}

.pay-cell {
  font-size: 14px;
  padding: 10px 12px;
  color: #333;
  display: flex;
  justify-content: space-between;
  .red {
    color: #fa2209;
  }
}
.pay-detail {
  border-bottom: 1px solid #efefef;
}

.pay-way {
  font-size: 14px;
  padding: 10px 12px;
  border-bottom: 1px solid #efefef;
  color: #333;
  .tit {
    line-height: 30px;
  }
  .pay-cell {
    padding: 10px 0;
  }
  .van-icon {
    font-size: 20px;
    margin-right: 5px;
  }
}

.buytips {
  display: block;
  textarea {
    display: block;
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 12px;
    height: 100px;
  }
}

.footer-fixed {
  position: fixed;
  background-color: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  border-top: 1px solid #efefef;
  font-size: 14px;
  display: flex;
  .left {
    flex: 1;
    padding-left: 12px;
    color: #666;
    span {
      color:#fa2209;
    }
  }
  .tipsbtn {
    width: 121px;
    background: linear-gradient(90deg,#f9211c,#ff6335);
    color: #fff;
    text-align: center;
    line-height: 46px;
    display: block;
    font-size: 14px;
  }
}
</style>

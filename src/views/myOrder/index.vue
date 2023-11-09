<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active" sticky>
      <van-tab name="all" title="全部"></van-tab>
      <van-tab name="payment" title="待支付"></van-tab>
      <van-tab name="delivery" title="待发货"></van-tab>
      <van-tab name="received" title="待收货"></van-tab>
      <van-tab name="comment" title="待评价"></van-tab>
    </van-tabs>

    <OrderListItemComp v-for="item in list" :key="item.order_id" :item="item"></OrderListItemComp>
  </div>
</template>

<script>
import OrderListItemComp from '@/components/OrderListItemComp.vue' // 导入 订单展示框 组件
import { getMyOrderListApi } from '@/api/order'// 获取 api封装方法 中的 "获取订单列表"

export default {
  name: 'MyOrderIndex', // 我的订单模块模块
  data () {
    return {
      active: this.$route.query.dataType || 'all', // 激活的索引, 优先从路径中获取, 默认为全部 all
      page: 1, // 当前页码
      list: [] // 订单数组
    }
  },
  methods: {
    async getOrderList () { // 发送请求, 获取订单列表
      const { data: { list } } = await getMyOrderListApi(this.active, this.page)
      // 后台没有返回商品总数, 所以这里手动的进行了累加
      list.data.forEach((item) => {
        item.total_num = 0 // 声明一个新变量total_num: 商品总数
        item.goods.forEach(goods => { // 遍历: 累加每个订单的购买总数为全部商品总数
          item.total_num += goods.total_num // 取得商品总数
        })
      })
      this.list = list.data
    }
  },
  watch: {
    active: { // 监视索引变化, 如果索引改变, 即用户切换了不同类型的订单
      immediate: true, // 页面加载时立即进行一次监视
      handler () {
        this.getOrderList() // 重新请求订单列表
      }
    }
  },
  components: {
    OrderListItemComp
  }
}
</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
</style>

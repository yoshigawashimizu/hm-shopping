<!-- 组件: "猜你喜欢","商品搜索结果"商品展示框 -->
<template>
  <!-- 显示条件: 商品的id goods_id 存在 -->
  <div class="goods-item" @click="$router.push(`/prodetail/${item.goods_id}`)" v-if="item.goods_id">
    <div class="left">
      <!-- 商品图片 -->
      <img :src="item.goods_image" alt="" />
    </div>
    <div class="right">

      <!-- 商品名称 -->
      <p class="tit text-ellipsis-2">
        {{ item.goods_name }}
      </p>

      <!-- 已售数量 -->
      <p class="count">已售{{ item.goods_sales }}件</p>

      <!-- 商品价格 -->
      <p class="price">

        <!-- 原价 -->
        <span class="new">¥{{ item.goods_price_min }}</span>
        <!-- 现价/折扣价 -->
        <span class="old">¥{{ item.goods_price_max }}</span>

      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem', // 商品展示框组件
  props: {
    item: { // 数据父传子, 使用的属性名为 item
      type: Object,
      default: () => { // 备注: 当想要设置默认值为"一个对象"时, 不可以直接使用 "{}", 而是使用函数设置默认值 "default: () => { return {} }"
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods-item {
  margin-bottom: 6px;
  height: 148px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 127px;
    img {
      display: block;
      width: 100%;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .count {
      color: #999;
      font-size: 12px;
    }
    .price {
      color: #999;
      font-size: 16px;
      .new {
        color: #f03c3c;
        margin-right: 10px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
      }
    }
  }
}
</style>

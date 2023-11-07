<!-- 组件: "猜你喜欢","商品搜索结果"商品展示框 -->
<template>
  <!-- 判断: 商品的id goods_id 存在 -->
  <div class="goods-item" @click="$router.push(`/prodetail/${item.goods_id}`)" v-if="item.goods_id">
    <div class="left">
      <!-- 商品图片 -->
      <img :src="item.goods_image" alt="" />
    </div>
    <div class="right">
      <p class="tit text-ellipsis-2">
        <!-- 商品名称 -->
        {{ item.goods_name }}
      </p>
      <p class="count">已售{{ item.goods_sales }}件</p>
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
    // 数据父传子, 使用的属性名为 item
    item: {
      type: Object,
      default: () => { // 如果默认值是对象, 则设置默认值时使用函数设置默认值, 不可以直接{}
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

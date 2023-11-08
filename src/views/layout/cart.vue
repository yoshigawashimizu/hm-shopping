<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <!-- 购物车开头 -->
    <div class="cart-title">
      <span class="all">共<i>{{ cartTotal }}</i>件商品</span>
      <span class="edit">
        <van-icon name="edit" />
        编辑
      </span>
    </div>

    <!-- 购物车列表 -->
    <div class="cart-list">
      <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
        <!-- 复选框: 单项选择 -->
        <van-checkbox :value="item.isChecked" @click="toggleCheck(item.goods_id)"></van-checkbox>
        <div class="show">
          <img :src="item.goods.goods_image" alt="">
        </div>
        <div class="info">
          <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
          <span class="bottom">
            <div class="price">¥ <span>{{ item.goods.goods_price_min }}</span></div>
            <CountBox :value="item.goods_num"></CountBox>
          </span>
        </div>
      </div>
    </div>

    <div class="footer-fixed">
      <!-- 全选按钮 -->
      <!-- 点击触发"切换全选状态"事件, 形参为新的选中状态, 这里传入"已有全选状态"的取反, 即已全选 => 全不选, 未全选 => 被全选  -->
      <div  class="all-check" @click="toggleAllCheck(!isAllChecked)">
        <van-checkbox  icon-size="18" :value="isAllChecked"></van-checkbox>
        全选
      </div>

      <div class="all-total">
        <div class="price">
          <span>合计：</span>
          <span>¥ <i class="totalPrice">{{ selectedPrice }}</i></span>
        </div>
        <!-- 代码优化: 未选中任何商品, 按钮失活; css样式里提供了一个 disable 类, 当按钮不可用时切换 -->
        <div v-if="true" class="goPay" :class="{ disabled: selectedCount === 0 }">结算({{ selectedCount }})</div>
        <div v-else class="delete" :class="{ disabled: selectedCount === 0 }">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'// 导入计数盒子组件
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex' // 导入 vuex 提供的 map映射方法们
export default {
  name: 'cartIndex',
  methods: {
    ...mapActions('cart', ['getCartAction', 'toggleCheck']), // 导入 cart模块中的"获取购物车数据列表" 等方法
    ...mapMutations('cart', ['toggleCheck', 'toggleAllCheck']) // 导入 cart 模块中的切换复选框选中状态 的方法
  },
  computed: {
    ...mapState('cart', ['cartList']), // 导入 cart模块中的购物车列表数据
    ...mapGetters('cart', [ // 获取 cart模块中的计算属性们
      'cartTotal', // 所有商品的累加总数
      'selectedCartList', // 被选中的商品项
      'selectedCount', // 被选中的商品总数
      'selectedPrice', // 被选中的商品的总价
      'isAllChecked' // 商品是否被全选
    ])
  },
  created () {
    // 判断: 页面加载时用户是否有登录
    if (this.$store.getters.token) { // 通过 token 判断
      this.getCartAction()
    }
  },
  components: {
    CountBox // 计数盒子组件
  } // 二级路由, 购物车组件
}
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay, .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }

}
</style>

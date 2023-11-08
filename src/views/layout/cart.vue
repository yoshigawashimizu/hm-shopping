<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />

    <!-- 这是用户成功登录, 且购物车有数据时才展示的盒子 -->
    <div v-if="isLogin && cartList.length > 0 ">
      <!-- 购物车开头 -->
      <div class="cart-title">
      <span class="all">共<i>{{ cartTotal }}</i>件商品</span>
      <span class="edit">
        <van-icon name="edit" @click="isEdit=!isEdit"/>
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
            <!-- 计数盒子 -->
            <!-- 特别注意: 监听 @input 时 (1) 需要组件的 input 通知的传值 (2) 又需要调用函数传参
            解决方法: 使用箭头函数包装一层, 组件的传值用形参 value 接收, 函数的传值用函数的形参 item 来接收 -->
            <CountBox
            @input="(value) => changeCount(
              value, // 商品购买数量 goodsNum
              item.goods_id, // 商品id
              item.goods_sku_id // 商品规格SkuId
            )"
            :value="item.goods_num">
            </CountBox>
          </span>
        </div>
      </div>
      </div>

      <!-- 购物车底部 -->
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
        <div v-if="!isEdit" class="goPay" :class="{ disabled: selectedCount === 0 }">结算({{ selectedCount }})</div>
        <div v-else class="delete" :class="{ disabled: selectedCount === 0 }" @click="handleDel">删除</div>
      </div>
      </div>
    </div>

    <!-- 这是用户未登录, 或者购物车无数据时才展示的盒子-->
    <div class="empty-cart" v-else>
      <img src="@/assets/empty.png" alt="">
      <div class="tips">
        您的购物车是空的, 快去逛逛吧
      </div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'// 导入计数盒子组件
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex' // 导入 vuex 提供的 map映射方法们
export default {
  name: 'cartIndex',
  data () {
    return {
      isEdit: false// '编辑按钮'是否为编辑状态, 默认为 false
    }
  },
  methods: {
    ...mapActions('cart', [
      'getCartAction', // 获取购物车列表数据
      'changeCountAction', // 更新数据库里商品的购买数量
      'delSelect' // 删除选中的商品
    ]),
    ...mapMutations('cart', [
      'toggleCheck', // 点击单项复选框, 切换商品选中状态
      'toggleAllCheck' // 通过传入的 flag 的值, 切换全选状态
    ]),

    /** 组件: 计数盒子发起的通知事件
     *
     * @param {*} goodsNum 当前商品购买数量
     * @param {*} goodsId 当前商品id
     * @param {*} goodsSkuId 当前商品规格SkuId
     */
    changeCount (goodsNum, goodsId, goodsSkuId) {
      console.log('当前商品购买数量:', goodsNum, '当前商品id:', goodsId, '当前商品规格SkuId:', goodsSkuId)
      // 调用 cart 模块中的 action 方法, 进行数量的修改
      this.changeCountAction({ goodsNum: goodsNum, goodsId: goodsId, goodsSku: goodsSkuId })
    },

    /** 点击删除按钮触发删除事件
     *
     */
    async handleDel () {
      // 非空判断: 当前选中的商品总数是否为0
      if (this.selectedCount === 0) {
        return
      }
      // 调用 cart 模块中的方法, 删除选中的商品项
      await this.delSelect()
      this.isEdit = false // 删除商品之后, 重置编辑模式为结算模式
    }
  },
  computed: {
    ...mapState('cart', ['cartList']), // 导入 cart模块中的购物车列表数据
    ...mapGetters('cart', [ // 获取 cart模块中的计算属性们
      'cartTotal', // 所有商品的累加总数
      'selectedCartList', // 被选中的商品项
      'selectedCount', // 被选中的商品总数
      'selectedPrice', // 被选中的商品的总价
      'isAllChecked' // 商品是否被全选
    ]),
    isLogin () { // 用户登录状态: 是否登录
      return this.$store.getters.token // 有无拿到传递的 token
    }
  },
  watch: {
    // 监视编辑模式变化
    isEdit (newValue) {
      // 判断: 是否进入了编辑模式
      if (newValue === true) {
        this.toggleAllCheck(false) // 删除模式, 将复选框状态变成全不选
      } else {
        this.toggleAllCheck(true) // 编辑模式, 将复选框状态变成全选
      }
    }
  },
  created () {
    // 判断: 页面加载时用户是否有登录
    if (this.isLogin) { // 通过 token 判断
      this.getCartAction() // 获取购物车列表数据
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

// 空购物车样式
.empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>

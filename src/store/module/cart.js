// 这是购物车模块的状态管理的文件
import { getCartList } from '@/api/cart.js'// 导入获取购物车列表数据的api方法
export default {
  namespaced: true, // 开启名称空间
  state () {
    return {
      cartList: [] // 购物车列表
    }
  },
  mutations: {
    /** 设置购物车列表的方法
     *
     * @param state 状态
     * @param obj 传参
     *            {
     *              cartList: 购物车列表
     *              cartTotal: 商品总数
     *            }
     */
    setCartList (state, cartList) {
      state.cartList = cartList // 存入购物车列表
    }
  },
  actions: {
    // 发送异步请求, 获取购物车列表数据
    async getCartAction (context) { // 注意: 不要忘记写context
      const { data } = await getCartList() // 获取购物车列表数据
      // 后台返回回来的数据中, 不包含复选框的选中状态, 需手动添加
      data.list.forEach(item => {
        item.isChecked = true // 给每一项都添加一个 isChecked 状态, 标记当前商品是否选中
      })
      context.commit('setCartList', data.list) // 将关键数据存入到 state 中
    }
  },
  getters: {
    cartTotal (state) { // 求所有商品的累加总数
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },

    selectedCartList (state) { // 被选中的商品项
      return state.cartList.filter(item => item.isChecked) || []
    },

    // 备注: 获取被选中的商品总数, 写法一, 直接书写
    // selectedCount (state) {
    //   return state.cartList.reduce((sum, item) => item.isChecked ? sum + item.goods_num : sum, 0)
    // }

    // 备注: 获取被选中的商品总数, 写法二, 在 getters 里调用其他的 getters
    selectedCount (state, getters) { // vuex 支持将其他的 getters 作为传参传入
      return getters.selectedCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },

    selectedPrice (state, getters) { // 被选中的商品的总价
      return getters.selectedCartList.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min // goods_num: 商品购买数 goods_price_min: 商品单价
      }, 0).toFixed(2) // 代码优化: 永远保留两位小数
    }
  }
}

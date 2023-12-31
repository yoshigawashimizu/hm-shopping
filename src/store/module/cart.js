// 这是购物车模块的状态管理的文件
import { getCartList, changeCountApi, delSelectApi } from '@/api/cart.js'// 导入获取购物车列表数据的api方法
import { Toast } from 'vant'
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
     * @param {Array} cartList 购物车列表
     */
    setCartList (state, cartList) {
      // console.log('新购物车列表:', cartList) // 调试用代码: 获取新购物车列表数据
      state.cartList = cartList // 存储购物车列表数据
    },

    /** 点击单项复选框, 切换商品选中状态
     * toggle 译为"切换"
     *
     * @param {String}goodsId 被切换的商品项的商品id
     */
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId) // 获取被修改的商品的商品项
      goods.isChecked = !goods.isChecked // 对自己的被选取状态取反
    },

    /** 通过传入的 flag 的值, 切换全选状态.
     * 传递过来的 flag, 其实就是组件页面中的 computed 中得到的 "是否被全选 isAllChecked"的值取反
     *
     * @param {Boolean} flag 复选框新状态
    */
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },

    /** 手动修改本地页面展示的商品总数
     *
     * @param {String} goodsId 被更新的商品id
     * @param {String} goodsNum 新商品总数
     */
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum // 传入新商品总数
    }
  },

  actions: {
    // 发送异步请求, 获取购物车列表数据
    async getCartAction (context) { // 备注: action 里的方法第一个形参永远是 context
      const { data } = await getCartList() // 获取购物车列表数据
      // 后台返回回来的数据中, 不包含复选框的选中状态, 需手动添加
      data.list.forEach(item => {
        item.isChecked = true // 给每一项都添加一个 isChecked 状态, 标记当前商品是否选中
      })
      context.commit('setCartList', data.list) // 将关键数据存入到 state 中
    },

    /** 发送异步请求, 更新数据库里商品的购买数量
     *
     * @param {Object} obj 传参载荷
     * @param {String} obj.goodsNum 商品数量
     * @param {String} obj.goodsId 商品id
     * @param {String} obj.goodsSku 商品规格id
     */
    async changeCountAction (context, obj) {
      const {
        goodsNum, // 商品数量
        goodsId, // 商品id
        goodsSku // 商品规格id
      } = obj

      // console.log('当前商品购买数量:', goodsNum, '当前商品id:', goodsId, '当前商品规格SkuId:', goodsSku) // 调试用代码: 获取被修改的商品的id, 商品规格, 以及新的购买数量

      // 先本地修改
      context.commit('changeCount', { goodsId: goodsId, goodsNum: goodsNum })
      // 再同步到后台数据库
      await changeCountApi(goodsId, goodsNum, goodsSku) // 备注: 也许这里可以进行防抖优化
    },

    /** 发送异步请求, 删除数据库里商品 */
    async delSelect (context) {
      const selectedCartList = context.getters.selectedCartList // 获取 "被选中的商品" 的数组
      // 取出"被选中的商品"的数组中的属性 → id , 存入新数组 cartIds 中
      const cartIds = selectedCartList.map(item => item.id)

      // console.log('被选中的商品的id的数组', cartIds) // 调试用代码: 获取 "被选中的商品的id" 的数组

      await delSelectApi(cartIds) // 发送删除请求 特别注意! 如果 cardIds 数组为空, 会清空购物车!!!
      Toast.success('删除成功') // 向用户通知反馈
      context.dispatch('getCartAction') // 重新获取购物车数据
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
      }, 0).toFixed(2) // 代码优化: 'toFixed(2)' 永远保留两位小数
    },

    isAllChecked (state) { // 购物车商品是否被全选, 是返回 true, 否则返回 false
      return state.cartList.every(item => item.isChecked === true)
    }
  }
}

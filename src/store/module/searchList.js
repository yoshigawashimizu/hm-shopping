// 这是搜索展示列表模块的状态管理的文件
import { getProList } from '@/api/product.js' // 调用 axios 的二次封装类

export default {
  namespaced: true, // 开启名称空间
  state () {
    return {
      querySearch: '', // 用户输入的搜索关键字
      categoryId: '', // 分类页搜索关键字id
      page: 1, // 返回页码, 默认为1
      proList: [], // 返回搜索结果列表
      total: 0 // 返回数据总条数
    }
  },
  mutations: {
    /** 发送自定义请求获取到商品搜索结果列表
     *
     * @param {Object} obj 传参载荷
     * @param {String} obj.sortType 结果排序规则
     * @param {String} obj.categoryId 分类页id
     * @param {String} obj.sortPrice 价格排序规则
     * @param {String} obj.goodsName 商品名称/用户输入的搜索词
     * @param {Number} obj.page 页码
     */
    async setProList (state, obj) {
      state.querySearch = obj.goodsName // 将 '商品名称/用户输入的搜索词' 存入 state 中
      state.categoryId = obj.categoryId // 将分类页搜索关键字id categoryId 存入 state 中

      // 发起请求, 获取搜索结果
      const { data: { list } } = await getProList(obj)
      // console.log('获取到的商品列表数组:', list) // 测试用代码: 搜索结构, 商品数据
      state.page = list.current_page // 存储返回页面
      state.proList = list.data // 存储搜索结果列表
      state.total = list.total // 存储返回数据总条数
    }
  }
}

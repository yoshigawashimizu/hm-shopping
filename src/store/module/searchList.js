// 这是搜索展示列表模块的状态管理的文件
import { getProList } from '@/api/product.js' // 调用 axios 的二次封装类
export default {
  namespaced: true, // 开启名称空间
  state () {
    return {
      querySearch: '', // 用户输入的搜索关键字
      page: 1, // 返回页码, 默认为1
      proList: [], // 返回搜索结果列表
      total: 0 // 返回数据总条数
    }
  },
  mutations: {
    /** 发送请求获取到商品搜索结果列表
     *
     * @param obj 查询传参
     * {
     *  sortType: 结果排序规则, 默认为'all'按综合搜索
        sortPrice: 价格排序规则, 可选
        categoryId: 分类页id, 可选
        goodsName: 商品名称, 可选
        page: 页码, 默认为 1
     * }
     * */
    async setProList (state, obj) {
      state.querySearch = obj.goodsName// 将用户输入的搜索关键字存入 state 中
      const { data: { list } } = await getProList(obj)
      console.log(list)
      state.page = list.current_page
      state.proList = list.data
      state.total = list.total
    }
  },
  actions: {
  },
  getters: {

  }
}

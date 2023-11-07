// 这是搜索模块的状态管理的文件
export default {
  namespaced: true, // 开启名称空间
  state () {
    return {
      search: '', // 输入框的内容
      history: ['手机', '白酒', '电视'] // 搜索历史
    }
  },
  mutations: {
    /** 点击搜索按钮, 通过关键字进行商品搜索
     *
     * @param {*} key String 搜索的关键字
     */
    goSearch (state, key) {
      console.log('进行了搜索, 搜索历史要更新', key)
      const index = state.history.indexOf(key) // 查询搜索的关键字在历史数组中的索引位置
      // 判断: 找到的索引是否不为 -1(即有找到历史中的关键字)
      if (index !== -1) {
        // 将原有关键字移除
        state.history.splice(index, 1) // 从 index 索引位置开始, 删除1个
      }
      state.history.unshift(key) // 将搜索关键字添加到第1个位置
    },

    /** 传递输入框内容, 更新 state 中的 search 变量
     *
     * @param newSearchKey 输入框内容
     */
    updateSearch (state, newSearchKey) {
      state.search = newSearchKey
    },
    /** 清空搜索历史
     *
     */
    clearHistory (state) {
      state.history = []
    }
  },
  actions: {
  },
  getters: {
  }
}

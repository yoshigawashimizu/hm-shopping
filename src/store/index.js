import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/module/user.js'// 导入用户模块 user
import home from '@/store/module/home.js'// 导入首页模块 home
import search from '@/store/module/search.js' // 导入搜索模块 search
import searchList from '@/store/module/searchList' // 导入搜索结果列表模块 searchList

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    // 获取 token, token 从 user 模块中获取会方便一些
    token (state) {
      return state.user.userInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user, // 用户模块
    home, // 首页模块
    search, // 搜索模块
    searchList // 搜索结果展示列表
  }
})

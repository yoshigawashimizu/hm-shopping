import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/module/user.js'// 导入用户模块 user

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user // 用户模块
  }
})

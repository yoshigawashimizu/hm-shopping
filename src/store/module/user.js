// 这是用户模块的状态管理文件
export default {
  namespaced: true, // 开启名称空间
  state () {
    return {
      userInfo: { // 个人权证相关信息
        token: '', // token 令牌
        userId: '' // 用户id
      }
    }
  },
  mutations: {
    /** 设置个人权证相关信息
     *
     * @param state: 当前模块状态库
     * @param newUserInfo: Object 新个人权证相关信息
     * {
     *   @param newToken: 新token令牌
     *   @param newUserId: 新用户id令牌
     * }
     *  */
    setUserInfo (state, newUserInfo) {
      state.userInfo = newUserInfo // 将"新个人权证相关信息"赋值给"个人相关权证信息"
    }
  },
  actions: {
  },
  getters: {
  }
}

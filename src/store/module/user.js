// 这是用户模块的状态管理文件
import { getInfo, setInfo } from '@/utils/storage.js'// 导入"数据持久化"方法
import { Toast } from 'vant' // 导入 toast 轻提示弹窗组件
export default {
  namespaced: true, // 开启名称空间
  state () {
    return {
      userInfo: getInfo() // 个人权证相关信息 默认为 { token: '', userId: ''} token: token令牌; userId: 用户id
    }
  },
  mutations: {
    /** 设置个人权证相关信息
     *
     * @param {Object} state: 当前模块状态库
     * @param {Object} newUserInfo: Object 新个人权证相关信息
     * {
     *   @param {String} token: 新token令牌
     *   @param {String} userId: 新用户id令牌
     * }
     *  */
    setUserInfo (state, newUserInfo) {
      console.log(newUserInfo)

      state.userInfo = newUserInfo // 将"新个人权证相关信息"赋值给"个人相关权证信息"
      console.log(state.userInfo)
      setInfo(newUserInfo) // "新个人权证相关信息" 持久化到本地
    }
  },
  actions: {
    /** 用户登出, 清楚本地数据 */
    logout (context) {
      context.commit('setUserInfo', {})// 清除个人消息, 包括 token 与 用户id
      // 特别注意: A模块调用其他模块B模块里的内容, 需要提高权限
      context.commit('cart/setCartList', [], { root: true })

      // 提示用户登出成功
      Toast.success('登出成功')
    }
  },
  getters: {
  }
}

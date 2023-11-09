// 此处编写的就是 Vue组件实例的 配置项, 通过一定的语法, 可以直接混入到组件内部
// 注意点: (1) 如果此处的 data 与 methods 与组件中的同名, 则组件内的优先级更高
//        (2) 生命周期函数里的方法不会冲突, 会将两者方法用数组管理, 同一执行

/** 这是 判断用户是否登录, 未登录的用户会有弹窗提示登录
 *
 * @returns Boolean 是否发送过弹窗: 发送过 → 返回 true, 未发送过 → 返回 false
 */
export default {
  data () {
    return {
    }
  },
  methods: {

    /** 用户登录确认
     * 如果用户进行了加入购物车或者立即购买等操作, 则需要进行用户登录判断
     * (1) 登录 → 不拦截, 返回 false !
     * (2) 未登录 → 拦截, 返回 true !
     */
    loginConfirm () {
      // 判断: token 是否存在 (1) 不存在, 弹框确认, (2) 存在, 继续请求操作
      // 提示: token 已被配置到全局
      if (!this.$store.getters.token) {
        // 未登录, 弹框确认
        this.$dialog.confirm({
          title: '温馨提示', // title: 标题
          message: '此时需要先登录才能继续操作哦', // message: 提示信息
          confirmButtonText: '去登录', // confirmButtonText: 确定按钮文本
          cancelButtonText: '再逛逛' // cancelButtonText: 取消按钮文本
        })
          .then(() => { // 点击确认, 跳转到登录页
            // 希望登录后能跳转回来, 需要在跳转去携带参数 (当前路径地址)
            // this.$router.fullPath (会包含参数)当前路径地址 样式: /login?backUrl=%2Fprodetail%2F10039
            this.$router.replace({ // 代码优化: 用 replace()方法替换 push()方法, 不保留历史
              path: '/login', // 跳转地址
              query: {
                backUrl: this.$route.fullPath // backUrl: (路径传参自定义变量)回跳地址=当前路径地址
              }
            })
          }) // 点击确定
          .catch(() => {}) // 点击取消, 无逻辑处理
        return true // 确认已经显示了弹框
      }
      return false // 确认没有显示过弹框
    }

  }
}

<template>
  <div class="login">
    <!-- 头部 - NavBar -->
    <van-nav-bar
    title="会员登录"
    left-arrow
    @click-left="$router.go(-1)"
    ></van-nav-bar>
    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <!-- 手机号 -->
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="mobile">
        </div>
        <!-- 图形验证码 -->
        <div class="form-item">
          <input class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model="picCode">
          <!-- 基于请求回来的 base64 图片, 实现图形验证码功能 v-if:当图片加载完成时才显示, 避免图片碎裂效果 -->
          <img :src="picUrl" alt="" v-if="picUrl" @click="getPicCode">
        </div>
        <!-- 短信验证码校验 -->
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text" >
          <button @click="getCode">
          {{ second === totalSecond ? '点击获取验证码' : second + '秒后重新发送'}}
          </button>
        </div>
      </div>
      <!-- 登录按钮 -->
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'// 按需导入请求函数
export default {
  name: 'LoginIndex', // 登录模块
  data () {
    return {
      picKey: '', // 请求时一同传递的"图形验证码唯一标识"字符串
      picUrl: '', // 存储请求渲染的图片地址

      totalSecond: 60, // 发送验证码冷却秒数: 60秒
      second: 60, // 发送验证码冷却的当前秒数
      timer: null, // 发送验证码的定时器 id

      mobile: '', // 用户输入的手机号
      picCode: '', // 用户输入的图片验证码
      msgCode: '' // 用户输入的短信验证码
    }
  },
  created () {
    // // 进入页面, 发送请求, 获取验证码
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      // 解构出的对象:
      // base64: 验证码图片
      // key: 图像验证码唯一标识,用于请求时验证
      this.picUrl = base64 // 存储地址
      this.picKey = key // 存储唯一标识
    },

    // 点击获取短信验证码
    async getCode () {
      // 判断: 用户输入的 手机号 与 图形验证码 没有通过校验
      if (!this.validFn()) {
        // 没有通过校验
        return
      }
      // 判断: 当前没有已经开启的定时器, 且 totalSecond 与 second 相等(时  器归位)
      if (!this.timer && (this.totalSecond === this.second)) {
        // 发送短信验证码
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        // 轻提示: 告诉用户验证码发送成功
        this.$toast.success('验证码短信发送成功,请注意查收')
        // 开启短信倒计时, 每隔1s当前秒数减一
        this.timer = setInterval(() => {
          this.second--

          // 判断: 计时器数字是否小于等于0
          if (this.second <= 0) {
            clearInterval(this.timer) // 清空计时器
            this.timer = null // 计时器重置
            this.second = 60 // 当前秒数重置
          }
        }, 1000)
      }
    },

    /** 校验 手机号 与 图形验证码 是否合法
     *
     * @returns 校验通过返回 true, 校验未通过返回 false
     *  */
    validFn () {
      // 判断: 用户手机号是否不符合: 以1开头,第二为3-9,后面加上9位数字
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) { // 注意: 正则表达式后面可以直接使用.test() 方法来判断字符串
        this.$toast.fail('请输入正确格式的手机号')
        return false
      }
      // 判断: 用户输入的验证码是否不符合: 仅包含4个字毞字符（字母、数字或下划线）的字符串
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast.fail('请输入正确的图形验证码')
        return false
      }
      return true
    },

    /** 点击登录按钮进行登录
     *
     */
    async login () {
      // 判断: 用户输入的手机号与验证码格式是否未通过校验
      if (!this.validFn()) {
        return
      }

      // 判断: 短信验证码是否不符合格式
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast.fail('请输入正确格式的短信验证码')
        return
      }

      // 发送请求, 登录, 获得返回的 token 令牌与 用户id
      const res = await codeLogin(this.mobile, this.msgCode)
      // 将返回的 token 令牌与 用户id存入 user 模块的状态中
      this.$store.commit('user/setUserInfo', res.data)

      // 提示用户登录成功
      this.$toast.success('登录成功,即将跳转到主页面')
      setTimeout(() => {
        this.$router.push('/')
      }, 1400) // 1.4 秒后跳转到主页面
    }
  },
  destroyed () {
    // 离开页面清除计时器
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    // 设置"获取验证码"文字
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent; // 透明背景
      padding-right: 9px;
    }
  }

  .login-btn { // 登录按钮
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 39px;
    width: 100%;
    height: 42px;
    background: linear-gradient(90deg,#ecb53c,#ff9211); // 渐变 从左到右
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px; // 字符间距为2
  }
}
</style>

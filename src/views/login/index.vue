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
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <!-- 图形验证码 -->
        <div class="form-item">
          <input class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model="picCode">
          <!-- 基于请求回来的 base64 图片, 实现图形验证码功能 v-if:当图片加载完成时才显示, 避免图片碎裂效果 -->
          <img :src="picUrl" alt="" v-if="picUrl" @click="getPicCode">
        </div>
        <!-- 短信验证码校验 -->
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text">
          <button>获取验证码</button>
        </div>
      </div>
      <!-- 登录按钮 -->
      <div class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode } from '@/api/login'// 按需导入请求函数
export default {
  name: 'LoginIndex', // 登录模块
  data () {
    return {
      picCode: '', // 用户输入的验证码字符串
      picKey: '', // 请求时一同传递的"图形验证码唯一标识"字符串
      picUrl: '' // 存储请求渲染的图片地址
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
    }
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

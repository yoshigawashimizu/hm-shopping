<!-- 首页底部的四个导航按钮 -->
<template>
  <!-- route 属性:开启 vue-router 的路由导航 -->
  <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" route>
    <!-- replace 属性:是否允许用户通过返回键返回到上一个页面 to 属性:与 vue-Router 中的to 属性一致 -->
    <van-tabbar-item to='/home' icon="wap-home-o" >首页</van-tabbar-item>
    <van-tabbar-item to='/category' icon="apps-o">分类页</van-tabbar-item>
    <van-tabbar-item to='/cart' icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to='/user' icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'tabbarComp', // 底部导航组件
  data () {
    return {
      active: 0 // 默认选取第一个导航项
    }
  }
}
</script>

<style>

</style>

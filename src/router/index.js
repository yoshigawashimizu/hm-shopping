import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login' // 登录模块
import Layout from '@/views/layout' // 首页架子模块
import Search from '@/views/search' // 搜索模块模块
import SearchList from '@/views/search/list.vue' // 搜索结果列表模块
import ProDetail from '@/views/prodetail' // 商品详情模块
import Pay from '@/views/pay' // 支付模块
import MyOrder from '@/views/myOrder' // 我的订单模块
import NotFound from '@/views/notFound' // 404未找到模块
// 二级路由模块👇
import Home from '@/views/layout/home.vue' // 首页模块
import Category from '@/views/layout/category.vue' // 分页类模块
import Cart from '@/views/layout/cart.vue' // 购物车模块
import User from '@/views/layout/user.vue' // 用户模块

Vue.use(VueRouter)

// 路由映射表
const routes = [
  { // 首页架子模块
    path: '/',
    component: Layout, // 首页架子模块
    redirect: '/home', // 重定向到首页模块
    children: [
      { path: '/home', component: Home }, // 首页模块
      { path: '/category', component: Category }, // 分类页模块
      { path: '/cart', component: Cart }, // 购物车模块
      { path: '/user', component: User } // 用户模块
    ]
  },
  { path: '/login', component: Login }, // 登录模块
  { path: '/search', component: Search }, // 搜索模块
  { path: '/searchlist', component: SearchList }, // 搜索结果列表模块
  { path: '/prodetail/:id', component: ProDetail }, // 商品详情模块, 动态传参
  { path: '/pay', component: Pay }, // 支付模块
  { path: '/myorder', component: MyOrder }, // 我的订单模块
  { path: '/*', component: NotFound } // 404 未找到页面
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login' // 登录模块
import Layout from '@/views/layout' // 登录模块
import Search from '@/views/search' // 登录模块
import SearchList from '@/views/search/list.vue' // 登录模块
import ProDetail from '@/views/prodetail' // 登录模块
import Pay from '@/views/pay' // 登录模块
import MyOrder from '@/views/myOrder' // 登录模块
import NotFound from '@/views/notFound' // 登录模块

Vue.use(VueRouter)

// 路由映射表
const routes = [
  { path: '/', component: Layout }, // 首页架子模块
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

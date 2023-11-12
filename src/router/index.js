import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store' // 状态管理

// ↓首页模块, 频繁加载, 无需懒加载
import Layout from '@/views/layout' // 首页架子模块
import Home from '@/views/layout/home.vue' // 首页模块
import Category from '@/views/layout/category.vue' // 分页类模块
import Cart from '@/views/layout/cart.vue' // 购物车模块
import User from '@/views/layout/user.vue' // 用户模块

// 不频繁加载内容, 懒加载
const Login = () => import('@/views/login') // 登录模块
const Search = () => import('@/views/search') // 搜索模块模块
const SearchList = () => import('@/views/search/list') // 搜索结果列表模块
const ProDetail = () => import('@/views/prodetail') // 商品详情模块
const Pay = () => import('@/views/pay') // 支付模块
const MyOrder = () => import('@/views/myOrder') // 我的订单模块
const NotFound = () => import('@/views/notFound') // 404未找到模块

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

// 所有路由在被真正访问到之前(页面被解析,渲染), 都会先经过全局前置守卫, 只有全局前置守卫放行了, 才会到达对应的页面; 放行的关键: 用户是否有登录权证: token令牌

/**
 * 全局前置导航守卫
 * to: 目标路由, 完整目标路由信息(路径, 传参, 完整路径等)
 * from: 来源路由, 完整来源路由信息对象(路径, 传参, 完整路径等)
 * next(): 放行函数, 是否放行
 *         (1) 用法一: next()           直接放行, 跳转到下一个守卫/跳转到to的路径
 *         (2) 用法二: next('/指定路径') 进行拦截, 强制跳转到形参里配置的路径
 */

// 声明一个变量: 权限页面拦截名单, 访问名单内页面需要权限 authUrls
// authUrls = authorization(授权) + urls - URLs(统一资源定位器)
const authUrls = [
  '/pay', // 支付页面
  '/myorder', // 我的订单页面
  '/cart' // 购物车页面
]

router.beforeEach((to, from, next) => {
  // 判断: 目标路由路径是否不包含在路径名单里
  if (!authUrls.includes(to.path)) {
    next() // 访问非权限页面, 直接放行
    return
  }
  const token = store.getters.token // 获取 token

  // 判断: 是否没有token
  if (!token) {
    // console.log('未能获取到请求中的 token, 自动跳转到登录页面') // 调试用代码: 判断用户发送的请求里有无携带 token 令牌
    next('/login') // 跳转到登录页面
  } else {
    next() // 放行
  }
})

export default router

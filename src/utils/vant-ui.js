// 按需引入,统一引入所需的的 vant-ui 组件
import Vue from 'vue'

import { Tab, Tabs, Checkbox, Search, Swipe, SwipeItem, Grid, GridItem, Tabbar, TabbarItem, Icon, NavBar, Toast, Lazyload, Rate, ActionSheet, Dialog } from 'vant' // 这个步骤是不能少的
Vue.use(Tab) // XXX组件
Vue.use(Tabs) // XXX组件
Vue.use(Checkbox) // 复选框组件
Vue.use(Tabbar) // 导航组件
Vue.use(TabbarItem) // 导航组件
Vue.use(Icon) // 图标
Vue.use(NavBar) // 导航栏
Vue.use(Toast) // toast轻提示
Vue.use(Search) // 搜索框
Vue.use(Swipe) // 轮播图组件
Vue.use(SwipeItem) // 轮播图组件
Vue.use(Grid) // 布局组件
Vue.use(GridItem) // 布局组件
Vue.use(Rate) // 评级组件
Vue.use(ActionSheet) // 底部弹层组件
Vue.use(Dialog) // 弹窗组件
Vue.use(Lazyload) // Lazyload是 Vue 指令，使用前需要对指令进行注册。

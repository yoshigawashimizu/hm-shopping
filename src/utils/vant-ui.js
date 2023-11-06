// 按需引入,统一引入所需的的 vant-ui 组件
import Vue from 'vue'

import { Tabbar, TabbarItem, Icon, NavBar, Toast } from 'vant' // 这个步骤是不能少的
Vue.use(Tabbar) // 导航组件
Vue.use(TabbarItem) // 导航组件
Vue.use(Icon) // 图标
Vue.use(NavBar) // 导航栏
Vue.use(Toast) // toast轻提示

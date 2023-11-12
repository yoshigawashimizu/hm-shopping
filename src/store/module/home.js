// 这是home首页模块的状态管理的文件
import { getHomeData } from '@/api/home.js' // 导入 home 的 api 接口方法

export default {
  namespaced: true, // 开启名称空间
  state () {
    return {
      page: {}, // 页面配置
      items: [], // 页面配置选项 {name: 配置项名称, params: 配置项参数, style: 配置项样式, type: 配置项标签}
      bannerList: [], // 轮播图数据
      navBarList: [], // 导航数据
      proList: [] // 商品数据
    }
  },
  mutations: {
    // 设置/存入/更新首页数据
    async setHomeData (state) {
      const { data: { pageData } } = await getHomeData() // 发送请求, 获取到首页数据
      state.page = pageData.page // 存储页面配置
      state.items = pageData.items // 存储页面配置项
      state.bannerList = pageData.items[1].data // 存储轮播图数据
      state.navBarList = pageData.items[3].data // 导航数据
      state.proList = pageData.items[6].data // 商品数据
    }
  }
}

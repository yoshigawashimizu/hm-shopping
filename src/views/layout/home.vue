<template>
  <div class="home">
    <!-- 导航条 -->
    <van-nav-bar title="智慧商城" fixed />

    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请在此输入搜索关键词"
      @click="$router.push('/search')"
    />

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <!-- 来源 bannerList -->
      <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
        <img :src="item.imgUrl" alt="">
      </van-swipe-item>
    </van-swipe>

    <!-- 导航 -->
    <van-grid column-num="5" icon-size="40">
      <van-grid-item
        v-for="item in 10" :key="item"
        icon="http://cba.itlike.com/public/uploads/10001/20230320/58a7c1f62df4cb1eb47fe83ff0e566e6.png"
        text="新品首发"
        @click="$router.push('/category')"
      />
    </van-grid>

    <!-- 主会场 -->
    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>

      <div class="goods-list">
        <GoodsItem v-for="item in 10" :key="item"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue' // 导入商品展示框组件
// import { getHomeData } from '@/api/home' // 导入 api 封装方法, 获取首页所有数据
import { mapState, mapMutations } from 'vuex'// 开启 vuex 的 map 映射功能, 获取首页模块 home 中的数据
export default {
  name: 'homeIndex', // 二级路由, 首页组件
  data () {
    return {
      // page: {}, // 页面配置
      // items: [], // 页面配置选项 {name: 配置项名称, params: 配置项参数, // style: 配置项样式, type: 配置项标签}
      // bannerList: [], // 轮播图数据
      // navBarList: [], // 导航数据
      // proList: [] // 商品数据
    }
  },
  created () {
    // 发送请求, 获取首页数据, 所有数据在一个接口里全部返回了
    // const { data: { pageData } } = await getHomeData()
    // this.page = pageData.page // 存储页面配置
    // this.items = pageData.items // 存储页面配置项
    // this.bannerList = pageData.items[1].data // 存储轮播图数据
    // this.navBarList = pageData.items[3].data // 导航数据
    // this.proList = pageData.items[6].data // 商品数据
    this.setHomeData() // 存储页面数据
  },
  methods: {
    ...mapMutations('home', ['setHomeData']) // 获取 home 模块中的方法之: setHomeData 设置首页数据
  },
  computed: {
    ...mapState('home', ['page', 'items', 'bannerList', 'navBarList', 'proList']) // 获取到 home 首页模块中的状态数据, page: 页面配置 items: 页面配置选项 bannerList: 轮播图数据 navBarList: 导航数据 proList: 商品数据
  },
  components: {
    GoodsItem
  }
}

</script>

<style lang="less" scoped>
// 主题 padding
.home {
  padding-top: 100px;
  padding-bottom: 50px;
}

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
  background-color: #c21401;
  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}

// 分类导航部分
.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}

// 主会场
.main img {
  display: block;
  width: 100%;
}

// 猜你喜欢
.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>

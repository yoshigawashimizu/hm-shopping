<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch || '搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item" @click="changeSortType">{{ sortType.name }}</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue' // 导入商品展示框组件
import { mapState, mapMutations } from 'vuex'// 导入搜索模块的状态映射和方法映射

export default {
  name: 'ListIndex', // 搜索结果列表
  data () {
    return {
      sortType: { type: 'all', name: '综合' } // 结果排序规则 type: 排序规则兼传参参数 name: 页面展示标签
    }
  },
  computed: {
    /** 获取搜索输入框输入的内容 */
    querySearch () {
      return this.$route.query.search // 通过(访问到此组件的)路由中的路径传参获取到搜索词, 路径传参参数名: search
    },

    /** 获取分类页查询关键字id */
    categoryId () {
      return this.$route.query.categoryId // 通过(访问到此组件的)路由中的路径传参获取到分类页查询关键字id, 路径传参参数名: categoryId
    },

    // 导入搜索结果模块中的 返回页面 page 和 返回搜索结果列表 proList 和 用户输入的搜索内容 querySearch
    ...mapState('searchList', ['page', 'proList'])
  },
  methods: {
    ...mapMutations('searchList', ['setProList']), // 导入搜索结果模块中的 "获取结果列表" 方法
    /** 点击排序按钮, 切换排序规则, 以"综合", "销量", "价格"轮流切换 */
    changeSortType () {
      switch (this.sortType.type) {
        case 'all': // 如果 type 已经是综合搜索, 则切换到按销量搜索
          this.setProList({ sortType: 'sales', goodsName: this.querySearch }) // 请求传参为 按销量搜索 和 用户输入的搜索内容
          this.sortType = { type: 'sales', name: '销量' } // 修改结果排序规则
          break

        case 'sales': // 如果 type 已经是按销量搜索, 则切换到按价格搜索
          this.setProList({ sortType: 'prices', goodsName: this.querySearch }) // 请求传参为 按价格搜索 和 用户输入的搜索内容
          this.sortType = { type: 'prices', name: '价格' }
          break

        default:
          this.setProList({ sortType: 'all', goodsName: this.querySearch }) // 请求传参为 按价格搜索 和 用户输入的搜索内容
          this.sortType = { type: 'all', name: '综合' }
          break
      }
    }
  },
  created () {
    this.setProList({ goodsName: this.querySearch, page: this.page, categoryId: this.categoryId }) // 一加载页面就立刻获取搜索结果数据
  },
  components: {
    GoodsItem // 商品展示框组件
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
      background-color: #f7f8fa;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>

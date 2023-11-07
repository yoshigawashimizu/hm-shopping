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
      <div class="sort-item">综合</div>
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
  computed: {
    // 获取搜索输入框输入的内容
    querySearch () {
      return this.$route.query.search // 通过(访问到此组件的)路由中的路径传参获取到搜索词, 路径传参参数名: search
    },

    // 导入搜索结果模块中的 返回页面 page 和 // 返回搜索结果列表 proList
    ...mapState('searchList', ['page', 'proList'])
  },
  methods: {
    ...mapMutations('searchList', ['setProList']) // 导入搜索结果模块中的 "获取结果列表" 方法
  },
  created () {
    this.setProList({ goodsName: this.querySearch, page: this.page }) // 一加载页面就立刻获取搜索结果数据
  },
  components: {
    GoodsItem
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
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>

<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <!-- 搜索输入框 -->
    <van-search :value="search" @input="updateSearch" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <!-- "搜索"按钮 -->
        <div @click="goSearch(search)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <!-- 删除搜索历史 -->
        <van-icon name="delete-o" size="16" @click="clearHistory"/>
      </div>
      <div class="list" v-if="history.length > 0">
        <div class="list-item" v-for="item in history" :key="item" @click="goSearch(item)">
          {{ item }}
        </div>
      </div>
      <div class="list-no-history" v-else> 没有搜索历史 </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'// 导入搜索模块的状态映射和方法映射
export default {
  name: 'SearchIndex', // 搜索模块
  computed: {
    ...mapState('search', ['history', 'search']) // 导入搜索模块中的历史状态 history
  },
  methods: {
    ...mapMutations('search', ['goSearch', 'updateSearch', 'clearHistory']) // 导入搜索模块中的 开始搜索 更新搜索关键字 清空搜索历史
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list { // 有搜索历史
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-no-history { // 无搜索历史
    padding-top: 20px;
    padding-bottom: 100%;
    text-align: center; // 文字居中
    color: #c8c9cc;
    background-color: #f7f8fa;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>

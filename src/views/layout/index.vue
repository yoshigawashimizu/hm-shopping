<!-- 我是layout -->
<template>
  <div class="layout-index">
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <TabbarComp>
    </TabbarComp>
  </div>
</template>

<script>
import TabbarComp from '@/components/TabbarComp.vue'
export default {
  name: 'LayoutIndex', // 首页架子模块
  components: {
    TabbarComp // 底部导航栏
  }
}
</script>

<style>

</style>

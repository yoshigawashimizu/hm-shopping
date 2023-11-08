<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)" />

    <!-- 图片轮播区域 -->
    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="item in images" :key="item.file_id">
        <img :src="item.external_url" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ detail.goods_price_min }}</span>
          <span class="oldprice">￥{{ detail.goods_price_max }}</span>
        </div>
        <div class="sellcount">已售{{ detail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ detail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ total }}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
          <div class="top">
            <!-- 特别处理: 如果用户头像不存在, 则使用默认值 -->
            <img :src="item.user.avatar_url || defaultImg" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :value="(item.score / 2)" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <!-- 特别注意: 使用的属性 content 是带有 html 标签的, 需要使用 v-html 渲染标签 -->
    <div class="desc" v-html="detail.content">
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div class="icon-cart">
        <van-icon name="shopping-cart-o" />
        <span>购物车</span>
      </div>
      <div class="btn-add" @click="addFn">加入购物车</div>
      <div class="btn-buy" @click="buyFn">立刻购买</div>
    </div>

    <!-- 弹层: 添加到购物车 -->
    <van-action-sheet v-model="showPannel" :title="mode === 'cart'? '加入购物车' : '立即购买' ">
      <div class="product">
      <div class="product-title">
        <div class="left">
          <img :src="detail.goods_image" alt="">
        </div>
        <div class="right">
          <div class="price">
            <span>¥</span>
            <span class="nowprice">{{ detail.goods_price_min }}</span>
          </div>
          <div class="count">
            <span>库存</span>
            <span>{{ detail.stock_total }}</span>
          </div>
        </div>
      </div>
      <div class="num-box">
        <span>数量</span>
        <!-- 计数盒子组件 -->
        <CountBox v-model="addCount"></CountBox>
      </div>
      <!-- 有库存才显示购买按钮 -->
      <div class="showbtn" v-if="detail.stock_total > 0">
        <div class="btn" v-if="mode === 'cart'">加入购物车</div>
        <div class="btn now" v-else>立刻购买</div>
      </div>
      <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getProDetail, getProComments } from '@/api/product' // 导入'获取商品详细信息'等的方法
import defaultImg from '@/assets/default-avatar.png' // 导入默认用户头像
import CountBox from '@/components/CountBox.vue' // 导入通用组件记数盒子 CountBox
export default {
  name: 'ProdetailIndex', // 商品详情模块
  data () {
    return {
      images: [], // 轮播图图片, 其中 图片url 在 external_url 下, 图片id 在 file_id 下
      current: 0,
      detail: {}, // 商品详细信息
      total: 0, // 商品评价总数
      commentList: [], // 评价列表
      defaultImg, // 无头像用户的默认头像地址
      showPannel: false, // 底部"加入购物车"弹层的伸缩开关状态
      mode: 'cart', // 弹层状态, 通过状态管理弹层标题
      addCount: 1 // 组件_计数盒子绑定的数据
    }
  },
  computed: {
    // 获取来源路由中的商品id goodsId
    goodsId () {
      return this.$route.params.id // 获取到访问路径中传递的对象 id
    }
  },
  methods: {
    /** 加入购物车按钮的点击事件
     *
     */
    addFn () {
      this.mode = 'cart' // 切换弹层状态为cart
      this.showPannel = true // 开启弹层
    },
    /** 立即购买按钮的点击事件
     *
     */
    buyFn () {
      this.mode = 'buyNow' // 切换弹层状态为buy
      this.showPannel = true // 开启弹层
    },
    // 页面轮播图
    onChange (index) {
      this.current = index
    },
    /** 获取商品详细页的所有数据, 包括商品信息等等
     *
    */
    async getDetail () {
      const { data: { detail } } = await getProDetail(this.goodsId)
      this.detail = detail // 更新响应的"商品详细信息"数据
      this.images = detail.goods_images // 更新轮播图图片
    },
    /** 获取商品详细页的评价
     *
    */
    async getComments () {
      const { data: { list, total } } = await getProComments(this.goodsId, 3) // 限制展示的商品的评价是3条
      this.commentList = list // 存入评价列表
      this.total = total // 存入评价总数
    }
  },
  created () {
    // 页面一创建, 立刻发送请求获取详细商品信息
    this.getDetail()
    // 获取商品评价
    this.getComments()
  },
  components: {
    CountBox // 计数盒子
  }
}

</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100%!important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}

// 弹层样式
.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}
</style>

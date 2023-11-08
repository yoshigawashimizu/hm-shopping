<!-- 这是计数盒子 CountBox 的通用组件 -->
<template>
  <div class="count-box">
    <button class="btn-minus" @click="handleSub" :disabled="value <= 1">-</button>
    <input class="input" type="text" :value="value" @change="handleChange">
    <button class="btn-plus" @click="handlePlus">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1 // 默认值为1
    }
  },
  methods: {
    /** 点击 - 号按钮, 减少购买数量
     */
    handleSub () {
      // 判断: 当前数字是否小于等于1
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    /** 点击 + 号按钮, 增加购买数量
     */
    handlePlus () {
      this.$emit('input', this.value + 1)
    },
    // 用户通过输入框, 输入购买数量, 在 change 事件后触发
    handleChange (e) {
      const num = +e.target.value // 隐式数据转换, 转换成数字类型 Number
      // 判断: num 是不是 NaN , 或者输入的数字小于1
      if (isNaN(num) || num < 1) {
        // 不合法文本, 输入内容回退
        e.target.value = this.value // 值回退
        return
      }
      console.log(num)
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box{
  display: flex;
  width: 110px;
  .btn-minus, .btn-plus{
    height: 30px;
    width: 30px;
    outline: none;
    border: none;
  }
  .input {
    height: 30px;
    width: 40px;
    outline: none;
    border: none;
    margin: 0 5px;
    text-align: center; // 输入框内容居中
    background-color: #efefef;
  }
}
</style>

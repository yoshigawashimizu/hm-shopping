// 这是 px 自动转换成 vw 的插件" postcss "的配置文件
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配的标准屏的宽度 以iPhoneX作为默认标准宽度
      // 设计图 750, 调成1倍 => 适配 375 标准屏幕
      // 设计图 640, 调成1倍 => 适配 320 标准屏幕
      viewportWidth: 375
    }
  }
}

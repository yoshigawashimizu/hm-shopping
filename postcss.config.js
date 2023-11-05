// 这是 px 自动转换成 vw 的插件" postcss "的配置文件
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375
    }
  }
}

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 代码优化: 将属性 publicPath公共路径/更路径 修改成 './', 使得资源加载时从服务器的绝对路径 '/css/...' , 转变成相对路径'./', 使得文件放在任意的子目录下都可以被访问
  publicPath: './',
  transpileDependencies: true
})

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './', // 以./开头的相对路径打包
  transpileDependencies: true
})

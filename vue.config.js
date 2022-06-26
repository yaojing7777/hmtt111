const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // chainWebpack: config => {
  //   // html-webpack-plugin
  //   config
  //     .plugin('html')
  //     .tap(args => {
  //       return [{
  //         title: '相与枕藉乎舟中'
  //       }]
  //     })
  // }
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '相与枕藉乎舟中'
        return args
      })
  }
})

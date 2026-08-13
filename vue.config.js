// vue.config.js
module.exports = {
    assetsDir: 'static',
    productionSourceMap: false,
      // webpack-dev-server 相关配置
      devServer: {
        host: '0.0.0.0',
        port: 8080,
        open: true,
        disableHostCheck: true
      }
}


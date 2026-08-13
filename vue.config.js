// vue.config.js
module.exports = {
    // 部署到 GitHub Pages 子路径 /jsonhelp/，本地开发不受影响
    publicPath: process.env.NODE_ENV === 'production' ? '/jsonhelp/' : '/',
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


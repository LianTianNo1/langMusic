const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  // 选项...
  transpileDependencies: true,
  publicPath: "./",
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        algorithm: "gzip", // 使用gzip压缩
        test: /\.js$|\.html$|\.css/, //匹配文件名
        // filename: "[path].gz[query]", // 压缩后的文件名(保持原文件名，后缀加.gz)
        minRatio: 1, // 压缩率小于1才会压缩
        threshold: 10240, //对超过10k的数据进行压缩
        deleteOriginalAssets: false, //是否删除原文件
      }),
    ],
  }, //vue-cli3.0 里面的 vue.config.js做配置
  devServer: {
    proxy: "http://120.25.249.159:3006",
  },
};

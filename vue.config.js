// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://eduthon-api.delwathon.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' },
      },
    },
  },
};

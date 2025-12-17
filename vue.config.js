const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // สำหรับ production - ตั้งค่า publicPath
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // Output directory
  outputDir: 'dist',

  // ไม่สร้าง source map ใน production
  productionSourceMap: false,

  devServer: {
    port: 8080,
    open: true
  }
})

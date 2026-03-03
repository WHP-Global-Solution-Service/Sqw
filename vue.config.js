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
  },

  // ===== Performance Optimizations =====
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 250000,
        cacheGroups: {
          // แยก Firebase เป็น chunk ต่างหาก (ใหญ่มาก ~500KB)
          firebase: {
            name: 'firebase',
            test: /[\\/]node_modules[\\/]firebase/,
            priority: 30,
            chunks: 'all',
          },
          // แยก Turf.js (ใหญ่มาก ~500KB)
          turf: {
            name: 'turf',
            test: /[\\/]node_modules[\\/]@turf/,
            priority: 25,
            chunks: 'all',
          },
          // แยก Longdo Map
          longdo: {
            name: 'longdo',
            test: /[\\/]node_modules[\\/]longdo-map-vue/,
            priority: 20,
            chunks: 'all',
          },
          // แยก vendor อื่นๆ
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'all',
          },
        },
      },
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  },

  // CSS extraction
  css: {
    extract: process.env.NODE_ENV === 'production',
  },

  // Minify & drop console in production
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.drop_console = true;
        args[0].terserOptions.compress.drop_debugger = true;
        return args;
      });
    }
  },
})

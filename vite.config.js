import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.boot.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.boot.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // vite 相关配置
    server: {
      port: 8000,
      host: true,
      open: true,
      proxy: {
        '/dev-api': {
          target: 'http://localhost:8081',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, '')
        }
      },
    },
    //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
    // 配置静态资源目录，将public下的资源复制到构建输出目录
    publicDir: path.resolve(__dirname, 'public'),
    build: {
      // 指定输出路径（与vue2项目保持一致）
      outDir: 'src/main/resources/webjars',
      // 生成静态资源的存放路径
      assetsDir: '',
      // 启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      // 构建后是否生成 source map 文件
      sourcemap: false,
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        output: {
          // 分解块，防止单个文件过大
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // 根据包名分割代码块
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
          // 用于从入口点创建的块的打包输出格式
          entryFileNames: 'assets/js/[name].[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'assets/js/[name].[hash].js',
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
        }
      },
      // 清空构建目录
      emptyOutDir: true,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 1500,
      // 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: VITE_APP_ENV === 'production', // 生产环境去除console
          drop_debugger: VITE_APP_ENV === 'production' // 生产环境去除debugger
        }
      }
    }
  }
})

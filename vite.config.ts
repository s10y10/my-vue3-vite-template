import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'
import Commonjs from 'vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const env = loadEnv('', process.cwd())
  console.log('env:', env)
  return {
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    },
    plugins: [
      Commonjs(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            vue: ['withDefaults']
          }
        ],
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: true, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      vue(),
      legacy(),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: 'src/components.d.ts'
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      // 配置mock
      viteMockServe({
        mockPath: '/mock'
      })
    ],
    build: {
      target: 'es2015',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name].[hash].js',
          entryFileNames: 'static/js/[name].[hash].js',
          assetFileNames: 'static/[ext]/[name].[hash].[ext]',
          manualChunks: undefined
        }
      }
    },
    optimizeDeps: {
      include: ['element-plus/es/components/button/style/css']
    },
    server: {
      proxy: {
        '/proxy': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/proxy/, '')
          // configure: (proxy, options) => {
          //   const cookieList = []
          //   const cookie = loginConfig.cookie
          //   for (const key in cookie) {
          //     cookieList.push(`${key}=${cookie[key]}`)
          //   }
          //   options.headers = {
          //     Cookie: cookieList.join(';')
          //   }
          // }
        }
      }
    }
  }
})

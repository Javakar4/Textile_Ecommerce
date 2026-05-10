import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      port: 3000,
      hmr: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:4000',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@assets': path.resolve(__dirname,     './src/assets'),
        '@hooks': path.resolve(__dirname,      './src/hooks'),
        '@utils': path.resolve(__dirname,      './src/utils'),
        '@config': path.resolve(__dirname,     './src/config'),
        '@context': path.resolve(__dirname,    './src/context'),
        "@pages": path.resolve(__dirname,      './src/pages'),
        "@layouts": path.resolve(__dirname,    './src/layouts'),
      },
    },
  }
})

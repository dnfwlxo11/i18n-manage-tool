import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "." : "./",
  plugins: [vue()],
  resolve: {
    alias: {
      '@/': resolve(__dirname, './src'),
      './svgs/': resolve(__dirname, 'public/svgs')
    }
  }
})

import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "" : "./",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL(resolve(__dirname, './src'), import.meta.url)),
    }
  }
})

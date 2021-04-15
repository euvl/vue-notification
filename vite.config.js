import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  root: 'demo',
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname, './docs'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.runtime.esm-browser.js',
    }
  },
  base: './',
})

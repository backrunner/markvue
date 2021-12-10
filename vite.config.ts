import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    sourcemap: true,
    minify: 'terser',
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'markvue',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', 'marked', '@vue/compiler-sfc'],
    },
  },
});

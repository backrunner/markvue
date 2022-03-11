import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

const BuildConfig = {
  lib: {
    plugins: [vue(), dts()],
    build: {
      sourcemap: true,
      minify: 'terser' as 'terser',
      outDir: 'lib',
      lib: {
        entry: path.resolve(__dirname, './src/index.ts'),
        name: 'markvue',
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        external: ['vue', 'marked', '@vue/compiler-sfc'],
        output: {
          globals: {
            vue: 'Vue',
            marked: 'Marked',
            '@vue/compiler-sfc': 'compilerSfc',
          },
        },
      },
    },
  },
  demo: {
    plugins: [vue()],
    build: {
      sourcemap: true,
      minify: 'terser' as 'terser',
      outDir: 'dist',
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(process.env.BUILD_TARGET === 'demo' ? BuildConfig.demo : BuildConfig.lib);

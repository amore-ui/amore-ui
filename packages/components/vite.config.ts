import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'path';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat all tags with a-prefix as custom elements
          isCustomElement: (tag) => tag.startsWith('a-'),
        },
      },
    }),
    Components({
      // Automatically register components with pattern matching
      // This will transform kebab-case tags to PascalCase components
      resolvers: [
        // custom resolver for our component library
        (name) => {
          // Convert a-button -> AButton, a-input -> AInput, etc.
          if (name.startsWith('A') && /[A-Z]/.test(name.charAt(1))) {
            const componentName = name;
            // const _ = name
            //     .replace(/([A-Z])/g, '-$1')
            //     .toLowerCase()
            //     .substring(1); // Remove first dash
            return { name: componentName, from: 'amore-ui' };
          }
        },
      ],
      // Support for custom component naming convention
      directoryAsNamespace: false,
      dts: true,
    }),
    dts({
      // 生成 .d.ts 类型声明文件
      insertTypesEntry: true,
      copyDtsFiles: false, // 如果你有多层目录结构，可能需要设为 true
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'AmoreUI', // UMD 构建的全局变量名
      fileName: (format) => `amore-ui.${format}.js`,
      formats: ['es', 'umd', 'cjs'], // 构建的格式
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  // @ts-ignore
  test: {
    // Vitest 配置
    globals: true,
    environment: 'happy-dom', // 或 'jsdom'
    // setupFiles: ['./vitest.setup.ts'], // 可选的 setup 文件
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

import { defineConfig } from 'vitepress';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // 这是 .vitepress 目录

// 假设你的组件库包名是 @my-org/components
// 并且你想在文档中直接导入它
// 你需要在 VitePress 的 Vite 配置中设置别名

export default defineConfig({
  title: 'My Vue Component Library', // 站点标题
  description: 'Awesome Vue components built with love.',
  base: '/vue-comp-lib/', // 如果部署到 GitHub Pages 的子路径

  themeConfig: {
    logo: '/logo.svg', // (可选) 放置在 docs/public/logo.svg
    nav: [ // 顶部导航
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' },
      { text: 'GitHub', link: 'https://github.com/your-repo' },
    ],
    sidebar: { // 侧边栏
      '/guide/': [
        {
          text: '入门',
          items: [
            { text: '简介', link: '/guide/introduction' },
            { text: '快速上手', link: '/guide/getting-started' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Input 输入框', link: '/components/input' },
            // ... 其他组件
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Your Name',
    },
  },

  // Markdown 配置
  markdown: {
    // theme: 'material-palenight', // (可选) 代码高亮主题
    lineNumbers: true, // (可选) 显示代码块行号
  },

  // Vite 特定配置 (重要！用于解析你的组件库)
  vite: {
    resolve: {
      alias: {
        // 让文档中的 import MyButton from '@my-org/components' 能工作
        '@grtsinry43/vue-components': path.resolve(__dirname, '../../../packages/components/src/index.ts'),
        // 如果组件库内部也用了 '@/' 指向 src，并且文档中的示例也想用
        // '@': path.resolve(__dirname, '../../../packages/components/src'), // 这个可能导致冲突，慎用
        // 更好地是让组件库自己处理内部的 '@/'，文档只通过包名导入
      },
    },
    // 如果你的组件库依赖 CSS 预处理器，可能需要在这里配置
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       // additionalData: `@import "your-global-styles.scss";`
    //     }
    //   }
    // }
  },
});
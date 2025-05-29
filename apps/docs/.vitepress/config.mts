import { defineConfig } from 'vitepress';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Components from 'unplugin-vue-components/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // 这是 .vitepress 目录

// 假设你的组件库包名是 amore-ui
// 并且你想在文档中直接导入它
// 你需要在 VitePress 的 Vite 配置中设置别名

export default defineConfig({
  title: 'My Vue Component Library', // 站点标题
  description: 'Awesome Vue components built with love.',
  base: '/amore-ui/', // 如果部署到 GitHub Pages 的子路径

  themeConfig: {
    logo: '/logo.svg', // (可选) 放置在 docs/public/logo.svg
    nav: [ // 顶部导航
      { text: '指南', link: '/guide/getting-started' },
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
        // 让文档中的 import MyButton from 'amore-ui' 能工作
        'amore-ui': path.resolve(__dirname, '../../../packages/components/src'),
      },
    },
    plugins: [
      // 使用 unplugin-vue-components 进行自动组件导入
      Components({
        // 自动导入组件
        dirs: [],
        // 自定义组件解析器
        resolvers: [
          // 自定义解析 a- 前缀的组件
          (name) => {
            // 如果组件名是以 A 开头的，如 AButton
            if (name.startsWith('A') && /[A-Z]/.test(name.charAt(1))) {
              return { name, from: 'amore-ui' };
            }

            // 如果是 kebab-case 形式的组件名 (a-button, a-input)
            const kebabMatch = name.match(/^a-(.+)$/);
            if (kebabMatch) {
              // 转换 a-button 到 AButton
              const componentName = 'A' + kebabMatch[1].charAt(0).toUpperCase() + kebabMatch[1].slice(1);
              return { name: componentName, from: 'amore-ui' };
            }
          }
        ],
        // 在这里添加自定义组件
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: path.resolve(__dirname, './components.d.ts'),
      }),
    ],
  },
});


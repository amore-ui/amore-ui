import path from 'path';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
console.log('require:', !!require);

// 获取当前 main.ts 文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // 这是 .storybook 目录

const config = {
  // 故事文件的路径现在是相对于 apps/storybook 目录的
  // 我们要指向 packages/components/src
  stories: [
    '../../../packages/components/src/**/*.mdx',
    '../../../packages/components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  // Vite 配置调整，路径也需要相应调整
  async viteFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    // 路径别名 '@' 指向 packages/components/src
    // path.resolve(__dirname, '../../../packages/components/src')
    // __dirname 是 apps/storybook/.storybook
    // ../ -> apps/storybook/
    // ../../ -> apps/
    // ../../../ -> my-vue-component-library/ (项目根目录)
    config.resolve.alias['@'] = path.resolve(__dirname, '../../../packages/components/src');

    // 让 stories 文件可以直接通过包名导入组件
    const componentsPackageName = '@grtsinry43/vue-components'; // 你的组件库包名
    config.resolve.alias[componentsPackageName] = path.resolve(
      __dirname,
      '../../../packages/components/src/index.ts'
    );

    return mergeConfig(config, {
      plugins: [
        // 引入并使用插件
        import('@vitejs/plugin-vue').then((m) => m.default()),
      ],
    });

    // 如果组件库依赖其他本地 monorepo 包 (比如 utils)，也需要在这里添加别名
    // const utilsPackageName = '@my-org/utils';
    // config.resolve.alias[utilsPackageName] = path.resolve(__dirname, '../../../packages/utils/src/index.ts');
  },
};
export default config;

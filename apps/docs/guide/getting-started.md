# 快速上手

本指南将帮助您快速上手使用 Amore UI 组件库。

## 安装

使用包管理器安装组件库：

```bash
# 使用 npm
npm install amore-ui

# 使用 pnpm
pnpm add amore-ui

# 使用 yarn
yarn add amore-ui
```

## 使用方式

### 方式一：按需引入（推荐）

结合 `unplugin-vue-components` 插件，可以实现组件的自动导入，无需手动 import。只需在模板中使用 `<a-button>`、`<a-input>` 等标签，即可自动导入对应组件。

#### Vite 项目中的配置

```js
// vite.config.js 或 vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AmoreUIResolver } from 'amore-ui';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AmoreUIResolver()],
    }),
  ],
});
```

#### Vue CLI 项目中的配置

```js
// vue.config.js
const { defineConfig } = require('@vue/cli-service');
const Components = require('unplugin-vue-components/webpack');
const { AmoreUIResolver } = require('amore-ui');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [AmoreUIResolver()],
      }),
    ],
  },
});
```

#### Nuxt 项目中的配置

```js
// nuxt.config.js 或 nuxt.config.ts
export default defineNuxtConfig({
  modules: ['unplugin-vue-components/nuxt'],
  components: {
    resolvers: [
      // 导入解析器
      require('amore-ui').AmoreUIResolver(),
    ],
  },
});
```

#### VitePress 文档中的配置

```js
// .vitepress/config.js 或 .vitepress/config.ts
import { defineConfig } from 'vitepress';
import Components from 'unplugin-vue-components/vite';
import { AmoreUIResolver } from 'amore-ui';

export default defineConfig({
  // ...其他配置
  vite: {
    plugins: [
      Components({
        resolvers: [AmoreUIResolver()],
      }),
    ],
  },
});
```

配置完成后，您就可以直接在模板中使用组件，无需手动导入：

```vue
<template>
  <a-button type="primary" @click="handleClick">点击我</a-button>
  <a-input v-model="inputValue" placeholder="请输入内容" />
  <a-toggle v-model="toggleValue" />
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');
const toggleValue = ref(false);

function handleClick() {
  console.log('按钮被点击了');
}
</script>
```

### 方式二：全局注册

如果您希望全局注册所有组件，可以这样做：

```js
// main.js 或 main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { componentsPlugin } from 'amore-ui';

const app = createApp(App);
app.use(componentsPlugin);
app.mount('#app');
```

### 方式三：手动按需导入

您也可以手动导入所需的组件：

```vue
<template>
  <AButton type="primary">按钮</AButton>
</template>

<script setup>
import { AButton } from 'amore-ui';
</script>
```

## TypeScript 支持

Amore UI 提供了完整的 TypeScript 类型定义，可以享受到完整的类型检查和代码提示功能。

## Tailwind CSS 集成

`amore-ui` 组件库在内部使用了 Tailwind CSS 来定义其样式和设计规范（例如颜色、间距、字体等）。如果您的项目也使用 Tailwind CSS，您需要进行一些配置，以确保 `amore-ui` 组件能够正确显示，并且您可以利用 `amore-ui` 的设计规范。

### 为什么要进行配置？

1.  **加载组件样式**：`amore-ui` 会提供一个包含所有组件基础样式的 CSS 文件。您需要将其导入到项目中，这样组件才能正确渲染。
2.  **Tailwind CSS 构建过程**：
    - **内容扫描 (Content Scanning)**：Tailwind CSS 通过扫描您的项目文件来确定哪些原子类被使用了，从而生成最小化的 CSS。您需要告知 Tailwind 去扫描 `amore-ui` 的组件文件，这样如果您在 `amore-ui` 组件上直接使用 Tailwind 的原子类 (例如 `<a-button class="mt-4">`)，或者 `amore-ui` 组件内部模板使用了未通过 `@apply` 编译的 Tailwind 类，这些类也能被正确处理。
    - **主题继承 (Theme Inheritance)**：如果您希望在您自己的项目代码中使用 `amore-ui` 定义的 Tailwind 主题（例如 `primary` 色板中的 `text-primary-600` 或 `bg-primary-500`，或者特定的间距、圆角大小等），您需要将 `amore-ui` 的主题配置合并到您自己项目的 Tailwind 配置中。

### 配置步骤

#### 1. 导入 `amore-ui` 的 CSS 样式

您需要在您的项目入口文件（例如 `main.js` 或 `main.ts`）中导入 `amore-ui` 提供的 CSS 文件。这通常是组件库打包后输出的样式文件。

```javascript
// 在你的项目入口文件 (例如 main.js, main.ts, 或全局 CSS 文件)
import 'amore-ui/dist/style.css';
// 注意：'amore-ui/dist/style.css' 是一个示例路径。
// 实际路径取决于 amore-ui npm 包的构建输出结构。
// 通常，组件库会将其主 CSS 文件放在包的 'dist' 目录下。
```

#### 2. 配置您项目的 `tailwind.config.js`

打开您项目根目录下的 `tailwind.config.js` (如果不存在，请先创建它)。

- **`content` 数组**：
  修改 `content` 数组，确保 Tailwind CSS 会扫描 `amore-ui` 组件的源文件。这使得 Tailwind 能够识别并生成组件中使用的以及您在组件上应用的 Tailwind 类。

  ```javascript
  // tailwind.config.js

  module.exports = {
    content: [
      './index.html', // 或您的 HTML 入口文件
      './src/**/*.{vue,js,ts,jsx,tsx}', // 您自己项目的源文件
      // 重要: 添加 amore-ui 组件的路径
      // 这通常指向 node_modules 中 amore-ui 包内组件的源文件
      './node_modules/amore-ui/src/**/*.{vue,js,ts,jsx,tsx}',
      // 如果 amore-ui 发布的是包含模板字符串中类的编译后 .js 文件，路径可能如下：
      // "./node_modules/amore-ui/dist/**/*.{js,vue,ts}",
    ],
    // ... 其他配置将在下面解释
  };
  ```

- **`theme` 配置 (可选但强烈推荐)**：
  为了能够在您的项目中使用 `amore-ui` 的设计规范（如 `primary` 颜色、预设的 `spacing` 值等），您需要将 `amore-ui` 的主题配置扩展到您自己的项目中。
  `amore-ui` 应该会导出其 Tailwind 配置对象（如 `packages/components/tailwind.config.ts` 所示）。您可以在您的项目配置中引入并合并它。

  ```javascript
  // tailwind.config.js

  // 尝试导入 amore-ui 的 Tailwind 配置。
  // 理想情况下，amore-ui 会在其 package.json 的 exports 字段中指定如何访问此文件，
  // 或者发布一个编译后的 .js 版本。
  // 这里的路径 'amore-ui/tailwind.config' 是一个占位符，
  // 您可能需要根据 amore-ui 包的实际结构进行调整。
  // 如果 amore-ui 发布的是 .ts 文件，您的项目构建系统需要能处理它，
  // 或者 amore-ui 提供一个 .js 版本的配置文件。
  let amoreUiTailwindConfig = {};
  try {
    // 假设 amore-ui 将其 tailwind.config.ts 编译为 tailwind.config.js 并发布
    amoreUiTailwindConfig = require('amore-ui/tailwind.config.js');
  } catch (e) {
    console.warn(
      "Could not load amore-ui tailwind config. Ensure 'amore-ui/tailwind.config.js' is accessible."
    );
  }

  module.exports = {
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
      './node_modules/amore-ui/src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    darkMode: amoreUiTailwindConfig.darkMode || 'class', // 继承 darkMode 设置，或默认为 'class'
    theme: {
      // 您可以完全覆盖 amore-ui 的主题，但不推荐
      // theme: amoreUiTailwindConfig.theme,

      // 推荐使用 extend 来扩展或覆盖 amore-ui 的主题
      extend: {
        colors: {
          ...(amoreUiTailwindConfig.theme && amoreUiTailwindConfig.theme.colors),
          // 在这里添加或覆盖您项目特定的颜色
          // myCustomColor: '#RRGGBB',
        },
        fontFamily: {
          ...(amoreUiTailwindConfig.theme && amoreUiTailwindConfig.theme.fontFamily),
        },
        spacing: {
          ...(amoreUiTailwindConfig.theme && amoreUiTailwindConfig.theme.spacing),
        },
        borderRadius: {
          ...(amoreUiTailwindConfig.theme && amoreUiTailwindConfig.theme.borderRadius),
        },
        boxShadow: {
          ...(amoreUiTailwindConfig.theme && amoreUiTailwindConfig.theme.boxShadow),
        },
        zIndex: {
          ...(amoreUiTailwindConfig.theme && amoreUiTailwindConfig.theme.zIndex),
        },
        // ... 根据需要合并 amore-ui 主题的其他部分
        // 例如，如果 amore-ui 有自定义的 transitionDuration, transitionTimingFunction 等
        ...(amoreUiTailwindConfig.theme && amoreUiTailwindConfig.theme.extend
          ? amoreUiTailwindConfig.theme.extend
          : {}),
      },
    },
    plugins: [
      // 如果 amore-ui 依赖或提供了任何 Tailwind 插件，您可能也需要在这里添加它们
      ...(amoreUiTailwindConfig.plugins || []),
    ],
  };
  ```

  **关于主题合并的说明：**

  - 上面的示例使用了 `extend` 来合并主题。这意味着您可以保留您项目中已有的自定义主题，并添加或覆盖来自 `amore-ui` 的特定部分。
  - 直接使用 `theme: amoreUiTailwindConfig.theme` 会完全替换掉您项目中的 `theme` 配置，这可能不是您想要的。
  - 请确保 `require('amore-ui/tailwind.config.js')` 的路径正确，并且 `amore-ui` 包确实以可导入的方式提供了其 Tailwind 配置。

完成这些步骤后，您应该能够在您的项目中无缝使用 `amore-ui` 组件，并利用其设计规范和 Tailwind CSS 的强大功能。

## 浏览器兼容性

Amore UI 支持现代浏览器和 IE11+。

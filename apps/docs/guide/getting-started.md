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

## 浏览器兼容性

Amore UI 支持现代浏览器和 IE11+。

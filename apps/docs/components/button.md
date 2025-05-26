# Button 按钮

这是一个按钮组件。

## 基本用法

<script setup>
import {ref} from 'vue';
const count = ref(0)
</script>

<a-button> 默认按钮 </a-button>
<a-button type="primary"> 主要按钮 </a-button>
<a-button type="danger" disabled> 危险按钮 (禁用)</a-button>
<a-button @click="count++"> 点击计数: {{count}}</a-button>

## Props

| Prop       | Type                                 | Default     | Description  |
| ---------- | ------------------------------------ | ----------- | ------------ |
| `type`     | `'default' \| 'primary' \| 'danger'` | `'default'` | 按钮类型     |
| `disabled` | `boolean`                            | `false`     | 是否禁用     |
| `onClick`  | `(event: MouseEvent) => void`        | -           | 点击事件回调 |

<!-- 你也可以使用 VitePress 的特殊容器来创建示例 -->

::: tip
这是一个提示信息。
:::

::: details 点击查看代码

```vue
<template>
  <a-button @click="handleClick"> 点我 </a-button>
</template>

<script setup>
const handleClick = () => {
  console.log('Button clicked!');
};
</script>
```

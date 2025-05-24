# Button 按钮

这是一个按钮组件。

## 基本用法

<script setup>
import {MyButton} from '@grtsinry43/vue-components'
import {ref} from 'vue'
const count = ref(0)
</script>

<MyButton> 默认按钮 </MyButton>
<MyButton type="primary"> 主要按钮 </MyButton>
<MyButton type="danger" disabled> 危险按钮 (禁用)</MyButton>
<MyButton @click="count++"> 点击计数: {{count}}</MyButton>

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
  <MyButton @click="handleClick"> 点我 </MyButton>
</template>

<script setup>
import { MyButton } from '@grtsinry43/vue-components';
const handleClick = () => {
  console.log('Button clicked!');
};
</script>
```

import type { ComponentResolver } from 'unplugin-vue-components/types';

/**
 * AmoreUI 组件解析器
 * 用于自动导入 a- 前缀的组件
 */
export function AmoreUIResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      // 如果组件名以 A 开头且第二个字母大写 (AButton, AInput)
      if (name.match(/^A[A-Z]/)) {
        return {
          name: name, // AButton
          from: 'amore-ui',
        };
      }

      // 处理 kebab-case 的情况 (如 a-button, a-input)
      if (name.match(/^a-[a-z]/)) {
        // 将 a-button 转换为 AButton
        const componentName = name
          .replace(/^a-/, 'A')
          .replace(/-([a-z])/g, (_, c) => c.toUpperCase());

        return {
          name: componentName,
          from: 'amore-ui',
        };
      }
    },
  };
}

// 导出默认解析器
export default AmoreUIResolver;

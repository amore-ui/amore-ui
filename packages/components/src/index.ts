// 例如：导出 Button 组件
export { default as MyButton } from './components/Button/Button.vue';
// 如果 Button.vue 有自己的 index.ts (推荐)
// export * from './components/Button';

// 如果你有全局样式，可以在这里导入，并在 vite.config.ts 中配置提取
// import './styles/main.scss';

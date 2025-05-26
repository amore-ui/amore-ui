// Export renamed components
export { default as AButton } from './components/Button/Button.vue';
export { default as AInput } from './components/Input/Input.vue';
export { default as AToggle } from './components/Toggle/Toggle.vue';

// 导出组件解析器，用于自动导入
export { default as AmoreUIResolver } from './resolver';

// If you have global styles, you can import them here
// import './styles/main.scss';

// Vue plugin for auto-installation
import type { App, Plugin } from 'vue';
import AButton from './components/Button/Button.vue';
import AInput from './components/Input/Input.vue';
import AToggle from './components/Toggle/Toggle.vue';

export interface ComponentsPluginOptions {
  // You can add options here if needed
}

const componentsPlugin: Plugin = {
  install(app: App) {
    // Register components globally
    app.component('AButton', AButton);
    app.component('AInput', AInput);
    app.component('AToggle', AToggle);
  },
};

export { componentsPlugin };
export default componentsPlugin;

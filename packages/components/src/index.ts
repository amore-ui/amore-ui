// Export components
export { default as AButton } from './components/Button/Button.vue';
export { default as AInput } from './components/Input/Input.vue';
export { default as AToggle } from './components/Toggle/Toggle.vue';
export { default as ATabs } from './components/Tabs/Tabs.vue';
export { default as AProgress } from './components/Progress/Progress.vue';
export { default as ACard } from './components/Card/Card.vue';
export { default as AAlert } from './components/Alert/Alert.vue';

// Export theme utilities if they exist
import { setTheme, initTheme } from './style/theme';
export { setTheme, initTheme };

// Export tokens from tokens.js
export * from './style/tokens';

// Import global styles
import './style/index.css';

// 导出组件解析器，用于自动导入
export { default as AmoreUIResolver } from './resolver';

// Vue plugin for auto-installation
import type { App, Plugin } from 'vue';
import AButton from './components/Button/Button.vue';
import AInput from './components/Input/Input.vue';
import AToggle from './components/Toggle/Toggle.vue';
import ATabs from './components/Tabs/Tabs.vue';
import AProgress from './components/Progress/Progress.vue';
import ACard from './components/Card/Card.vue';
import AAlert from './components/Alert/Alert.vue';

export interface ComponentsPluginOptions {
  // You can add options here if needed
}

const componentsPlugin: Plugin = {
  install(app: App) {
    // Register components globally
    app.component('AButton', AButton);
    app.component('AInput', AInput);
    app.component('AToggle', AToggle);
    app.component('ATabs', ATabs);
    app.component('AProgress', AProgress);
    app.component('ACard', ACard);
    app.component('AAlert', AAlert);

    // Initialize theme based on user preference if in browser environment
    if (typeof window !== 'undefined') {
      initTheme();
    }
  },
};

export { componentsPlugin };
export default componentsPlugin;

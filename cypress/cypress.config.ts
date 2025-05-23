import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:6006', // Storybook 的地址
    specPattern: 'e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
  },
  component: {
    // 如果你也想用 Cypress 进行组件测试 (不同于 Vitest 的单元/集成测试)
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    specPattern: 'packages/components/src/**/*.cy.{js,jsx,ts,tsx}', // 指向组件的测试文件
  },
});

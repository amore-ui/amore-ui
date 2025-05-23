// eslint.config.js
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginCypress from 'eslint-plugin-cypress';
import path from 'node:path'; // 用于路径解析
import { fileURLToPath } from 'node:url'; // 用于获取 __dirname in ESM

// 获取当前文件 (eslint.config.js) 所在的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // 这个 __dirname 应该是项目根目录

export default [
  // 1. 全局忽略
  {
    ignores: [
      'node_modules/',
      'dist/',
      'packages/**/dist/',
      'apps/**/dist/',
      'storybook-static/',
      'coverage/',
      '*.log',
      'pnpm-lock.yaml', // 通常应该提交，但如果特定策略不提交则忽略
      '.husky/', // Husky 内部脚本
      '.github/', // GitHub Actions workflows
      'tsconfig.eslint.json', // ESLint 用的 tsconfig，不需要被 ESLint lint 自身
      // 其他需要忽略的...
    ],
  },

  // 2. JavaScript (全局，作为基础)
  pluginJs.configs.recommended,

  // 3. TypeScript (全局，应用于 .ts, .tsx, .vue 文件中的 <script lang="ts">)
  //    并使用 tsconfig.eslint.json 进行类型感知 linting
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'], // 应用于所有可能包含 TypeScript 的文件
    languageOptions: {
      parser: tseslint.parser, // 主 TypeScript 解析器
      parserOptions: {
        project: [path.resolve(__dirname, './tsconfig.eslint.json')], // <--- 核心！指向 ESLint 专用的 TSConfig
        tsconfigRootDir: __dirname, // project 中的路径是相对于这里的
        // sourceType: 'module', // 已经在下面的全局 languageOptions 中设置
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin, // 注册 @typescript-eslint 插件
    },
    // 获取 typescript-eslint 的推荐规则
    // 使用 recommendedTypeChecked 优先，如果不存在则回退到 recommended
    rules: {
      ...(tseslint.configs.recommendedTypeChecked?.rules ?? tseslint.configs.recommended.rules),
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      // 你可以根据需要添加或覆盖其他 TypeScript 规则
    },
  },

  // 4. Vue.js 配置
  // 展开 eslint-plugin-vue 的推荐配置 (Flat Config 格式)
  // 确保 pluginVue.configs['flat/recommended'] 是正确的，并且返回一个数组
  ...(pluginVue.configs['flat/recommended'] ?? []), // 使用 ?? [] 避免 undefined 导致错误
  {
    // 针对 .vue 文件的特定配置
    files: ['**/*.vue'],
    languageOptions: {
      parser: pluginVue.parser, // vue-eslint-parser (用于 .vue 文件)
      parserOptions: {
        parser: tseslint.parser, // vue-eslint-parser 内部使用 tseslint.parser 解析 <script>
        // project 和 tsconfigRootDir 会从上面的全局 TypeScript 配置继承
        // 如果没有继承，或者想覆盖，则需要再次指定：
        // project: [path.resolve(__dirname, './tsconfig.eslint.json')],
        // tsconfigRootDir: __dirname,
        extraFileExtensions: ['.vue'], // 告诉 tseslint.parser 也处理 .vue 文件中的 <script>
      },
      globals: {
        // <script setup> 宏
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },
    },
    // plugins: { 'vue': pluginVue }, // 通常 pluginVue.configs['flat/recommended'] 已经处理了插件的加载
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'warn', // Vue 特定的未使用变量 (用于模板)
      // 其他 Vue 规则...
    },
  },

  // 5. Cypress 配置
  {
    files: ['cypress/**/*.cy.{js,jsx,ts,tsx}'], // 应用于 Cypress 测试文件
    plugins: {
      cypress: pluginCypress, // 注册 Cypress 插件
    },
    languageOptions: {
      globals: {
        ...globals.browser, // Cypress 在浏览器中运行
        // Cypress 相关的全局变量 (cy, Cypress) 通常由 pluginCypress.environments.globals 提供
        ...(pluginCypress.environments?.globals?.globals ?? {}),
        // 或者手动添加，如果上面不起作用：
        // cy: 'readonly',
        // Cypress: 'readonly',
      },
    },
    rules: {
      // 从 pluginCypress.configs.recommended 中提取规则或手动添加
      // 确保这些规则与你的 eslint-plugin-cypress 版本兼容
      'cypress/no-assigning-return-values': 'error',
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      // 根据需要添加更多 Cypress 推荐规则
    },
  },

  // 6. 全局语言选项 (适用于所有未被特定配置块覆盖的文件)
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // 项目默认使用 ES Modules
      globals: {
        ...globals.browser,
        ...globals.node,
        // 其他全局变量...
      },
    },
    rules: {
      // 全局应用的一些基本规则
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },

  // 7. 测试文件通用覆盖规则 (例如 Vitest 测试)
  {
    files: [
      'packages/**/*.test.ts', // Vitest 测试文件
      'packages/**/*.spec.ts', // Vitest 测试文件
      // 注意：Cypress 文件已在上面单独处理，但如果这里有通用规则也适用，可以保留
      // 'cypress/**/*.cy.ts'
    ],
    languageOptions: {
      globals: {
        // Vitest 全局变量 (如果 Vitest 配置了 globals: true)
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        // test: 'readonly', // 如果使用 test 而不是 it
      },
    },
    rules: {
      // '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 已在全局 TS 配置中
      '@typescript-eslint/no-explicit-any': 'off', // 测试中可能更常用 any
      '@typescript-eslint/no-empty-function': 'off', // 测试中空函数常见
    },
  },

  // 8. Prettier 配置 (必须放在最后，以覆盖 ESLint 的格式化规则)
  eslintConfigPrettier,
];

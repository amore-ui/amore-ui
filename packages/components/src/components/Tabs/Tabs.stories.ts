import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Tabs from './Tabs.vue';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: '当前选中的标签ID',
    },
    tabs: {
      control: 'object',
      description: '标签项配置数组',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用整个标签组件',
    },
    'onUpdate:modelValue': {
      description: '标签切换时触发的事件',
      action: 'update:modelValue',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Tab组件用于在不同内容区域之间进行切换，提供了简洁直观的导航方式。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => ({
    components: { Tabs },
    setup() {
      const selectedTab = ref(args.modelValue);
      return { args, selectedTab };
    },
    template: `
      <div style="width: 100%; max-width: 600px; border: 1px solid #eee; border-radius: 8px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <Tabs 
          v-model="selectedTab"
          :tabs="args.tabs"
          :disabled="args.disabled"
        >
          <div v-if="selectedTab === 'tab1'" style="min-height: 150px;">
            <h3 style="margin-top: 0; font-size: 18px;">标签1内容</h3>
            <p>这是标签1的内容区域，可以放置任何内容。点击上方的标签可以切换不同的内容区域。</p>
            <p>当前选中的标签是: <strong>标签1</strong></p>
          </div>
          <div v-if="selectedTab === 'tab2'" style="min-height: 150px;">
            <h3 style="margin-top: 0; font-size: 18px;">标签2内容</h3>
            <p>这是标签2的内容区域，可以放置任何内容。</p>
            <div style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 4px;">
              <p style="margin: 0;">这是一个信息框，可以突出显示重要内容。</p>
            </div>
          </div>
          <div v-if="selectedTab === 'tab3'" style="min-height: 150px;">
            <h3 style="margin-top: 0; font-size: 18px;">标签3内容</h3>
            <p>这是标签3的内容区域，可以放置任何内容。</p>
            <ul>
              <li>列表项 1</li>
              <li>列表项 2</li>
              <li>列表项 3</li>
            </ul>
          </div>
        </Tabs>
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    tabs: [
      { id: 'tab1', label: '标签1' },
      { id: 'tab2', label: '标签2' },
      { id: 'tab3', label: '标签3' },
    ],
    disabled: false,
  },
};

export const WithDisabledTab: Story = {
  render: (args) => ({
    components: { Tabs },
    setup() {
      const selectedTab = ref(args.modelValue);
      return { args, selectedTab };
    },
    template: `
      <div style="width: 100%; max-width: 600px; border: 1px solid #eee; border-radius: 8px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <Tabs 
          v-model="selectedTab"
          :tabs="args.tabs"
          :disabled="args.disabled"
        >
          <div v-if="selectedTab === 'tab1'" style="min-height: 150px;">
            <h3 style="margin-top: 0; font-size: 18px;">标签1内容</h3>
            <p>这是标签1的内容区域。请注意，<strong>标签2</strong>已被禁用，无法点击。</p>
          </div>
          <div v-if="selectedTab === 'tab2'" style="min-height: 150px;">
            <h3 style="margin-top: 0; font-size: 18px;">标签2内容</h3>
            <p>这是标签2的内容区域，由于被禁用，通常情况下无法访问此内容。</p>
          </div>
          <div v-if="selectedTab === 'tab3'" style="min-height: 150px;">
            <h3 style="margin-top: 0; font-size: 18px;">标签3内容</h3>
            <p>这是标签3的内容区域。</p>
          </div>
        </Tabs>
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    tabs: [
      { id: 'tab1', label: '标签1' },
      { id: 'tab2', label: '标签2', disabled: true },
      { id: 'tab3', label: '标签3' },
    ],
    disabled: false,
  },
};

export const DisabledTabs: Story = {
  render: (args) => ({
    components: { Tabs },
    setup() {
      const selectedTab = ref(args.modelValue);
      return { args, selectedTab };
    },
    template: `
      <div style="width: 100%; max-width: 600px; border: 1px solid #eee; border-radius: 8px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <div style="margin-bottom: 16px; padding: 8px 12px; background-color: #fff8e6; border-radius: 4px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; font-size: 14px;">整个Tab组件已被禁用，无法切换标签。</p>
        </div>
        <Tabs 
          v-model="selectedTab"
          :tabs="args.tabs"
          :disabled="args.disabled"
        >
          <div v-if="selectedTab === 'tab1'" style="min-height: 150px;">
            <h3 style="margin-top: 0; font-size: 18px;">标签1内容</h3>
            <p>这是标签1的内容区域。由于整个组件被禁用，所有标签都无法点击。</p>
          </div>
          <div v-if="selectedTab === 'tab2'" style="min-height: 150px;">
            <h3 style="margin-top: 0; font-size: 18px;">标签2内容</h3>
            <p>这是标签2的内容区域。</p>
          </div>
          <div v-if="selectedTab === 'tab3'" style="min-height: 150px;">
            <h3 style="margin-top: 0; font-size: 18px;">标签3内容</h3>
            <p>这是标签3的内容区域。</p>
          </div>
        </Tabs>
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    tabs: [
      { id: 'tab1', label: '标签1' },
      { id: 'tab2', label: '标签2' },
      { id: 'tab3', label: '标签3' },
    ],
    disabled: true,
  },
};

export const ManyTabs: Story = {
  render: (args) => ({
    components: { Tabs },
    setup() {
      const selectedTab = ref(args.modelValue);
      return { args, selectedTab };
    },
    template: `
      <div style="width: 100%; max-width: 600px; border: 1px solid #eee; border-radius: 8px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <Tabs 
          v-model="selectedTab"
          :tabs="args.tabs"
          :disabled="args.disabled"
        >
          <div style="min-height: 150px;">
            <h3 style="margin-top: 0; font-size: 18px;">选中的标签: {{ selectedTab }}</h3>
            <p>当标签较多时会出现横向滚动条，可以滑动查看更多标签。</p>
            <p>这种设计适合在空间有限但标签较多的场景下使用。</p>
          </div>
        </Tabs>
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    tabs: [
      { id: 'tab1', label: '首页' },
      { id: 'tab2', label: '产品介绍' },
      { id: 'tab3', label: '技术规格' },
      { id: 'tab4', label: '用户评价' },
      { id: 'tab5', label: '相关推荐' },
      { id: 'tab6', label: '售后服务' },
      { id: 'tab7', label: '常见问题' },
      { id: 'tab8', label: '联系我们' },
    ],
    disabled: false,
  },
};

export const Interactive: Story = {
  render: () => ({
    components: { Tabs },
    setup() {
      const selectedTab = ref('home');
      const tabContents = {
        home: {
          title: '首页',
          content: '欢迎使用我们的产品。这是首页内容区域，通常包含产品概述和主要特点。',
        },
        features: {
          title: '功能特性',
          content: '我们的产品提供多种强大功能，包括：易用的界面、强大的性能和可靠的安全性。',
        },
        pricing: {
          title: '价格方案',
          content: '我们提供多种价格方案以满足不同需求：基础版、专业版和企业版。',
        },
        support: {
          title: '技术支持',
          content: '如果您遇到任何问题，请随时联系我们的技术支持团队，我们将竭诚为您服务。',
        },
      };

      return {
        selectedTab,
        tabContents,
        tabs: [
          { id: 'home', label: '首页' },
          { id: 'features', label: '功能特性' },
          { id: 'pricing', label: '价格方案' },
          { id: 'support', label: '技术支持' },
        ],
      };
    },
    template: `
      <div style="width: 100%; max-width: 600px; border: 1px solid #eee; border-radius: 8px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <Tabs 
          v-model="selectedTab"
          :tabs="tabs"
        >
          <div style="min-height: 200px; padding: 16px; background: #f8f9fa; border-radius: 4px;">
            <h3 style="margin-top: 0; font-size: 20px; color: #1a56db;">{{ tabContents[selectedTab].title }}</h3>
            <p>{{ tabContents[selectedTab].content }}</p>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #6b7280;">当前选中的标签: <strong>{{ selectedTab }}</strong></p>
            </div>
          </div>
        </Tabs>
      </div>
    `,
  }),
};

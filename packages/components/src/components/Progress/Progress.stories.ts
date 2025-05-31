import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Progress from './Progress.vue';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '进度值',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: '最大值',
    },
    showPercentage: {
      control: 'boolean',
      description: '是否显示百分比',
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
      description: '进度条大小',
    },
    variant: {
      control: { type: 'select', options: ['primary', 'secondary'] },
      description: '进度条风格',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '进度条组件，用于显示操作进度或加载状态',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (_args) => ({
    components: { Progress },
    setup() {
      return { args: _args };
    },
    template: `
      <div style="width: 100%; max-width: 400px;">
        <Progress :value="args.value" :max="args.max" :showPercentage="args.showPercentage" :size="args.size" :variant="args.variant" />
      </div>
    `,
  }),
  args: {
    value: 50,
    max: 100,
    showPercentage: false,
    size: 'medium',
    variant: 'primary',
  },
};

export const WithPercentage: Story = {
  render: (_args) => ({
    components: { Progress },
    setup() {
      return { args: _args };
    },
    template: `
      <div style="width: 100%; max-width: 400px;">
        <Progress :value="args.value" :max="args.max" :showPercentage="args.showPercentage" :size="args.size" :variant="args.variant" />
      </div>
    `,
  }),
  args: {
    value: 75,
    max: 100,
    showPercentage: true,
    size: 'medium',
    variant: 'primary',
  },
};

export const CustomMax: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      // 处理 max 可能为 undefined 的情况
      const max = args.max ?? 100;
      const value = args.value ?? 0;
      // 百分比，保留 2 位小数
      const percent = max > 0 ? ((value / max) * 100).toFixed(2) : '0';
      return { args, max, value, percent };
    },
    template: `
      <div style="width: 100%; max-width: 400px;">
        <p style="margin-bottom: 8px; font-size: 14px;">值：{{ value }} / 最大值：{{ max }} = {{ percent }}%</p>
        <Progress :value="value" :max="max" :showPercentage="args.showPercentage" :size="args.size" :variant="args.variant" />
      </div>
    `,
  }),
  args: {
    value: 50,
    max: 200,
    showPercentage: true,
    size: 'medium',
    variant: 'primary',
  },
};

export const Sizes: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div style="width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 24px;">
        <div>
          <p style="margin-bottom: 8px; font-size: 14px;">Small</p>
          <Progress :value="75" size="small" showPercentage />
        </div>
        <div>
          <p style="margin-bottom: 8px; font-size: 14px;">Medium (默认)</p>
          <Progress :value="75" size="medium" showPercentage />
        </div>
        <div>
          <p style="margin-bottom: 8px; font-size: 14px;">Large</p>
          <Progress :value="75" size="large" showPercentage />
        </div>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div style="width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 24px;">
        <div>
          <p style="margin-bottom: 8px; font-size: 14px;">Primary (默认)</p>
          <Progress :value="75" variant="primary" showPercentage />
        </div>
        <div>
          <p style="margin-bottom: 8px; font-size: 14px;">Secondary</p>
          <Progress :value="75" variant="secondary" showPercentage />
        </div>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  render: () => ({
    components: { Progress },
    setup() {
      const progress = ref(30);

      const increaseProgress = () => {
        progress.value = Math.min(100, progress.value + 10);
      };

      const decreaseProgress = () => {
        progress.value = Math.max(0, progress.value - 10);
      };

      const resetProgress = () => {
        progress.value = 0;
      };

      return { progress, increaseProgress, decreaseProgress, resetProgress };
    },
    template: `
      <div style="width: 100%; max-width: 400px;">
        <Progress :value="progress" showPercentage />
        <div style="margin-top: 16px; display: flex; gap: 8px;">
          <button 
            style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;"
            @click="increaseProgress"
          >
            增加 10%
          </button>
          <button 
            style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;"
            @click="decreaseProgress"
          >
            减少 10%
          </button>
          <button 
            style="padding: 8px 16px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;"
            @click="resetProgress"
          >
            重置
          </button>
        </div>
      </div>
    `,
  }),
};

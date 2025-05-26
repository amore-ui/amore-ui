import type { Meta, StoryObj } from '@storybook/vue3';
import { AInput } from 'amore-ui';

const meta: Meta<typeof AInput> = {
  title: 'Components/AInput',
  component: AInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    modelValue: '',
    placeholder: '请输入内容',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { AInput },
    setup() {
      return { args };
    },
    template: '<AInput v-bind="args" />',
  }),
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: '自定义占位符',
  },
  render: (args) => ({
    components: { AInput },
    setup() {
      return { args };
    },
    template: '<AInput v-bind="args" />',
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: '不可编辑',
  },
  render: (args) => ({
    components: { AInput },
    setup() {
      return { args };
    },
    template: '<AInput v-bind="args" />',
  }),
};

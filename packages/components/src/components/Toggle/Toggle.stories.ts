import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { AToggle } from 'amore-ui';

const meta: Meta<typeof AToggle> = {
  title: 'Components/AToggle',
  component: AToggle,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    modelValue: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { AToggle },
    setup() {
      const value = ref(args.modelValue ?? false);
      return { args, value };
    },
    template: '<AToggle v-bind="args" v-model="value" />',
  }),
};

export const On: Story = {
  args: {
    modelValue: true,
  },
  render: (args) => ({
    components: { AToggle },
    setup() {
      const value = ref(args.modelValue ?? false);
      return { args, value };
    },
    template: '<AToggle v-bind="args" v-model="value" />',
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { AToggle },
    setup() {
      const value = ref(args.modelValue ?? false);
      return { args, value };
    },
    template: '<AToggle v-bind="args" v-model="value" />',
  }),
};

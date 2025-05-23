import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Toggle from './Toggle.vue';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
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
    components: { Toggle },
    setup() {
      const value = ref(args.modelValue ?? false);
      return { args, value };
    },
    template: '<Toggle v-bind="args" v-model="value" />',
  }),
};

export const On: Story = {
  args: {
    modelValue: true,
  },
  render: (args) => ({
    components: { Toggle },
    setup() {
      const value = ref(args.modelValue ?? false);
      return { args, value };
    },
    template: '<Toggle v-bind="args" v-model="value" />',
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { Toggle },
    setup() {
      const value = ref(args.modelValue ?? false);
      return { args, value };
    },
    template: '<Toggle v-bind="args" v-model="value" />',
  }),
};

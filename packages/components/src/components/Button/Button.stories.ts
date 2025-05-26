import type { Meta, StoryObj } from '@storybook/vue3';
import { AButton } from 'amore-ui'; // Updated component name

const meta: Meta<typeof AButton> = {
  title: 'Components/AButton', // Updated Storybook path
  component: AButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
  },
  args: {
    default: 'Click Me',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    default: 'Primary Button',
  },
  render: (args) => ({
    components: { AButton },
    setup() {
      return { args };
    },
    template: '<AButton v-bind="args">{{ args.default }}</AButton>',
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    default: 'Secondary Button',
  },
  render: (args) => ({
    components: { AButton },
    setup() {
      return { args };
    },
    template: '<AButton v-bind="args">{{ args.default }}</AButton>',
  }),
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    default: 'Danger Button',
  },
  render: (args) => ({
    components: { AButton },
    setup() {
      return { args };
    },
    template: '<AButton v-bind="args">{{ args.default }}</AButton>',
  }),
};

export const Text: Story = {
  args: {
    variant: 'text',
    default: 'Text Button',
  },
  render: (args) => ({
    components: { AButton },
    setup() {
      return { args };
    },
    template: '<AButton v-bind="args">{{ args.default }}</AButton>',
  }),
};

export const SubmitButton: Story = {
  args: {
    type: 'submit',
    default: 'Submit Form',
  },
  render: (args) => ({
    components: { AButton },
    setup() {
      return { args };
    },
    template: '<AButton v-bind="args">{{ args.default }}</AButton>',
  }),
};

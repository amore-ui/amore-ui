import type { Meta, StoryObj } from '@storybook/vue3';
import AAlert from './Alert.vue';

const meta: Meta<typeof AAlert> = {
  title: 'Components/Alert',
  component: AAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
    title: {
      control: 'text',
    },
    closable: {
      control: 'boolean',
    },
    icon: {
      control: 'boolean',
    },
    default: {
      control: 'text',
      description: 'The alert message content.',
    },
  },
  args: {
    title: 'This is a title',
    default: 'This is the alert message.',
  },
};

export default meta;
type Story = StoryObj<typeof AAlert>;

export const Info: Story = {
  args: {
    type: 'info',
  },
  render: (args) => ({
    components: { AAlert },
    setup() {
      return { args };
    },
    template: '<AAlert v-bind="args">{{ args.default }}</AAlert>',
  }),
};

export const Success: Story = {
  args: {
    ...Info.args,
    type: 'success',
  },
  render: Info.render,
};

export const Warning: Story = {
  args: {
    ...Info.args,
    type: 'warning',
  },
  render: Info.render,
};

export const Danger: Story = {
  args: {
    ...Info.args,
    type: 'danger',
  },
  render: Info.render,
};

export const Closable: Story = {
  args: {
    ...Info.args,
    closable: true,
  },
  render: Info.render,
};

export const NoIcon: Story = {
  args: {
    ...Info.args,
    icon: false,
  },
  render: Info.render,
};

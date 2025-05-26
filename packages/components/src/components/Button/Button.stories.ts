import type { Meta, StoryObj } from '@storybook/vue3';
import { MyButton } from 'amore-ui'; // 如果配置了 alias

const meta: Meta<typeof MyButton> = {
  title: 'Components/MyButton', // Storybook 中的路径
  component: MyButton,
  tags: ['autodocs'], // 开启自动文档
  argTypes: {
    // onClick: { action: 'clicked' }, // 如果需要手动配置事件监听
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
  },
  args: {
    // 默认 props
    default: 'Click Me', // slot 内容
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // Props for this story
  },
  render: (args) => ({
    components: { MyButton },
    setup() {
      return { args };
    },
    template: '<MyButton v-bind="args">{{ args.default }}</MyButton>',
  }),
};

export const SubmitButton: Story = {
  args: {
    type: 'submit',
    default: 'Submit Form',
  },
  render: (args) => ({
    components: { MyButton },
    setup() {
      return { args };
    },
    template: '<MyButton v-bind="args">{{ args.default }}</MyButton>',
  }),
};

import type { Meta, StoryObj } from '@storybook/vue3';
import ACard from './Card.vue';
import AButton from '../Button/Button.vue';

const meta: Meta<typeof ACard> = {
  title: 'Components/ACard',
  component: ACard,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Basic Card',
    subtitle: 'This is a subtitle for the basic card.',
  },
  render: (args) => ({
    components: { ACard },
    setup() {
      return { args };
    },
    template: `
      <ACard v-bind="args">
        This is the default slot content for the card.
      </ACard>
    `,
  }),
};

export const WithHeaderSlot: Story = {
  render: (args) => ({
    components: { ACard },
    setup() {
      return { args };
    },
    template: `
      <ACard v-bind="args">
        <template #header>
          <h2>Custom Header</h2>
        </template>
        This card uses a custom header via a slot.
      </ACard>
    `,
  }),
};

export const WithFooterSlot: Story = {
  args: {
    title: 'Card with Footer',
  },
  render: (args) => ({
    components: { ACard, AButton },
    setup() {
      return { args };
    },
    template: `
      <ACard v-bind="args">
        <p>This card has a footer with actions.</p>
        <template #footer>
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <AButton variant="text">Cancel</AButton>
            <AButton variant="primary">Confirm</AButton>
          </div>
        </template>
      </ACard>
    `,
  }),
};

export const FullFeatured: Story = {
  render: (args) => ({
    components: { ACard, AButton },
    setup() {
      return { args };
    },
    template: `
      <ACard v-bind="args">
        <template #header>
          <h3>This is a custom header</h3>
          <p style="font-size: 14px; color: #666; margin: 4px 0 0;">With a custom sub-line</p>
        </template>
        <p>
          This card demonstrates the use of all slots and props.
          It has a custom header and a footer with buttons.
        </p>
        <template #footer>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Footer Information</span>
            <AButton variant="primary">Go somewhere</AButton>
          </div>
        </template>
      </ACard>
    `,
  }),
};

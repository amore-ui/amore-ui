import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ACard from './Card.vue';

describe('ACard.vue', () => {
  it('renders default slot content', () => {
    const wrapper = mount(ACard, {
      slots: {
        default: 'This is the card content.',
      },
    });
    expect(wrapper.text()).toContain('This is the card content.');
  });

  it('renders title and subtitle props', () => {
    const title = 'Test Title';
    const subtitle = 'Test Subtitle';
    const wrapper = mount(ACard, {
      props: {
        title,
        subtitle,
      },
    });
    expect(wrapper.find('.a-card-title').text()).toBe(title);
    expect(wrapper.find('.a-card-subtitle').text()).toBe(subtitle);
  });

  it('renders header slot content', () => {
    const wrapper = mount(ACard, {
      slots: {
        header: '<div class="custom-header">Custom Header</div>',
      },
    });
    expect(wrapper.find('.custom-header').exists()).toBe(true);
    expect(wrapper.find('.custom-header').text()).toBe('Custom Header');
  });

  it('renders footer slot content', () => {
    const wrapper = mount(ACard, {
      slots: {
        footer: '<div class="custom-footer">Custom Footer</div>',
      },
    });
    expect(wrapper.find('.custom-footer').exists()).toBe(true);
    expect(wrapper.find('.custom-footer').text()).toBe('Custom Footer');
  });

  it('does not render header if title and header slot are not provided', () => {
    const wrapper = mount(ACard);
    expect(wrapper.find('.a-card-header').exists()).toBe(false);
  });

  it('does not render footer if footer slot is not provided', () => {
    const wrapper = mount(ACard);
    expect(wrapper.find('.a-card-footer').exists()).toBe(false);
  });
});

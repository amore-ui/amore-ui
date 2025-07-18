import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AAlert from './Alert.vue';

describe('AAlert', () => {
  it('renders the default slot content', () => {
    const wrapper = mount(AAlert, {
      slots: {
        default: 'This is a test alert.',
      },
    });
    expect(wrapper.text()).toContain('This is a test alert.');
  });

  it('renders the title prop', () => {
    const wrapper = mount(AAlert, {
      props: {
        title: 'Test Title',
      },
    });
    expect(wrapper.text()).toContain('Test Title');
  });

  it('applies the correct type class', () => {
    const wrapper = mount(AAlert, {
      props: {
        type: 'success',
      },
    });
    expect(wrapper.find('.a-alert').classes()).toContain('a-alert--success');
  });

  it('does not render the close button by default', () => {
    const wrapper = mount(AAlert);
    expect(wrapper.find('.a-alert__close-btn').exists()).toBe(false);
  });

  it('renders the close button when closable is true', () => {
    const wrapper = mount(AAlert, {
      props: {
        closable: true,
      },
    });
    expect(wrapper.find('.a-alert__close-btn').exists()).toBe(true);
  });

  it('hides the alert when the close button is clicked', async () => {
    const wrapper = mount(AAlert, {
      props: {
        closable: true,
      },
    });
    await wrapper.find('.a-alert__close-btn').trigger('click');
    expect(wrapper.find('.a-alert').exists()).toBe(false);
  });

  it('shows the icon by default', () => {
    const wrapper = mount(AAlert);
    expect(wrapper.find('.a-alert__icon').exists()).toBe(true);
  });

  it('hides the icon when icon is false', () => {
    const wrapper = mount(AAlert, {
      props: {
        icon: false,
      },
    });
    expect(wrapper.find('.a-alert__icon').exists()).toBe(false);
  });
});

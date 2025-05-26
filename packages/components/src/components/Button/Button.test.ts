import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MyButton from './Button.vue';

describe('AButton.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(MyButton, {
      slots: {
        default: 'Test Button',
      },
    });
    expect(wrapper.text()).toContain('Test Button');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(MyButton);
    // const emitSpy = vi.spyOn(wrapper.emitted(), 'click'); // 不推荐这种方式了
    // 更好的方式是直接检查 wrapper.emitted()
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
    expect(wrapper.emitted().click).toHaveLength(1);
  });

  it('has correct type attribute', () => {
    const wrapper = mount(MyButton, {
      props: {
        type: 'submit',
      },
    });
    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('applies correct class for each variant', () => {
    const variants = ['primary', 'secondary', 'danger', 'text'] as const;
    variants.forEach((variant) => {
      const wrapper = mount(MyButton, {
        props: { variant },
      });
      expect(wrapper.classes()).toContain(`a-button--${variant}`);
    });
  });
});

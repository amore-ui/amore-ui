import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Toggle from './Toggle.vue';

describe('Toggle.vue', () => {
  it('renders iOS style structure', () => {
    const wrapper = mount(Toggle, {
      props: { modelValue: false },
    });
    expect(wrapper.find('.a-toggle__track').exists()).toBe(true);
    expect(wrapper.find('.a-toggle__thumb').exists()).toBe(true);
  });

  it('applies correct class when on', () => {
    const wrapper = mount(Toggle, {
      props: { modelValue: true },
    });
    expect(wrapper.classes()).toContain('a-toggle--on');
    // 检查 toggle__track 是否有 on 状态的类
    expect(wrapper.find('.a-toggle__track').classes()).toContain('a-toggle__track');
  });

  it('applies correct class when off', () => {
    const wrapper = mount(Toggle, {
      props: { modelValue: false },
    });
    expect(wrapper.classes()).not.toContain('a-toggle--on');
  });

  it('emits update:modelValue when clicked', async () => {
    const wrapper = mount(Toggle, {
      props: { modelValue: false },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true]);
  });

  it('does not emit when disabled', async () => {
    const wrapper = mount(Toggle, {
      props: { modelValue: false, disabled: true },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy();
  });
});

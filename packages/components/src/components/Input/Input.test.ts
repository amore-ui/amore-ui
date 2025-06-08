import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from './Input.vue';

describe('Input.vue', () => {
  it('renders with placeholder', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', placeholder: '测试占位符' },
    });
    expect(wrapper.attributes('placeholder')).toBe('测试占位符');
  });

  it('renders with modelValue', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '初始值' },
    });
    expect((wrapper.element as HTMLInputElement).value).toBe('初始值');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: '' },
    });
    await wrapper.setValue('新值');
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['新值']);
  });

  it('can be disabled', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', disabled: true },
    });
    expect(wrapper.attributes('disabled')).toBeDefined();
  });
});

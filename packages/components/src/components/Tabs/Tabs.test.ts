import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tabs from './Tabs.vue';

describe('Tabs.vue', () => {
  const defaultTabs = [
    { id: 'tab1', label: '标签1' },
    { id: 'tab2', label: '标签2' },
    { id: 'tab3', label: '标签3' },
  ];

  it('renders tabs correctly', () => {
    const wrapper = mount(Tabs, {
      props: {
        modelValue: 'tab1',
        tabs: defaultTabs,
      },
    });

    const tabButtons = wrapper.findAll('.a-tabs__tab');
    expect(tabButtons.length).toBe(3);
    expect(tabButtons[0].text()).toContain('标签1');
    expect(tabButtons[1].text()).toContain('标签2');
    expect(tabButtons[2].text()).toContain('标签3');
  });

  it('applies active class to selected tab', () => {
    const wrapper = mount(Tabs, {
      props: {
        modelValue: 'tab2',
        tabs: defaultTabs,
      },
    });

    const tabButtons = wrapper.findAll('.a-tabs__tab');
    expect(tabButtons[1].classes()).toContain('a-tabs__tab--active');
    expect(tabButtons[0].classes()).not.toContain('a-tabs__tab--active');
  });

  it('emits update:modelValue when tab is clicked', async () => {
    const wrapper = mount(Tabs, {
      props: {
        modelValue: 'tab1',
        tabs: defaultTabs,
      },
    });

    const tabButtons = wrapper.findAll('.a-tabs__tab');
    await tabButtons[2].trigger('click');

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['tab3']);
  });

  it('does not emit when disabled tab is clicked', async () => {
    const disabledTabs = [
      { id: 'tab1', label: '标签1' },
      { id: 'tab2', label: '标签2', disabled: true },
      { id: 'tab3', label: '标签3' },
    ];

    const wrapper = mount(Tabs, {
      props: {
        modelValue: 'tab1',
        tabs: disabledTabs,
      },
    });

    const tabButtons = wrapper.findAll('.a-tabs__tab');
    await tabButtons[1].trigger('click');

    expect(wrapper.emitted()['update:modelValue']).toBeFalsy();
  });

  it('does not emit when component is disabled', async () => {
    const wrapper = mount(Tabs, {
      props: {
        modelValue: 'tab1',
        tabs: defaultTabs,
        disabled: true,
      },
    });

    const tabButtons = wrapper.findAll('.a-tabs__tab');
    await tabButtons[2].trigger('click');

    expect(wrapper.emitted()['update:modelValue']).toBeFalsy();
  });

  it('applies disabled class when tab is disabled', () => {
    const disabledTabs = [
      { id: 'tab1', label: '标签1' },
      { id: 'tab2', label: '标签2', disabled: true },
      { id: 'tab3', label: '标签3' },
    ];

    const wrapper = mount(Tabs, {
      props: {
        modelValue: 'tab1',
        tabs: disabledTabs,
      },
    });

    const tabButtons = wrapper.findAll('.a-tabs__tab');
    expect(tabButtons[1].classes()).toContain('a-tabs__tab--disabled');
  });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Progress from './Progress.vue';

describe('Progress.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Progress, {
      props: { value: 50 },
    });

    expect(wrapper.find('.a-progress__bar').exists()).toBe(true);
    expect(wrapper.find('.a-progress__container').exists()).toBe(true);
    expect(wrapper.find('.a-progress__percentage').exists()).toBe(false);
  });

  it('sets the correct width for the progress bar', () => {
    const wrapper = mount(Progress, {
      props: { value: 75 },
    });

    expect(wrapper.find('.a-progress__bar').attributes('style')).toContain('width: 75%');
  });

  it('caps the progress at 100%', () => {
    const wrapper = mount(Progress, {
      props: { value: 150 },
    });

    expect(wrapper.find('.a-progress__bar').attributes('style')).toContain('width: 100%');
  });

  it('has a minimum of 0%', () => {
    const wrapper = mount(Progress, {
      props: { value: -50 },
    });

    expect(wrapper.find('.a-progress__bar').attributes('style')).toContain('width: 0%');
  });

  it('displays percentage when showPercentage is true', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 75,
        showPercentage: true,
      },
    });

    expect(wrapper.find('.a-progress__percentage').exists()).toBe(true);
    expect(wrapper.find('.a-progress__percentage').text()).toBe('75%');
  });

  it('calculates percentage based on max value', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 50,
        max: 200,
        showPercentage: true,
      },
    });

    expect(wrapper.find('.a-progress__percentage').text()).toBe('25%');
    expect(wrapper.find('.a-progress__bar').attributes('style')).toContain('width: 25%');
  });

  it('applies correct size class', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 50,
        size: 'large',
      },
    });

    expect(wrapper.classes()).toContain('a-progress--large');
  });

  it('applies correct variant class', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 50,
        variant: 'secondary',
      },
    });

    expect(wrapper.classes()).toContain('a-progress--secondary');
  });

  it('sets the correct ARIA attributes', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 75,
        max: 200,
      },
    });

    const progressbar = wrapper.find('.a-progress__bar');
    expect(progressbar.attributes('role')).toBe('progressbar');
    expect(progressbar.attributes('aria-valuenow')).toBe('75');
    expect(progressbar.attributes('aria-valuemin')).toBe('0');
    expect(progressbar.attributes('aria-valuemax')).toBe('200');
  });
});

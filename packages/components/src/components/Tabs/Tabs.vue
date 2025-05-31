<template>
  <div class="a-tabs" :class="{ 'a-tabs--disabled': disabled }">
    <div class="a-tabs__list" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="a-tabs__tab"
        :class="{
          'a-tabs__tab--active': tab.id === modelValue,
          'a-tabs__tab--disabled': tab.disabled || disabled,
        }"
        role="tab"
        :aria-selected="tab.id === modelValue"
        :tabindex="tab.id === modelValue ? 0 : -1"
        :disabled="tab.disabled || disabled"
        @click="selectTab(tab.id)"
      >
        {{ tab.label }}
        <div v-if="tab.id === modelValue" class="a-tabs__tab-indicator"></div>
      </button>
    </div>
    <div class="a-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TabsProps } from '../../types';
import { lightTheme, darkTheme } from '../../style/theme';
import { spacing, transitions, borderRadius, typography } from '../../style/tokens';

const props = defineProps<TabsProps>();
const emit = defineEmits(['update:modelValue']);

function selectTab(id: string | number) {
  if (!props.disabled) {
    const tab = props.tabs.find((tab) => tab.id === id);
    if (tab && !tab.disabled) {
      emit('update:modelValue', id);
    }
  }
}
</script>

<style scoped lang="scss">
.a-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;

  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &__list {
    display: flex;
    border-bottom: 1px solid v-bind('lightTheme.border.primary');
    position: relative;
    overflow-x: auto;
    scrollbar-width: thin;

    // Custom scrollbar styling
    &::-webkit-scrollbar {
      height: v-bind('spacing[1]');
    }

    &::-webkit-scrollbar-track {
      background: v-bind('lightTheme.background.secondary');
      border-radius: v-bind('borderRadius.full');
    }

    &::-webkit-scrollbar-thumb {
      background: v-bind('lightTheme.border.secondary');
      border-radius: v-bind('borderRadius.full');

      &:hover {
        background: v-bind('lightTheme.border.primary');
      }
    }
  }

  &__tab {
    position: relative;
    padding: v-bind('`${spacing[3]} ${spacing[4]}`');
    background: transparent;
    border: none;
    color: v-bind('lightTheme.text.secondary');
    font-size: v-bind('typography.fontSize.base');
    font-weight: v-bind('typography.fontWeight.medium');
    cursor: pointer;
    transition: all v-bind('transitions.duration[200]') v-bind('transitions.timing["in-out"]');
    white-space: nowrap;
    min-width: max-content;
    margin-right: v-bind('spacing[2]');
    border-radius: v-bind('`${borderRadius.md} ${borderRadius.md} 0 0`');

    &:hover {
      color: v-bind('lightTheme.text.primary');
      background-color: v-bind('lightTheme.background.hover');
    }

    &--active {
      color: v-bind('lightTheme.action.primary.default');
      font-weight: v-bind('typography.fontWeight.semibold');
    }

    &--disabled {
      color: v-bind('lightTheme.text.tertiary');
      cursor: not-allowed;

      &:hover {
        color: v-bind('lightTheme.text.tertiary');
        background-color: transparent;
      }
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px v-bind('lightTheme.border.focus + "33"');
    }
  }

  &__tab-indicator {
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: v-bind('lightTheme.action.primary.default');
    transition: all v-bind('transitions.duration[300]') v-bind('transitions.timing["in-out"]');
    border-radius: v-bind('borderRadius.full');
  }

  &__content {
    padding: v-bind('spacing[4]') 0;
  }
}

:deep(.dark) {
  .a-tabs {
    &__list {
      border-bottom-color: v-bind('darkTheme.border.primary');

      &::-webkit-scrollbar-track {
        background: v-bind('darkTheme.background.secondary');
      }

      &::-webkit-scrollbar-thumb {
        background: v-bind('darkTheme.border.secondary');

        &:hover {
          background: v-bind('darkTheme.border.primary');
        }
      }
    }

    &__tab {
      color: v-bind('darkTheme.text.secondary');

      &:hover {
        color: v-bind('darkTheme.text.primary');
        background-color: v-bind('darkTheme.background.hover');
      }

      &--active {
        color: v-bind('darkTheme.action.primary.default');
      }

      &--disabled {
        color: v-bind('darkTheme.text.tertiary');

        &:hover {
          color: v-bind('darkTheme.text.tertiary');
          background-color: transparent;
        }
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px v-bind('darkTheme.border.focus + "33"');
      }
    }

    &__tab-indicator {
      background-color: v-bind('darkTheme.action.primary.default');
    }
  }
}
</style>

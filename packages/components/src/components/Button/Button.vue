<template>
  <button
    class="a-button"
    :class="`a-button--${variant}`"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ButtonType, ButtonVariant } from '../../types';
import { borderRadius, spacing, transitions, typography } from '../../style/tokens';
import { lightTheme, darkTheme } from '../../style/theme';

// Define props with their types and default values
defineProps({
  type: {
    type: String as () => ButtonType,
    default: 'button',
  },
  variant: {
    type: String as () => ButtonVariant,
    default: 'primary',
  },
});

defineEmits(['click']);
</script>

<style lang="scss" scoped>
.a-button {
  padding: v-bind('`${spacing[2]} ${spacing[4]}`');
  border-radius: v-bind('borderRadius.md');
  border: none;
  cursor: pointer;
  transition:
    background-color v-bind('transitions.duration[300]') v-bind('transitions.timing["in-out"]'),
    color v-bind('transitions.duration[300]') v-bind('transitions.timing["in-out"]');
  font-size: v-bind('typography.fontSize.base');
  font-weight: v-bind('typography.fontWeight.medium');
  line-height: v-bind('typography.lineHeight.normal');
}

.a-button--primary {
  background-color: v-bind('lightTheme.action.primary.default');
  color: v-bind('lightTheme.text.inverted');
  &:hover {
    background-color: v-bind('lightTheme.action.primary.hover');
  }
  &:active {
    background-color: v-bind('lightTheme.action.primary.active');
  }
}

.a-button--secondary {
  background-color: v-bind('lightTheme.action.secondary.default');
  color: v-bind('lightTheme.text.inverted');
  &:hover {
    background-color: v-bind('lightTheme.action.secondary.hover');
  }
  &:active {
    background-color: v-bind('lightTheme.action.secondary.active');
  }
}

.a-button--danger {
  background-color: v-bind('lightTheme.action.danger.default');
  color: v-bind('lightTheme.text.inverted');
  &:hover {
    background-color: v-bind('lightTheme.action.danger.hover');
  }
  &:active {
    background-color: v-bind('lightTheme.action.danger.active');
  }
}

.a-button--success {
  background-color: v-bind('lightTheme.action.success.default');
  color: v-bind('lightTheme.text.inverted');
  &:hover {
    background-color: v-bind('lightTheme.action.success.hover');
  }
  &:active {
    background-color: v-bind('lightTheme.action.success.active');
  }
}

.a-button--warning {
  background-color: v-bind('lightTheme.action.warning.default');
  color: v-bind('lightTheme.text.inverted');
  &:hover {
    background-color: v-bind('lightTheme.action.warning.hover');
  }
  &:active {
    background-color: v-bind('lightTheme.action.warning.active');
  }
}

.a-button--text {
  background: none;
  color: v-bind('lightTheme.action.primary.default');
  &:hover {
    background: none;
    text-decoration: underline;
    color: v-bind('lightTheme.action.primary.hover');
  }
  &:active {
    color: v-bind('lightTheme.action.primary.active');
  }
}

:deep(.dark) {
  .a-button--primary {
    background-color: v-bind('darkTheme.action.primary.default');
    color: v-bind('darkTheme.text.inverted');
    &:hover {
      background-color: v-bind('darkTheme.action.primary.hover');
    }
    &:active {
      background-color: v-bind('darkTheme.action.primary.active');
    }
  }

  // Similar styles for other variants in dark mode...
}
</style>

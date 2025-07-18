<template>
  <div class="a-card">
    <div v-if="$slots.header || title" class="a-card-header">
      <slot name="header">
        <h3 v-if="title" class="a-card-title">{{ title }}</h3>
        <p v-if="subtitle" class="a-card-subtitle">{{ subtitle }}</p>
      </slot>
    </div>
    <div class="a-card-content">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="a-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { borderRadius, spacing, typography, transitions, boxShadow } from '../../style/tokens';
import { lightTheme, darkTheme } from '../../style/theme';

defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.a-card {
  background-color: v-bind('lightTheme.background.default');
  color: v-bind('lightTheme.text.default');
  border-radius: v-bind('borderRadius.lg');
  border: 1px solid v-bind('lightTheme.border.primary');
  overflow: hidden;
  box-shadow: v-bind('boxShadow.sm');
  transition:
    background-color v-bind('transitions.duration[300]') v-bind('transitions.timing["in-out"]'),
    border-color v-bind('transitions.duration[300]') v-bind('transitions.timing["in-out"]'),
    color v-bind('transitions.duration[300]') v-bind('transitions.timing["in-out"]'),
    box-shadow v-bind('transitions.duration[300]') v-bind('transitions.timing["in-out"]');

  &:hover {
    box-shadow: v-bind('boxShadow.md');
  }
}

.a-card-header {
  padding: v-bind('`${spacing[4]} ${spacing[6]}`');
  border-bottom: 1px solid v-bind('lightTheme.border.primary');
  transition: border-color v-bind('transitions.duration[300]')
    v-bind('transitions.timing["in-out"]');
}

.a-card-title {
  font-size: v-bind('typography.fontSize.xl');
  font-weight: v-bind('typography.fontWeight.semibold');
  margin: 0;
}

.a-card-subtitle {
  font-size: v-bind('typography.fontSize.sm');
  color: v-bind('lightTheme.text.muted');
  margin: v-bind('`${spacing[1]} 0 0`');
  transition: color v-bind('transitions.duration[300]') v-bind('transitions.timing["in-out"]');
}

.a-card-content {
  padding: v-bind('spacing[6]');
}

.a-card-footer {
  padding: v-bind('`${spacing[4]} ${spacing[6]}`');
  border-top: 1px solid v-bind('lightTheme.border.primary');
  background-color: v-bind('lightTheme.background.subtle');
  transition:
    background-color v-bind('transitions.duration[300]') v-bind('transitions.timing["in-out"]'),
    border-color v-bind('transitions.duration[300]') v-bind('transitions.timing["in-out"]');
}

:deep(.dark) {
  .a-card {
    background-color: v-bind('darkTheme.background.default');
    color: v-bind('darkTheme.text.default');
    border-color: v-bind('darkTheme.border.default');
  }

  .a-card-header {
    border-bottom-color: v-bind('darkTheme.border.default');
  }

  .a-card-subtitle {
    color: v-bind('darkTheme.text.muted');
  }

  .a-card-footer {
    border-top-color: v-bind('darkTheme.border.default');
    background-color: v-bind('darkTheme.background.subtle');
  }
}
</style>

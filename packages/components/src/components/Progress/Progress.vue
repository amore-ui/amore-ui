<template>
  <div
    class="a-progress"
    :class="[
      `a-progress--${size}`,
      `a-progress--${variant}`,
      { 'a-progress--with-percentage': showPercentage },
    ]"
  >
    <div class="a-progress__container">
      <div
        class="a-progress__bar"
        :style="{ width: `${progressPercentage}%` }"
        role="progressbar"
        :aria-valuenow="value"
        :aria-valuemin="0"
        :aria-valuemax="max"
      ></div>
    </div>
    <div v-if="showPercentage" class="a-progress__percentage">{{ progressPercentage }}%</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ProgressProps } from '../../types';
import { lightTheme, darkTheme } from '../../style/theme';
import { spacing, transitions, borderRadius, typography } from '../../style/tokens';

const props = withDefaults(defineProps<ProgressProps>(), {
  max: 100,
  showPercentage: false,
  size: 'medium',
  variant: 'primary',
});

const progressPercentage = computed(() => {
  const percentage = (props.value / props.max) * 100;
  return Math.min(Math.max(0, Math.round(percentage)), 100);
});
</script>

<style scoped lang="scss">
.a-progress {
  display: flex;
  align-items: center;
  width: 100%;

  &__container {
    flex-grow: 1;
    background-color: v-bind('lightTheme.background.secondary');
    border-radius: v-bind('borderRadius.full');
    overflow: hidden;
  }

  &__bar {
    height: 100%;
    border-radius: v-bind('borderRadius.full');
    transition: width v-bind('transitions.duration[300]') v-bind('transitions.timing["in-out"]');
  }

  &__percentage {
    margin-left: v-bind('spacing[3]');
    font-size: v-bind('typography.fontSize.sm');
    color: v-bind('lightTheme.text.secondary');
    min-width: 2.5rem;
    text-align: right;
  }

  // Size variants
  &--small {
    .a-progress__container {
      height: v-bind('spacing[1]');
    }
    .a-progress__percentage {
      font-size: v-bind('typography.fontSize.xs');
    }
  }

  &--medium {
    .a-progress__container {
      height: v-bind('spacing[1.5]');
    }
  }

  &--large {
    .a-progress__container {
      height: v-bind('spacing[2]');
    }
    .a-progress__percentage {
      font-size: v-bind('typography.fontSize.base');
    }
  }

  // Color variants
  &--primary {
    .a-progress__bar {
      background-color: v-bind('lightTheme.action.primary.default');
    }
  }

  &--secondary {
    .a-progress__bar {
      background-color: v-bind('lightTheme.action.secondary.default');
    }
  }
}

:deep(.dark) {
  .a-progress {
    &__container {
      background-color: v-bind('darkTheme.background.secondary');
    }

    &__percentage {
      color: v-bind('darkTheme.text.secondary');
    }

    &--primary {
      .a-progress__bar {
        background-color: v-bind('darkTheme.action.primary.default');
      }
    }

    &--secondary {
      .a-progress__bar {
        background-color: v-bind('darkTheme.action.secondary.default');
      }
    }
  }
}
</style>

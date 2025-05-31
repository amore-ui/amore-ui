<template>
  <button
    class="a-toggle"
    :class="{ 'a-toggle--on': modelValue, 'a-toggle--disabled': disabled }"
    :disabled="disabled"
    role="switch"
    :aria-checked="modelValue"
    @click="toggle"
  >
    <span class="a-toggle__track">
      <span class="a-toggle__thumb"></span>
    </span>
    <span v-if="$slots.default" class="a-toggle__label">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { spacing, transitions } from '../../style/tokens';
import { lightTheme, darkTheme } from '../../style/theme';
import { ToggleProps } from '../../types';

const props = withDefaults(defineProps<ToggleProps>(), {
  modelValue: false,
  disabled: false,
  label: '',
});

const emit = defineEmits(['update:modelValue']);

function toggle() {
  if (!props.disabled) emit('update:modelValue', !props.modelValue);
}
</script>

<style scoped lang="scss">
.a-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: v-bind('`calc(${spacing[10]} + ${spacing[2]})`'); // 48px
  height: v-bind('spacing[6]'); // 24px
  border: none;
  border-radius: v-bind('spacing[6]'); // Full rounded
  background: transparent;
  padding: 0;
  cursor: pointer;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__track {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: v-bind('lightTheme.border.primary');
    border-radius: v-bind('spacing[6]'); // Full rounded
    transition: background-color v-bind('transitions.duration[300]')
      v-bind('transitions.timing["in-out"]');
  }

  &--on &__track {
    background-color: v-bind('lightTheme.action.primary.default');
  }

  &__thumb {
    display: block;
    position: absolute;
    top: v-bind('spacing[0.5]'); // 2px
    left: v-bind('spacing[0.5]'); // 2px
    width: v-bind('`calc(${spacing[6]} - ${spacing[1]})`'); // 20px
    height: v-bind('`calc(${spacing[6]} - ${spacing[1]})`'); // 20px
    background-color: v-bind('lightTheme.background.primary');
    border-radius: v-bind('spacing[6]'); // Full rounded
    box-shadow: v-bind('lightTheme.elevation[1]');
    transition: transform v-bind('transitions.duration[300]') v-bind('transitions.timing["in-out"]');
  }

  &--on &__thumb {
    transform: v-bind('`translateX(${spacing[6]})`'); // 24px to the right
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px v-bind('lightTheme.border.focus + "33"');
  }

  &__label {
    margin-left: v-bind('spacing[3]');
    color: v-bind('lightTheme.text.primary');
  }

  &--disabled &__track {
    background-color: v-bind('lightTheme.background.tertiary');
  }

  &--disabled &__thumb {
    background-color: v-bind('lightTheme.background.secondary');
  }

  &--disabled &__label {
    color: v-bind('lightTheme.text.tertiary');
  }
}

:deep(.dark) {
  .a-toggle {
    &__track {
      background-color: v-bind('darkTheme.border.primary');
    }

    &__thumb {
      background-color: v-bind('darkTheme.background.primary');
    }

    &__label {
      color: v-bind('darkTheme.text.primary');
    }

    &--on &__track {
      background-color: v-bind('darkTheme.action.primary.default');
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px v-bind('darkTheme.border.focus + "33"');
    }

    &--disabled &__track {
      background-color: v-bind('darkTheme.background.tertiary');
    }

    &--disabled &__thumb {
      background-color: v-bind('darkTheme.background.secondary');
    }

    &--disabled &__label {
      color: v-bind('darkTheme.text.tertiary');
    }
  }
}
</style>

<template>
  <input
    class="a-input"
    :class="{ 'a-input--disabled': disabled }"
    v-bind="props"
    :value="modelValue"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { borderRadius, spacing, transitions, typography } from '../../style/tokens';
import { lightTheme, darkTheme } from '../../style/theme';
import { InputProps } from '../../types';

const props = defineProps<InputProps>();

const emit = defineEmits(['update:modelValue']);

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}
</script>

<style scoped lang="scss">
.a-input {
  padding: v-bind('`${spacing[1.5]} ${spacing[3]}`');
  border-radius: v-bind('borderRadius.md');
  border: 1px solid v-bind('lightTheme.border.primary');
  background-color: v-bind('lightTheme.background.primary');
  color: v-bind('lightTheme.text.primary');
  font-size: v-bind('typography.fontSize.base');
  line-height: v-bind('typography.lineHeight.normal');
  transition: border-color v-bind('transitions.duration[200]')
    v-bind('transitions.timing["in-out"]');
  outline: none;
  width: 100%;

  &::placeholder {
    color: v-bind('lightTheme.text.tertiary');
  }

  &:focus {
    border-color: v-bind('lightTheme.border.focus');
    box-shadow: 0 0 0 2px v-bind('lightTheme.border.focus + "33"');
  }

  &--disabled {
    background-color: v-bind('lightTheme.background.secondary');
    border-color: v-bind('lightTheme.border.secondary');
    color: v-bind('lightTheme.text.tertiary');
    cursor: not-allowed;
  }
}

:deep(.dark) {
  .a-input {
    border-color: v-bind('darkTheme.border.primary');
    background-color: v-bind('darkTheme.background.primary');
    color: v-bind('darkTheme.text.primary');

    &::placeholder {
      color: v-bind('darkTheme.text.tertiary');
    }

    &:focus {
      border-color: v-bind('darkTheme.border.focus');
      box-shadow: 0 0 0 2px v-bind('darkTheme.border.focus + "33"');
    }

    &--disabled {
      background-color: v-bind('darkTheme.background.secondary');
      border-color: v-bind('darkTheme.border.secondary');
      color: v-bind('darkTheme.text.tertiary');
    }
  }
}
</style>

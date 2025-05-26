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
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  modelValue: Boolean,
  disabled: Boolean,
});
const emit = defineEmits(['update:modelValue']);
function toggle() {
  if (!props.disabled) emit('update:modelValue', !props.modelValue);
}
</script>

<style scoped lang="scss">
.a-toggle {
  position: relative;
  width: 48px;
  height: 24px;
  border: none;
  border-radius: 24px;
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
    background: #e0e0e0;
    border-radius: 24px;
    transition: background-color 0.3s;
  }

  &--on &__track {
    background: #42b983;
  }

  &__thumb {
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
  }

  &--on &__thumb {
    transform: translateX(24px);
  }
}
</style>

<template>
  <button
    class="toggle"
    :class="{ 'toggle--on': modelValue, 'toggle--disabled': disabled }"
    :disabled="disabled"
    role="switch"
    :aria-checked="modelValue"
    @click="toggle"
  >
    <span class="toggle__track">
      <span class="toggle__thumb"></span>
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
.toggle {
  position: relative;
  width: 48px;
  height: 28px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  transition: opacity 0.2s;
  display: inline-flex;
  align-items: center;
  &.toggle--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.toggle__track {
  width: 100%;
  height: 100%;
  background: #e5e5ea;
  border-radius: 14px;
  position: relative;
  transition: background 0.2s;
  display: flex;
  align-items: center;
}
.toggle--on .toggle__track {
  background: #4cd964;
}
.toggle__thumb {
  position: absolute;
  left: 2px;
  top: 2px;
  width: 24px;
  height: 24px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: left 0.2s;
}
.toggle--on .toggle__thumb {
  left: 22px;
}
</style>

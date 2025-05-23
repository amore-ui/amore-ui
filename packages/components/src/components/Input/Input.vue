<template>
  <input class="my-input" v-bind="props" :value="modelValue" @input="onInput" />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  modelValue: String,
  placeholder: String,
  disabled: Boolean,
});
const emit = defineEmits(['update:modelValue']);
function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}
</script>

<style scoped lang="scss">
.my-input {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  &:focus {
    border-color: #42b983;
  }
}
</style>

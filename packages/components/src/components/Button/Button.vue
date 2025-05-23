<template>
  <button class="my-button" :type="type" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
});
defineEmits(['click']);
</script>

<style lang="scss" scoped>
.my-button {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3aa373;
  }
}
</style>

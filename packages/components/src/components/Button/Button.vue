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
const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
  variant: {
    type: String as () => 'primary' | 'secondary' | 'danger' | 'text',
    default: 'primary',
  },
});
defineEmits(['click']);
const variant = props.variant;
</script>

<style lang="scss" scoped>
.a-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  font-size: 1rem;
}

.a-button--primary {
  background-color: #42b983;
  color: white;
  &:hover {
    background-color: #3aa373;
  }
}

.a-button--secondary {
  background-color: #e0e0e0;
  color: #333;
  &:hover {
    background-color: #bdbdbd;
  }
}

.a-button--danger {
  background-color: #e53935;
  color: white;
  &:hover {
    background-color: #b71c1c;
  }
}

.a-button--text {
  background: none;
  color: #42b983;
  &:hover {
    background: none;
    text-decoration: underline;
    color: #3aa373;
  }
}
</style>

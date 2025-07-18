<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info', // info, success, warning, danger
  },
  title: {
    type: String,
    default: '',
  },
  closable: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Boolean,
    default: true,
  },
});

const visible = ref(true);

const classes = computed(() => ['a-alert', `a-alert--${props.type}`]);

function handleClose() {
  visible.value = false;
}
</script>

<template>
  <transition name="a-alert-fade">
    <div v-if="visible" :class="classes" role="alert">
      <div v-if="icon" class="a-alert__icon">
        <!-- You can replace these with actual SVG icons -->
        <span v-if="type === 'success'">✔</span>
        <span v-if="type === 'info'">ℹ️</span>
        <span v-if="type === 'warning'">⚠️</span>
        <span v-if="type === 'danger'">❌</span>
      </div>
      <div class="a-alert__content">
        <p v-if="title" class="a-alert__title">{{ title }}</p>
        <div class="a-alert__description">
          <slot></slot>
        </div>
      </div>
      <button v-if="closable" class="a-alert__close-btn" @click="handleClose">&times;</button>
    </div>
  </transition>
</template>

<style scoped>
.a-alert {
  display: flex;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid;
  margin-bottom: 1rem;
  background-color: var(--bg-color);
}

.a-alert--info {
  --bg-color: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.a-alert--success {
  --bg-color: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.a-alert--warning {
  --bg-color: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.a-alert--danger {
  --bg-color: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

html.dark .a-alert--info {
  color: #93c5fd;
}
html.dark .a-alert--success {
  color: #6ee7b7;
}
html.dark .a-alert--warning {
  color: #fcd34d;
}
html.dark .a-alert--danger {
  color: #fca5a5;
}

.a-alert__icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
}
.a-alert__content {
  flex-grow: 1;
}
.a-alert__title {
  font-weight: 600;
  margin: 0 0 0.25rem;
}
.a-alert__close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0 0 1rem;
  color: inherit;
}
.a-alert-fade-enter-active,
.a-alert-fade-leave-active {
  transition: opacity 0.3s ease;
}
.a-alert-fade-enter-from,
.a-alert-fade-leave-to {
  opacity: 0;
}
</style>

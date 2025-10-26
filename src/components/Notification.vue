<template>
  <transition name="slide-fade">
    <div v-if="visible" :class="['notify', type]">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '../stores/notificationStore.js'

const notificationStore = useNotificationStore()
const { message, type, visible } = storeToRefs(notificationStore)
</script>

<style scoped>
.notify {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  z-index: 9999;
  animation: pop 0.3s ease;
}

.notify.success { background-color: #22c55e; }
.notify.error { background-color: #ef4444; }
.notify.info { background-color: #3b82f6; }

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes pop {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>

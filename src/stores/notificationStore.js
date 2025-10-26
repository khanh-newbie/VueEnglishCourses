// src/stores/notificationStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const message = ref('')
  const type = ref('') // success | error | info
  const visible = ref(false)

  function show(text, msgType = 'info', duration = 2000) {
    message.value = text
    type.value = msgType
    visible.value = true

    setTimeout(() => {
      visible.value = false
      message.value = ''
    }, duration)
  }

  return { message, type, visible, show }
})

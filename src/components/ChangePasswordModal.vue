<template>
  <!-- 🌫 Modal đổi mật khẩu -->
  <div v-if="open" class="modal-backdrop">
    <div class="modal-box">
      <h4 class="fw-bold mb-3 text-center">Đổi mật khẩu</h4>

      <form @submit.prevent="handleChangePassword">
        <!-- Mật khẩu cũ -->
        <div class="mb-3">
          <label>Mật khẩu hiện tại</label>
          <input
            v-model="oldPassword"
            type="password"
            class="form-control"
            required
          />
          <small v-if="errors.oldPassword" class="text-danger">{{ errors.oldPassword }}</small>
        </div>

        <!-- Mật khẩu mới -->
        <div class="mb-3">
          <label>Mật khẩu mới</label>
          <input
            v-model="newPassword"
            type="password"
            class="form-control"
            required
          />
          <small v-if="errors.newPassword" class="text-danger">{{ errors.newPassword }}</small>
        </div>

        <!-- Xác nhận mật khẩu mới -->
        <div class="mb-3">
          <label>Xác nhận mật khẩu mới</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="form-control"
            required
          />
          <small v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</small>
        </div>

        <button class="btn btn-primary w-100">Cập nhật mật khẩu</button>
      </form>

      <button
        class="btn btn-sm btn-outline-secondary w-100 mt-3"
        @click="$emit('close')"
      >
        Đóng
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import { useNotificationStore } from '../stores/notificationStore.js'

defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const errors = ref({})

const userStore = useUserStore()
const notify = useNotificationStore()

// 🧠 Hàm kiểm tra form
const validateForm = () => {
  const e = {}

  if (!oldPassword.value.trim()) e.oldPassword = 'Vui lòng nhập mật khẩu hiện tại.'
  if (!newPassword.value.trim()) e.newPassword = 'Vui lòng nhập mật khẩu mới.'
  else if (newPassword.value.length < 6) e.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự.'
  if (confirmPassword.value !== newPassword.value)
    e.confirmPassword = 'Mật khẩu xác nhận không khớp.'

  errors.value = e
  return Object.keys(e).length === 0
}

// ⚙️ Hàm đổi mật khẩu
const handleChangePassword = () => {
  if (!validateForm()) return

  const ok = userStore.changePassword(oldPassword.value, newPassword.value)
  if (ok) {
    notify.show('🔒 Đổi mật khẩu thành công!', 'success')
    oldPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    errors.value = {}
    emit('close')
  } else {
    notify.show('❌ Mật khẩu hiện tại không đúng!', 'error')
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.modal-box {
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  width: 360px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>

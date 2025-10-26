<template>
  <!-- 🌙 Nền mờ bao phủ toàn màn hình khi modal mở -->
  <div v-if="open" class="modal-backdrop">
    <div class="modal-box">
      <!-- 🟦 Tiêu đề modal -->
      <h4 class="fw-bold mb-3 text-center">Đăng nhập</h4>

      <!-- 🟩 Form đăng nhập -->
      <form @submit.prevent="handleLogin">
        <!-- Nhập email -->
        <div class="mb-3">
          <label>Email</label>
          <input v-model="email" type="email" class="form-control" required />
          <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
        </div>

        <!-- Nhập mật khẩu -->
        <div class="mb-3">
          <label>Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" required />
           <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
        </div>

        <!-- Thông báo lỗi chung (sai email hoặc mật khẩu) -->
        <p v-if="errors.general" class="text-danger text-center">{{ errors.general }}</p>

        <!-- Nút đăng nhập -->
        <button class="btn btn-primary w-100">Đăng nhập</button>
      </form>

      <!-- 🟨 Chuyển sang đăng ký -->
      <p class="mt-3 text-center">
        Chưa có tài khoản?
        <a href="#" @click.prevent="$emit('open-signup')">Đăng ký ngay</a>
      </p>

      <!-- 🟥 Nút đóng modal -->
      <button
        class="btn btn-sm btn-outline-secondary w-100 mt-2"
        @click="$emit('close')"
      >
        Đóng
      </button>
    </div>
  </div>
</template>

<script setup>
/*
  🎯 Mục đích:
  Component này hiển thị modal đăng nhập người dùng.
  - Khi `open = true` → modal hiển thị.
  - Cho phép nhập email & password.
  - Gọi hàm `userStore.login()` để xác thực thông tin.
  - Nếu thành công → báo "Đăng nhập thành công!" và đóng modal.
  - Nếu thất bại → báo lỗi "Sai email hoặc mật khẩu".
*/

import { ref } from 'vue'
import { useUserStore } from '../stores/userStore.js'

import { useNotificationStore } from '../stores/notificationStore.js'

/* 🧩 Nhận props từ cha (App hoặc component quản lý modal):
   - open: Boolean → xác định có hiển thị modal không.
*/
defineProps({ open: Boolean })

/* 📡 Định nghĩa các sự kiện emit:
   - 'close' → đóng modal đăng nhập.
   - 'open-signup' → mở modal đăng ký.
*/
const emit = defineEmits(['close', 'open-signup'])

/* 📝 Biến lưu dữ liệu form */
const email = ref('')
const password = ref('')

const errors = ref({})
const notify = useNotificationStore()

/* 💾 Lấy store quản lý người dùng (đăng nhập / đăng ký / đăng xuất) */
const userStore = useUserStore()

/* ✅ Hàm kiểm tra hợp lệ trước khi gửi */
const validateForm = () => {
  const e = {}

  if (!email.value.trim()) {
    e.email = 'Vui lòng nhập email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    e.email = 'Email không hợp lệ.'
  }

  if (!password.value.trim()) {
    e.password = 'Vui lòng nhập mật khẩu.'
  }

  errors.value = e
  return Object.keys(e).length === 0
}

/*
  🚀 Hàm xử lý đăng nhập
  - Gọi hàm login(email, password) từ store.
  - Nếu thành công: hiển thị thông báo, xóa form, đóng modal.
  - Nếu thất bại: báo lỗi.
*/
const handleLogin = () => {
  if (!validateForm()) return

  const success = userStore.login(email.value, password.value)
  if (success) {
    notify.show('🎉 Đăng nhập thành công!', 'success')
    email.value = ''
    password.value = ''
    errors.value = {}
    emit('close')
  } else {
    // Hiển thị lỗi chung (ví dụ: sai email hoặc mật khẩu)
    notify.show('❌ Sai email hoặc mật khẩu!', 'error')
  }
}
</script>

<style scoped>
/* 🌌 Lớp nền mờ che toàn màn hình khi modal hiển thị */
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

/* 📦 Hộp chứa nội dung đăng nhập */
.modal-box {
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  width: 360px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  animation: fadeIn 0.3s ease;
}

/* ✨ Hiệu ứng mở modal (fade + slide nhẹ xuống) */
@keyframes fadeIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>

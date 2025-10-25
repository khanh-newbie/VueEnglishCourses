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
        </div>

        <!-- Nhập mật khẩu -->
        <div class="mb-3">
          <label>Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>

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

/* 💾 Lấy store quản lý người dùng (đăng nhập / đăng ký / đăng xuất) */
const userStore = useUserStore()

/*
  🚀 Hàm xử lý đăng nhập
  - Gọi hàm login(email, password) từ store.
  - Nếu thành công: hiển thị thông báo, xóa form, đóng modal.
  - Nếu thất bại: báo lỗi.
*/
const handleLogin = () => {
  const success = userStore.login(email.value, password.value)
  if (success) {
    alert('Đăng nhập thành công!')
    email.value = ''
    password.value = ''
    emit('close') // ✅ Đóng modal sau khi đăng nhập
  } else {
    alert('Sai email hoặc mật khẩu!')
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

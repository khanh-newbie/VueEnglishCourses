<template>
  <!-- 
    Khi biến `open` = true, modal hiển thị lên.
    Khi `open` = false, modal ẩn đi.
    `v-if="open"` là điều kiện hiển thị modal.
  -->
  <div v-if="open" class="modal-backdrop">
    <div class="modal-box">
      <!-- Tiêu đề modal -->
      <h4 class="fw-bold mb-3 text-center">Đăng ký tài khoản</h4>

      <!-- 
        Form đăng ký tài khoản.
        Khi người dùng nhấn nút "Đăng ký", sự kiện submit bị chặn mặc định bởi `.prevent`
        và hàm `handleSignup()` trong phần <script> sẽ được gọi để xử lý đăng ký.
      -->
      <form @submit.prevent="handleSignup">
        <!-- Ô nhập họ tên -->
        <div class="mb-3">
          <label>Họ tên</label>
          <!-- Dùng `v-model` để ràng buộc dữ liệu 2 chiều với biến `name` -->
          <input v-model="name" type="text" class="form-control" required />
        </div>

        <!-- Ô nhập email -->
        <div class="mb-3">
          <label>Email</label>
          <!-- Dữ liệu nhập vào được lưu trong biến `email` -->
          <input v-model="email" type="email" class="form-control" required />
        </div>

        <!-- Ô nhập mật khẩu -->
        <div class="mb-3">
          <label>Mật khẩu</label>
          <!-- Dữ liệu nhập vào được lưu trong biến `password` -->
          <input v-model="password" type="password" class="form-control" required />
        </div>

        <!-- Nút submit form -->
        <button class="btn btn-success w-100">Đăng ký</button>
      </form>

      <!-- 
        Dòng chữ hiển thị liên kết chuyển sang trang đăng nhập.
        Khi người dùng nhấn vào “Đăng nhập ngay”, component phát ra sự kiện `open-login`
        để component cha bắt và mở modal đăng nhập thay thế.
      -->
      <p class="mt-3 text-center">
        Đã có tài khoản?
        <a href="#" @click.prevent="$emit('open-login')">Đăng nhập ngay</a>
      </p>

      <!-- 
        Nút đóng modal.
        Khi nhấn vào sẽ phát ra sự kiện `close` để component cha đóng modal này.
      -->
      <button class="btn btn-sm btn-outline-secondary w-100 mt-2" @click="$emit('close')">Đóng</button>
    </div>
  </div>
</template>

<script setup>
/* 
  Phần script sử dụng cú pháp <script setup> (Composition API).
  - Không cần `export default`.
  - Các biến, hàm khai báo ở đây có thể được dùng trực tiếp trong template.
*/

import { ref } from 'vue'               // Dùng `ref()` để khai báo biến phản ứng (reactive)
import { useUserStore } from '../stores/userStore.js' // Import store quản lý người dùng

// ---- Định nghĩa props và sự kiện ----
defineProps({ open: Boolean })           // Nhận prop `open` từ component cha, điều khiển hiển thị modal
defineEmits(['close', 'open-login'])     // Khai báo 2 sự kiện có thể phát ra cho component cha

// ---- Các biến phản ứng (reactive state) ----
const name = ref('')                     // Lưu tên người dùng nhập vào
const email = ref('')                    // Lưu email
const password = ref('')                 // Lưu mật khẩu
const userStore = useUserStore()         // Gọi store để thao tác với dữ liệu người dùng

// ---- Hàm xử lý khi người dùng nhấn "Đăng ký" ----
const handleSignup = () => {
  // Gọi hàm signup trong userStore, truyền vào 3 giá trị người dùng nhập
  const ok = userStore.signup(name.value, email.value, password.value)

  // Nếu đăng ký thành công
  if (ok) {
    alert('Đăng ký thành công!')
    // Reset lại dữ liệu nhập
    name.value = ''
    email.value = ''
    password.value = ''
    // Gửi sự kiện "close" để đóng modal
    emit('close')
  } else {
    // Nếu email đã tồn tại thì thông báo lỗi
    alert('Email này đã được đăng ký!')
  }
}
</script>

<style scoped>
/* 
  Các style này chỉ áp dụng cho component này (nhờ thuộc tính scoped)
  -> giúp tránh xung đột CSS với các component khác.
*/

/* 
  Nền mờ của modal: phủ toàn màn hình, làm tối nền phía sau.
*/
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex; 
  align-items: center; 
  justify-content: center;
  z-index: 3000; /* Đảm bảo modal hiển thị trên cùng */
}

/* 
  Hộp nội dung modal chính: khung trắng, bo góc, đổ bóng, căn giữa.
*/
.modal-box {
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  width: 360px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  animation: fadeIn 0.3s ease; /* Hiệu ứng xuất hiện nhẹ */
}

/* 
  Hiệu ứng chuyển động khi modal hiển thị (fade-in)
*/
@keyframes fadeIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>

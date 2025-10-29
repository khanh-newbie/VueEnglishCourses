<template>
  <div class="container py-5" v-if="user">
    <div class="card shadow-sm p-4 mx-auto" style="max-width: 500px;">

      <!-- 👤 Avatar & Tên -->
      <div class="text-center mb-4">
        <div class="mb-3 d-flex flex-column align-items-center">
          <label class="form-label fw-bold mb-2">Ảnh đại diện</label>
          
          <img
            :src="user.avatar"
            alt="Avatar"
            class="rounded-circle border"
            style="width: 100px; height: 100px; object-fit: cover; cursor: pointer;"
            @click="avatarInput.click()"
          />
          
          <input
            type="file"
            ref="avatarInput"
            class="d-none"
            @change="handleAvatarChange"
            accept="image/*"
          />
        </div>

        <div class="d-flex align-items-center gap-2 mb-3">
          <label class="fw-bold mb-0">Name:</label>
          <input
            v-model="editName"
            class="form-control"
            placeholder="Nhập tên..."
          />
        </div>

        <div class="d-flex align-items-center gap-2 mb-3">
          <label class="fw-bold mb-0">Email:</label>
          <p class="text-muted mb-0">{{ user.email }}</p>
        </div>


      </div>

      <hr />

      <!-- 📚 Khóa học đã mua -->
      <div>
        <h5>📚 Khóa học đã mua</h5>
        <ul v-if="user.purchasedCourses.length" class="list-group">
          <li v-for="slug in user.purchasedCourses" :key="slug" class="list-group-item">
            {{ slug }}
          </li>
        </ul>
        <p v-else class="text-muted">Chưa mua khóa học nào</p>
      </div>

      <hr />

      <!-- 🔐 Nút mở modal đổi mật khẩu -->
      <div class="d-flex justify-content-center gap-2 mt-3 flex-wrap">
        <button class="btn btn-outline-primary flex-fill" @click="openChangePassword = true">
          Đổi mật khẩu
        </button>
        <button class="btn btn-success flex-fill" @click="updateProfile">
          Lưu thông tin
        </button>
      </div>


    </div>

    <!-- 🧩 Modal đổi mật khẩu -->
    <ChangePasswordModal
      :open="openChangePassword"
      @close="openChangePassword = false"
    />
  </div>

  <div v-else class="text-center py-5">
    <h4>Bạn chưa đăng nhập.</h4>
    <router-link to="/" class="btn btn-primary mt-3">
      Quay về Trang chủ
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import ChangePasswordModal from '../components/ChangePasswordModal.vue'
import { useNotificationStore } from '../stores/notificationStore.js'

const userStore = useUserStore()
const notify = useNotificationStore()
const user = userStore.user

// modal đổi mật khẩu
const openChangePassword = ref(false)

// --- Chỉnh sửa tên ---
const editName = ref(user?.name || '')

// --- Avatar ---
const avatarInput = ref(null)
const handleAvatarChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (ev) => {
    user.avatar = ev.target.result
  }
  reader.readAsDataURL(file)
}

// --- Lưu profile ---
const updateProfile = () => {
  if (!editName.value.trim()) {
    notify.show('Vui lòng nhập tên!', 'error')
    return
  }
  user.name = editName.value

  // Cập nhật trong danh sách users
  const index = userStore.users.findIndex(u => u.id === user.id)
  if (index !== -1) userStore.users[index] = { ...user }

  // Cập nhật localStorage
  localStorage.setItem('currentUser', JSON.stringify(user))
  localStorage.setItem('users', JSON.stringify(userStore.users))

  notify.show('✏️ Cập nhật thông tin thành công!', 'success')
}
</script>

<style scoped>
.card {
  border-radius: 12px;
}

input.form-control {
  display: inline-block;
  text-align: center;
  max-width: 100%;
}
</style>

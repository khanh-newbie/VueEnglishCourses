<template>
  <div class="container py-5" v-if="user">
    <div class="card shadow-sm p-4 mx-auto" style="max-width: 500px;">
      <div class="text-center mb-4">
        <img
          :src="user.avatar"
          alt="Avatar"
          class="rounded-circle border"
          style="width: 100px; height: 100px; object-fit: cover;"
        />
        <h4 class="mt-3">{{ user.name }}</h4>
        <p class="text-muted">{{ user.email }}</p>
      </div>

      <hr />

      <div>
        <h5>📚 Khóa học đã mua</h5>
        <ul v-if="user.purchasedCourses.length" class="list-group">
          <li
            v-for="slug in user.purchasedCourses"
            :key="slug"
            class="list-group-item"
          >
            {{ slug }}
          </li>
        </ul>
        <p v-else class="text-muted">Chưa mua khóa học nào</p>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-5">
    <h4>Bạn chưa đăng nhập.</h4>
    <router-link to="/" class="btn btn-primary mt-3">
      Quay về Trang chủ
    </router-link>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore.js'

const userStore = useUserStore()
const user = userStore.user
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>

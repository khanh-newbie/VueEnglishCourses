<template>
  <!-- 🧾 PHẦN GIAO DIỆN CHÍNH -->
  <div class="container py-5">
    <h3 class="mb-4">📜 Lịch sử giao dịch</h3>

    <!-- 🕳️ 1️⃣ Nếu người dùng chưa có giao dịch -->
    <div v-if="userOrders.length === 0" class="text-muted">
      Chưa có giao dịch nào.
    </div>

    <!-- 💳 2️⃣ Nếu có giao dịch -->
    <div v-else>
      <!-- 🔁 Lặp qua danh sách đơn hàng -->
      <div v-for="order in userOrders" :key="order.id" class="card mb-3 p-3 shadow-sm border-0">
        <div class="d-flex justify-content-between align-items-start">
          <!-- 🧩 Thông tin chi tiết đơn hàng -->
          <div>
            <div><strong>Mã hoá đơn:</strong> {{ order.id }}</div>
            <div><strong>Ngày:</strong> {{ new Date(order.createdAt).toLocaleString() }}</div>
            <div><strong>Phương thức:</strong> {{ order.method || 'Thanh toán trực tiếp' }}</div>
          </div>

          <!-- 💰 Tổng tiền -->
          <div class="text-end">
            <strong class="text-danger">{{ order.total }} ₫</strong>
          </div>
        </div>

        <!-- 📚 Danh sách khóa học đã mua -->
        <ul class="mt-2 mb-0 small text-muted">
          <li v-for="it in order.items" :key="it.id">
            {{ it.name || it.title }} ({{ it.price || '0 ₫' }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
===========================================
💼 LOGIC TRANG LỊCH SỬ GIAO DỊCH
- Hiển thị danh sách đơn hàng đã mua của user hiện tại
- Lấy dữ liệu từ Pinia store (orderStore, userStore)
- Dữ liệu được lưu trong localStorage
===========================================
*/

import { useOrderStore } from '../stores/orderStore.js'
import { useUserStore } from '../stores/userStore.js'
import { computed, onMounted } from 'vue'

/* 🏪 Sử dụng các store */
const orderStore = useOrderStore()
const userStore = useUserStore()

/* 🚀 Khi component được mount → khởi tạo dữ liệu từ localStorage */
onMounted(() => {
  orderStore.init()
})

/* 🔍 Lọc danh sách đơn hàng theo user đang đăng nhập */
const userOrders = computed(() => {
  if (!userStore.user) return []
  return orderStore.getUserOrders(userStore.user.email)
})
</script>

<style scoped>
/* 🎨 STYLE CƠ BẢN CHO TRANG LỊCH SỬ GIAO DỊCH */
.card {
  border-radius: 12px;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
}
</style>

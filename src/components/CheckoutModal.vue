<template>
  <div>
    <!-- 🌫 Lớp nền mờ phía sau modal, bấm vào thì đóng -->
    <div class="modal-backdrop" v-if="open" @click="close"></div>

    <!-- Hiệu ứng xuất hiện biến mất của modal -->
    <transition name="fade">
      <!-- 🧾 Hộp modal chính -->
      <div v-show="open" class="checkout-modal card p-3 shadow-lg">

        <!-- 🔹 Header của modal -->
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h5 class="mb-0">Thanh toán</h5>
          <!-- Nút đóng -->
          <button class="btn-close" @click="close"></button>
        </div>

        <!-- 🔸 Nếu giỏ hàng trống -->
        <div v-if="cart.length === 0" class="text-center text-muted py-4">
          Giỏ hàng trống
        </div>

        <!-- 🔸 Nếu giỏ hàng có sản phẩm -->
        <div v-else>
          <!-- Danh sách các sản phẩm trong giỏ -->
          <ul class="list-group mb-3">
            <li
              class="list-group-item d-flex justify-content-between align-items-center"
              v-for="it in cart"
              :key="it.id"
            >
              <div>
                <div class="fw-bold">{{ it.name }}</div>
                <small class="text-muted">{{ it.duration }}</small>
              </div>
              <div>{{ it.price }}</div>
            </li>
          </ul>

          <!-- 💰 Tổng tiền -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div><strong>Tổng</strong></div>
            <div class="fw-bold">{{ totalPrice }} ₫</div>
          </div>

          <!-- 🧍 Form nhập thông tin người thanh toán -->
          <form>
            <div class="mb-2">
              <label class="form-label small">Họ và tên</label>
              <input v-model="form.name" class="form-control form-control-sm" required />
            </div>

            <!-- 💳 Phương thức thanh toán (động) -->
            <div class="mb-3">
              <label class="form-label small">Phương thức thanh toán</label>
              <div class="d-flex gap-2 mb-2">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm flex-fill"
                  :class="{ active: form.method === 'card' }"
                  @click="form.method = 'card'"
                >
                  💳 Thẻ
                </button>

                <button
                  type="button"
                  class="btn btn-outline-success btn-sm flex-fill"
                  :class="{ active: form.method === 'bank' }"
                  @click="form.method = 'bank'"
                >
                  🏦 Chuyển khoản
                </button>
              </div>

              <!-- ⚡ Hiển thị chi tiết động -->
              <transition name="fade" mode="out-in">
                <div v-if="form.method === 'card'" key="card" class="p-2 border rounded bg-light small">
                  💳 <strong>Thanh toán bằng thẻ (giả lập)</strong><br />
                  Mã thẻ: **** **** **** 1234<br />
                  Hết hạn: 12/26<br />
                  Chủ thẻ: {{ form.name || "Hoàng Bích Diệp" }}
                </div>

                <div v-else-if="form.method === 'bank'" key="bank" class="p-2 border rounded bg-light small">
                  🏦 <strong>Chuyển khoản ngân hàng (giả lập)</strong><br />
                  Ngân hàng: ACB - CN Hà Nội<br />
                  STK: 123456789<br />
                  Tên: Hoàng Bích Diệp<br />
                  Nội dung: {{ form.name || "Nguyễn Duy Khánh" }} - Thanh toán khóa học
                </div>
              </transition>
            </div>

            <!-- Nút hủy và thanh toán -->
            <div class="d-flex justify-content-between align-items-center">
              <button class="btn btn-secondary btn-sm" type="button" @click="close">Hủy</button>

              <button type="button" class="btn btn-primary btn-sm" :disabled="processing" @click="onPay">
                <!-- Hiện spinner nếu đang xử lý -->
                <span
                  v-if="processing"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                {{ processing ? 'Đang xử lý...' : 'Thanh toán' }}
              </button>
            </div>
          </form>

          <!-- 🧾 Hiển thị kết quả sau thanh toán -->
          <div v-if="result" class="mt-3">
            <!-- Cảnh báo / thành công -->
            <div :class="result.success ? 'alert alert-success' : 'alert alert-danger'">
              {{ result.message }}
            </div>

            <!-- Nếu thanh toán thành công thì hiển thị mã đơn -->
            <div v-if="result.success" class="small text-muted">
              Mã hoá đơn: <strong>{{ result.orderId }}</strong>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore.js'
import { useOrderStore } from '../stores/orderStore.js'
import { useCartStore } from '../stores/cartStore.js' // ✅ Store giỏ hàng

export default {
  name: 'CheckoutModal',

  // Nhận props từ cha (trạng thái mở & danh sách giỏ hàng)
  props: {
    open: { type: Boolean, default: false },
    cart: { type: Array, default: () => [] }
  },

  // Các sự kiện gửi ngược lên cha
  emits: ['close', 'paid'],

  setup(props, { emit }) {
    // Khai báo router & các store
    const router = useRouter()
    const userStore = useUserStore()
    const orderStore = useOrderStore()
    const cartStore = useCartStore()

    // Dữ liệu form người mua
    const form = ref({ name: '', email: '', method: 'card' })

    // Trạng thái xử lý & kết quả
    const processing = ref(false)
    const result = ref(null)

    // ✅ Tính tổng giá trị đơn hàng
    const totalPrice = computed(() => {
      const sum = props.cart.reduce(
        (s, it) => s + Number(it.price.replace(/\./g, '').replace(' ₫', '')),
        0
      )
      return sum.toLocaleString()
    })

    // ✅ Hàm đóng modal
    const close = () => emit('close')

    // ✅ Khi modal mở -> tự động điền thông tin người dùng (nếu có)
    watch(
      () => props.open,
      (isOpen) => {
        if (isOpen && userStore.user) {
          form.value.name = userStore.user.name || ''
          form.value.email = userStore.user.email || ''
        }
      },
      { immediate: true }
    )

    // ✅ Hàm thanh toán
    const onPay = () => {
      if (processing.value) return // chặn double click
      processing.value = true // bật trạng thái xử lý

      // 1️⃣ Kiểm tra đăng nhập
      if (!userStore.user) {
        result.value = { success: false, message: '⚠️ Vui lòng đăng nhập trước khi thanh toán.' }
        processing.value = false
        return
      }

      // 2️⃣ Kiểm tra form
      if (!form.value.name || !form.value.email) {
        result.value = { success: false, message: 'Vui lòng điền tên và email.' }
        processing.value = false
        return
      }

      result.value = null // reset kết quả

      // 3️⃣ Giả lập xử lý thanh toán sau 1s
      setTimeout(() => {
        // Tạo mã đơn hàng
        const orderId = 'ORD' + Date.now() + '-' + Math.floor(Math.random() * 1000)

        // Tạo object đơn hàng
        const order = {
          id: orderId,
          items: props.cart.slice(), // copy danh sách giỏ hàng
          total: totalPrice.value,
          customer: { ...form.value },
          method: form.value.method,
          createdAt: new Date().toISOString(),
          userEmail: userStore.user.email // để lọc đơn theo user
        }

        // 4️⃣ Lưu đơn hàng vào store
        orderStore.addOrder(order)

        // 5️⃣ Xoá giỏ hàng sau khi thanh toán
        cartStore.clearCart()

        // 6️⃣ Mở khóa khóa học đã mua
        order.items.forEach(it => {
          userStore.purchaseCourse(it.slug)
        })

        // 7️⃣ Gửi sự kiện "paid" cho cha
        emit('paid', order)

        // 8️⃣ Hiển thị kết quả thanh toán
        processing.value = false
        result.value = { success: true, message: '✅ Thanh toán giả lập thành công!', orderId }

        // 9️⃣ Sau 1 giây: đóng modal + chuyển sang trang /orders
        setTimeout(() => {
          emit('close')
          router.push('/orders')
        }, 1000)
      }, 1000)
    }

    // Trả ra để template dùng
    return { form, processing, result, totalPrice, close, onPay }
  }
}
</script>

<style scoped>
/* 🌫 Nền đen mờ khi mở modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1040;
}

/* 🧾 Khung modal chính */
.checkout-modal {
  position: fixed;
  right: 20px;
  top: 0px;
  width: 360px;
  z-index: 1050;
  border-radius: 0.5rem;
}

/* ✨ Hiệu ứng fade in/out */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

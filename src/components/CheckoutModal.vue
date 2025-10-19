<template>
  <div>
    <div class="modal-backdrop" v-if="open" @click="close"></div>

    <transition name="fade">
      <div v-show="open" class="checkout-modal card p-3 shadow-lg">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h5 class="mb-0">Thanh toán</h5>
          <button class="btn-close" @click="close"></button>
        </div>

        <div v-if="cart.length === 0" class="text-center text-muted py-4">
          Giỏ hàng trống
        </div>

        <div v-else>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="it in cart" :key="it.id">
              <div>
                <div class="fw-bold">{{ it.name }}</div>
                <small class="text-muted">{{ it.duration }}</small>
              </div>
              <div>{{ it.price }}</div>
            </li>
          </ul>

          <div class="d-flex justify-content-between align-items-center mb-3">
            <div><strong>Tổng</strong></div>
            <div class="fw-bold">{{ totalPrice }} ₫</div>
          </div>

          <form @submit.prevent="onPay">
            <div class="mb-2">
              <label class="form-label small">Họ và tên</label>
              <input v-model="form.name" class="form-control form-control-sm" required />
            </div>
            <div class="mb-2">
              <label class="form-label small">Email</label>
              <input v-model="form.email" type="email" class="form-control form-control-sm" required />
            </div>
            <div class="mb-2">
              <label class="form-label small">Địa chỉ</label>
              <input v-model="form.address" class="form-control form-control-sm" />
            </div>
            <div class="mb-3">
              <label class="form-label small">Phương thức (giả lập)</label>
              <select v-model="form.method" class="form-select form-select-sm">
                <option value="card">Thẻ (giả lập)</option>
                <option value="bank">Chuyển khoản (giả lập)</option>
              </select>
            </div>

            <div class="d-flex justify-content-between align-items-center">
              <button class="btn btn-secondary btn-sm" type="button" @click="close">Hủy</button>
              <button class="btn btn-primary btn-sm" :disabled="processing">
                <span v-if="processing" class="spinner-border spinner-border-sm me-2" role="status"></span>
                {{ processing ? 'Đang xử lý...' : 'Thanh toán' }}
              </button>
            </div>
          </form>

          <div v-if="result" class="mt-3">
            <div :class="result.success ? 'alert alert-success' : 'alert alert-danger'">
              {{ result.message }}
            </div>
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

export default {
  name: 'CheckoutModal',
  props: {
    open: { type: Boolean, default: false },
    cart: { type: Array, default: () => [] }
  },
  emits: ['close', 'paid'],
  setup(props, { emit }) {
    const form = ref({ name: '', email: '', address: '', method: 'card' })
    const processing = ref(false)
    const result = ref(null)

    const totalPrice = computed(() => {
      const sum = props.cart.reduce(
        (s, it) => s + Number(it.price.replace(/\./g, '').replace(' ₫', '')),
        0
      )
      return sum.toLocaleString()
    })

    const close = () => emit('close')

    const onPay = () => {
      if (!form.value.name || !form.value.email) {
        result.value = { success: false, message: 'Vui lòng điền tên và email.' }
        return
      }
      processing.value = true
      result.value = null

      setTimeout(() => {
        const orderId = 'ORD' + Date.now()
        const order = {
          id: orderId,
          items: props.cart.slice(),
          total: totalPrice.value,
          customer: { ...form.value },
          method: form.value.method,
          createdAt: new Date().toISOString()
        }
        emit('paid', order)
        processing.value = false
        result.value = { success: true, message: 'Thanh toán giả lập thành công!', orderId }
      }, 1400)
    }

    return { form, processing, result, totalPrice, close, onPay }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 1040;
}
.checkout-modal {
  position: fixed;
  right: 20px;
  top: 80px;
  width: 360px;
  z-index: 1050;
  border-radius: 0.5rem;
}
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

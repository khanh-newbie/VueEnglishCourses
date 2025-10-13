<template>
  <div>
    <div class="modal-backdrop" v-if="open" @click="close"></div>

    <transition name="fade">
      <div v-if="open" class="checkout-modal card p-3 shadow-lg">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h5 class="mb-0">Thanh toán</h5>
          <button class="btn-close" @click="close"></button>
        </div>

        <div v-if="cart.length === 0" class="text-center text-muted py-4">
          Giỏ hàng trống
        </div>

        <div v-else>
          <!-- list items -->
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

          <!-- form -->
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
                <option value="cod">Thanh toán khi nhận hàng (giả lập)</option>
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

          <!-- result -->
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
export default {
  name: "CheckoutModal",
  props: {
    open: { type: Boolean, default: false },
    cart: { type: Array, default: () => [] }
  },
  emits: ["close", "paid"], // paid -> emit order back to parent
  data() {
    return {
      form: { name: "", email: "", address: "", method: "card" },
      processing: false,
      result: null
    }
  },
  computed: {
    totalPrice() {
      // return formatted number (string)
      const sum = this.cart.reduce((s, it) => s + Number(it.price.replace(/\./g, "").replace(" ₫", "")), 0)
      return sum.toLocaleString()
    }
  },
  methods: {
    close() {
      if (!this.processing) this.$emit("close")
    },
    onPay() {
      if (!this.form.name || !this.form.email) {
        this.result = { success: false, message: "Vui lòng điền tên và email." }
        return
      }
      this.processing = true
      this.result = null

      // simulate API/payment processing
      setTimeout(() => {
        // giả lập success
        const orderId = 'ORD' + Date.now()
        const order = {
          id: orderId,
          items: this.cart.slice(),
          total: this.totalPrice,
          customer: { ...this.form },
          method: this.form.method,
          createdAt: new Date().toISOString()
        }

        // emit order để parent xử lý (lưu localStorage, clear cart, ...)
        this.$emit("paid", order)

        this.processing = false
        this.result = { success: true, message: "Thanh toán giả lập thành công!", orderId }
      }, 1400)
    }
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

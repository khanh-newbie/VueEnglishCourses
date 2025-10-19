<template>
  <div id="header" class="bg-light shadow-sm py-3">
    <div class="container">
      <div class="row align-items-center">
        <!-- Logo -->
        <div class="col-md-3 col-6">
          <a href="#" class="d-flex align-items-center text-decoration-none">
            <img src="/src/assets/images/teacher.jpg" alt="Logo" class="me-2 h-10 w-10 object-cover rounded-full"/>
            <span class="fw-bold text-dark">English Center</span>
          </a>
        </div>

        <!-- Menu -->
        <div class="col-md-6 d-none d-md-block">
          <ul class="nav justify-content-center">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Trang chủ</router-link>
            </li>
            <li class="nav-item dropdown" style="position: relative;"
                @mouseenter="showCourseDropdown = true"
                @mouseleave="showCourseDropdown = false">
              <router-link class="nav-link" to="/courses">Khóa học</router-link>
              <transition name="fade-slide">
                <ul v-if="showCourseDropdown" class="dropdown-menu list-unstyled" style="display: block; top: 100%; left: 0;">
                  <li v-for="course in courses" :key="course.id">
                    <router-link class="dropdown-item" :to="`/courses/${course.slug}`">{{ course.name }}</router-link>
                  </li>
                </ul>
              </transition>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">Liên hệ</router-link>
            </li>
          </ul>
        </div>

        <!-- Cart icon -->
        <div class="col-md-3 col-6 text-end position-relative">
          <button class="btn btn-outline-dark position-relative" @click="showCart = !showCart">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ cart.length }}
            </span>
          </button>

          <transition name="slide-right">
            <div v-if="showCart" class="card position-absolute end-0 mt-2 shadow" style="width: 300px; z-index: 1000;">
              <div class="card-body p-2">
                <h6 class="fw-bold mb-2">Giỏ hàng</h6>
                <div v-if="cart.length === 0" class="text-center text-muted">Chưa có khóa học nào</div>
                <ul v-else class="list-group mb-2">
                  <li v-for="item in cart" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <small>{{ item.name }}</small><br/>
                      <small class="text-muted">{{ item.price }}</small>
                    </div>
                    <button class="btn btn-sm btn-outline-danger" @click="removeFromCart(item.id)">&times;</button>
                  </li>
                </ul>

                <div v-if="cart.length > 0" class="d-flex justify-content-between">
                  <strong>Tổng:</strong>
                  <strong>{{ totalPrice }} ₫</strong>
                </div>
                <div v-if="cart.length > 0" class="d-flex justify-content-between mt-2">
                  <button class="btn btn-sm btn-outline-secondary" @click="showCart=false">Tiếp tục mua</button>
                  <button class="btn btn-sm btn-primary" @click="checkoutOpen=true">Thanh toán</button>
                </div>

                <CheckoutModal :open="checkoutOpen" :cart="cart" @close="checkoutOpen=false" @paid="onPaid" />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <transition name="toast-fade">
      <div v-if="toast.show" class="toast-notification">{{ toast.message }}</div>
    </transition>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import CheckoutModal from './CheckoutModal.vue'
import { courses as rawCourses } from '../data/courses.js'
import { useCartStore } from '../stores/cartStore.js'

export default {
  name: 'Header',
  components: { CheckoutModal },
  setup() {
    const courses = rawCourses.map(c => ({ ...c, students: c.students || 0 }))
    const showCart = ref(false)
    const showCourseDropdown = ref(false)
    const checkoutOpen = ref(false)
    const toast = ref({ show: false, message: '' })

    const cartStore = useCartStore()
    const cart = computed(() => cartStore.cart)
    const totalPrice = computed(() => cartStore.totalPrice)

    const addToCart = (course) => {
      cartStore.addToCart(course)
      showToast(`Đã thêm ${course.name} vào giỏ`)
    }
    const removeFromCart = (id) => cartStore.removeFromCart(id)

    const onPaid = (order) => {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      orders.push(order)
      localStorage.setItem('orders', JSON.stringify(orders))

      const course = courses.find(c => c.id === order.courseId)
      if (course) course.students += 1

      cartStore.clearCart()
      checkoutOpen.value = false
      showCart.value = false
      showToast('Thanh toán giả lập thành công. Mã: ' + order.id)
    }

    const showToast = (msg) => {
      toast.value.message = msg
      toast.value.show = true
      setTimeout(() => toast.value.show = false, 2500)
    }

    return {
      courses, showCart, showCourseDropdown, checkoutOpen, toast,
      cart, totalPrice, addToCart, removeFromCart, onPaid
    }
  }
}
</script>

<style scoped>
/* Dropdown menu slide + fade */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(-10px); }
.fade-slide-enter-to { opacity: 1; transform: translateY(0); }
.fade-slide-leave-from { opacity: 1; transform: translateY(0); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }

/* Cart slide from right */
.slide-right-enter-active, .slide-right-leave-active { transition: all 0.3s ease; }
.slide-right-enter-from { transform: translateX(100%); opacity: 0; }
.slide-right-enter-to { transform: translateX(0); opacity: 1; }
.slide-right-leave-from { transform: translateX(0); opacity: 1; }
.slide-right-leave-to { transform: translateX(100%); opacity: 0; }

/* Toast */
.toast-fade-enter-active, .toast-fade-leave-active { transition: all 0.5s ease; }
.toast-fade-enter-from { opacity: 0; transform: translateY(-20px); }
.toast-fade-enter-to { opacity: 1; transform: translateY(0); }
.toast-fade-leave-from { opacity: 1; transform: translateY(0); }
.toast-fade-leave-to { opacity: 0; transform: translateY(-20px); }
.toast-notification {
  position: fixed; top: 20px; right: 20px;
  background: #1e88e5; color: #fff; padding: 10px 15px;
  border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  z-index: 2000;
}

/* Hover underline menu */
.nav-link {
  font-size: 1.1rem; 
  font-weight: 600;  
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute; width: 0%; height: 2px; bottom: 0; left: 0;
  background-color: #1e88e5; transition: width 0.3s;
}
.nav-link:hover::after { width: 100%; }
.nav-link:hover { color: #1e88e5; }

footer a::before {
  content: none !important;
}
</style>

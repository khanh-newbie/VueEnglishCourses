<!-- ✅ Header.vue – Thanh điều hướng chính của ứng dụng -->
<template>
  <div id="header" class="bg-light shadow-sm py-3">
    <div class="container">
      <div class="row align-items-center">

        <!-- 🌟 LOGO + Tên trung tâm -->
        <div class="col-md-3 col-6">
          <a href="#" class="d-flex align-items-center text-decoration-none">
            <img src="/src/assets/images/teacher.jpg" alt="Logo" class="me-2 h-10 w-10 object-cover rounded-full"/>
            <span class="fw-bold text-dark">English Center</span>
          </a>
        </div>

        <!-- 📚 MENU TRUNG TÂM (Trang chủ - Khóa học - Liên hệ) -->
        <div class="col-md-6 d-none d-md-block">
          <ul class="nav justify-content-center">

            <!-- Trang chủ -->
            <li class="nav-item">
              <router-link class="nav-link" to="/">Trang chủ</router-link>
            </li>

            <!-- Dropdown khóa học (hiện khi hover) -->
            <li class="nav-item dropdown" style="position: relative;"
                @mouseenter="showCourseDropdown = true"
                @mouseleave="showCourseDropdown = false">
              <router-link class="nav-link" to="/courses">Khóa học</router-link>

              <!-- Hiệu ứng mượt cho dropdown -->
              <transition name="fade-slide">
                <ul v-if="showCourseDropdown" class="dropdown-menu list-unstyled" style="display: block; top: 100%; left: 0;">
                  <li v-for="course in courses" :key="course.id">
                    <router-link class="dropdown-item" :to="`/courses/${course.slug}`">{{ course.name }}</router-link>
                  </li>
                </ul>
              </transition>
            </li>

            <!-- Liên hệ -->
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">Liên hệ</router-link>
            </li>

            <!-- Lịch sử giao dịch -->
            <li class="nav-item">
              <router-link class="nav-link" to="/orders">Lịch sử giao dịch</router-link>
            </li>

          </ul>
        </div>

        <!-- 🧾 GIỎ HÀNG + USER AVATAR (cột bên phải) -->
        <div class="col-md-3 col-6 text-end position-relative">

          <!-- 🛒 Nút mở giỏ hàng -->
          <button class="btn btn-outline-dark position-relative" @click="showCart = !showCart">
            <i class="fa-solid fa-cart-shopping"></i>
            <!-- 🔢 Hiển thị số lượng sản phẩm -->
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ cart.length }}
            </span>
          </button>

          <!-- 🧾 GIỎ HÀNG TRƯỢT RA -->
          <transition name="slide-right">
            <div v-if="showCart"
              class="card shadow border-0"
              style="position: absolute; top: 100%; right: 0; margin-top: 10px; width: 320px; z-index: 1000;">
              <div class="card-body p-2">
                <h6 class="fw-bold mb-2">Giỏ hàng</h6>

                <!-- Nếu giỏ trống -->
                <div v-if="cart.length === 0" class="text-center text-muted">Chưa có khóa học nào</div>

                <!-- Danh sách sản phẩm trong giỏ -->
                <ul v-else class="list-group mb-2">
                  <li v-for="item in cart" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <small>{{ item.name }}</small><br/>
                      <small class="text-muted">{{ item.price }}</small>
                    </div>
                    <button class="btn btn-sm btn-outline-danger" @click="removeFromCart(item.id)">&times;</button>
                  </li>
                </ul>

                <!-- Tổng tiền -->
                <div v-if="cart.length > 0" class="d-flex justify-content-between">
                  <strong>Tổng:</strong>
                  <strong>{{ totalPrice }} ₫</strong>
                </div>

                <!-- Nút hành động -->
                <div v-if="cart.length > 0" class="d-flex justify-content-between mt-2">
                  <button class="btn btn-sm btn-outline-secondary" @click="showCart=false">Tiếp tục mua</button>
                  <button class="btn btn-sm btn-primary" @click="checkoutOpen=true">Thanh toán</button>
                </div>

                <!-- 🧾 Modal thanh toán -->
                <CheckoutModal :open="checkoutOpen" :cart="cart" @close="checkoutOpen=false" @paid="onPaid" />
              </div>
            </div>
          </transition>

          <!-- 👤 USER AVATAR + MENU -->
          <div class="d-inline-block ms-2 position-relative">
            <!-- Avatar người dùng (nếu có) -->
            <div class="avatar-wrapper" @click="toggleUserDropdown">
              <img v-if="userStore.user?.avatar" :src="userStore.user.avatar" alt="User Avatar" class="avatar-img" />
              <i v-else class="fa-solid fa-user-circle fa-2x text-primary"></i>
            </div>

            <!-- Menu dropdown user -->
            <transition name="fade-slide">
              <ul v-if="showUserDropdown" class="dropdown-menu dropdown-menu-end show p-2" style="position: absolute; right: 0; top: 100%; z-index: 2000;">
                
                <!-- Nếu đã đăng nhập -->
                <template v-if="userStore.user">
                  <li class="px-2 mb-2 border-bottom">
                    <strong>{{ userStore.user.name }}</strong><br />
                    <small class="text-muted">{{ userStore.user.email }}</small>
                  </li>

                  <li>
                    <router-link
                      to="/profile"
                      class="dropdown-item"
                      @click="showUserDropdown = false"
                    >
                      Thông tin cá nhân
                    </router-link>
                  </li>

                  <li><button class="dropdown-item" @click="logout">Đăng xuất</button></li>
                </template>

                <!-- Nếu chưa đăng nhập -->
                <template v-else>
                  <li><button class="dropdown-item" @click="showLogin = true">Đăng nhập</button></li>
                  <li><button class="dropdown-item" @click="showSignup = true">Đăng ký</button></li>
                </template>
              </ul>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔔 Thông báo Toast -->
    <transition name="toast-fade">
      <div v-if="toast.show" class="toast-notification">{{ toast.message }}</div>
    </transition>

    <!-- 🔑 Modal đăng nhập -->
    <LoginModal
      :open="showLogin"
      @close="showLogin = false"
      @open-signup="(showLogin = false, showSignup = true)"
    />

    <!-- 📝 Modal đăng ký -->
    <SignupModal
      :open="showSignup"
      @close="showSignup = false"
      @open-login="(showSignup = false, showLogin = true)"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import CheckoutModal from './CheckoutModal.vue'
import { courses as rawCourses } from '../data/courses.js'
import { useCartStore } from '../stores/cartStore.js'
import { useUserStore } from '../stores/userStore.js'
import LoginModal from './LoginModal.vue'
import SignupModal from './SignupModal.vue'
import { useNotificationStore } from '../stores/notificationStore.js'

export default {
  name: 'Header',
  components: { CheckoutModal, LoginModal, SignupModal },
  setup() {
    // 📚 Dữ liệu khóa học (dùng cho menu dropdown)
    const courses = rawCourses.map(c => ({ ...c, students: c.students || 0 }))

    // 🔄 Các biến trạng thái giao diện
    const showCart = ref(false)
    const showCourseDropdown = ref(false)
    const checkoutOpen = ref(false)
    const toast = ref({ show: false, message: '' })

    // 🛒 Store giỏ hàng
    const cartStore = useCartStore()
    const cart = computed(() => cartStore.cart)
    const totalPrice = computed(() => cartStore.totalPrice)

    // ➕ Thêm / Xóa khóa học khỏi giỏ
    const addToCart = (course) => {
      cartStore.addToCart(course)
      showToast(`Đã thêm ${course.name} vào giỏ`)
    }
    const removeFromCart = (id) => cartStore.removeFromCart(id)

    // 💳 Khi thanh toán thành công
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

    // 🔔 Hiển thị thông báo Toast
    const showToast = (msg) => {
      toast.value.message = msg
      toast.value.show = true
      setTimeout(() => toast.value.show = false, 2500)
    }

    // 👤 Quản lý user
    const userStore = useUserStore()
    const showLogin = ref(false)
    const showSignup = ref(false)
    const showUserDropdown = ref(false)

    const toggleUserDropdown = () => showUserDropdown.value = !showUserDropdown.value
    const notify = useNotificationStore()
    const logout = () => {
      userStore.logout()
      notify.show('Đăng xuất thành công!', 'success')
    }    

    return {
      courses, showCart, showCourseDropdown, checkoutOpen, toast,
      cart, totalPrice, addToCart, removeFromCart, onPaid, userStore,
      showLogin, showSignup, showUserDropdown,
      toggleUserDropdown, logout
    }
  }
}
</script>

<style scoped>
/* Hiệu ứng cho dropdown, cart, toast, avatar... */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(-10px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }

.slide-right-enter-active, .slide-right-leave-active { transition: all 0.3s ease; }
.slide-right-enter-from { transform: translateX(100%); opacity: 0; }
.slide-right-leave-to { transform: translateX(100%); opacity: 0; }

.toast-fade-enter-active, .toast-fade-leave-active { transition: all 0.5s ease; }
.toast-fade-enter-from { opacity: 0; transform: translateY(-20px); }
.toast-fade-leave-to { opacity: 0; transform: translateY(-20px); }

.toast-notification {
  position: fixed; top: 20px; right: 20px;
  background: #1e88e5; color: #fff; padding: 10px 15px;
  border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  z-index: 2000;
}

/* === Menu + Avatar đẹp hơn === */
.nav-link {
  font-size: 1.1rem; font-weight: 600;
  padding: 0.5rem 1rem; border-radius: 0.25rem;
  transition: all 0.3s ease; position: relative;
}
.nav-link::after {
  content: ''; position: absolute; width: 0%; height: 2px; bottom: 0; left: 0;
  background-color: #1e88e5; transition: width 0.3s;
}
.nav-link:hover::after { width: 100%; }
.nav-link:hover { color: #1e88e5; }

/* === Cột bên phải (Cart + Avatar) === */
.col-md-3.text-end {
  display: flex; justify-content: flex-end; align-items: center;
  gap: 15px; position: relative;
}

/* === Avatar === */
.avatar-wrapper {
  display: inline-flex; align-items: center; justify-content: center;
  width: 42px; height: 42px; border-radius: 50%; overflow: hidden;
  cursor: pointer; background: #f0f2f5; border: 1.5px solid #e4e6eb;
  transition: all 0.25s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.08);
}
.avatar-wrapper:hover {
  transform: scale(1.05); box-shadow: 0 4px 10px rgba(0,0,0,0.12);
}
.avatar-img { width: 100%; height: 100%; object-fit: cover; }

.dropdown-menu {
  min-width: 180px; right: 0 !important; left: auto !important;
  top: 100% !important; transform: translateY(5px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  border: none; border-radius: 10px;
}
</style>

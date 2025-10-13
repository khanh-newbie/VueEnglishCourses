<template>
    <!-- HEADER -->
    <div id="header" class="bg-light shadow-sm py-3">
        <div class="container">
            <div class="row align-items-center">
                <!-- Logo -->
                <div class="col-md-3 col-6">
                    <a href="#" class="d-flex align-items-center text-decoration-none">
                        <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
                        alt="Logo"
                        height="40"
                        class="me-2"
                        />
                        <span class="fw-bold text-dark">English Center</span>
                    </a>
                </div>

                <!-- Menu -->
                <div class="col-md-6 d-none d-md-block">
                    <ul class="nav justify-content-center">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Trang chủ</router-link>
                        </li>

                        <li class="nav-item dropdown d-flex align-items-center">
                            <router-link class="nav-link" to="/courses">Khóa học</router-link>

                            <a
                                class="nav-link dropdown-toggle dropdown-toggle-split"
                                href="#"
                                id="courseDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span class="visually-hidden">Toggle Dropdown</span>
                            </a>

                            <ul class="dropdown-menu" aria-labelledby="courseDropdown">
                                <li v-for="course in courses" :key="course.id">
                                    <router-link class="dropdown-item" :to="`/courses/${course.slug}`">{{ course.name }}</router-link>
                                </li>
                            </ul>

                        </li>

                        <li class="nav-item">
                            <router-link class="nav-link" to="/contact">Liên hệ</router-link>
                        </li>
                    </ul>
                </div>
       
                <!-- Cart icon -->
                <div class="col-md-3 col-6 text-end position-relative">
                <button class="btn btn-outline-dark position-relative" @click="toggleCart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {{ cart.length }}
                    </span>
                </button>

                <!-- Dropdown cart -->
                <div v-if="showCart"
                    class="card position-absolute end-0 mt-2 shadow"
                    style="width: 300px; z-index: 1000;">
                    <div class="card-body p-2">
                    <h6 class="fw-bold mb-2">Giỏ hàng</h6>
                    <div v-if="cart.length === 0" class="text-center text-muted">
                        Chưa có khóa học nào
                    </div>
                    <ul class="list-group mb-2" v-else>
                        <li v-for="item in cart" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <small>{{ item.name }}</small><br>
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
                        <button class="btn btn-sm btn-primary" @click="startCheckout">Thanh toán</button>
                        </div>

                        <!-- modal component -->
                        <CheckoutModal :open="checkoutOpen" :cart="cart" @close="checkoutOpen=false" @paid="onPaid" />
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CheckoutModal from "../components/CheckoutModal.vue";

export default {
  name: "Header",
  components: { CheckoutModal },
  data() {
    return {
      courses: [],  // có thể import từ courses.js nếu muốn
      showCart: false,
      cart: JSON.parse(localStorage.getItem("cart") || "[]")
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => {
        return sum + Number(item.price.replace(/\./g, "").replace(" ₫", ""));
      }, 0).toLocaleString();
    }
  },
  methods: {
    toggleCart() {
      this.showCart = !this.showCart;
    },
    addToCart(course) {
      if (!this.cart.find(c => c.id === course.id)) {
        this.cart.push(course);
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter(c => c.id !== id);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    startCheckout() { this.checkoutOpen = true },
    onPaid(order) {
      // lưu đơn vào localStorage orders
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      orders.push(order)
      localStorage.setItem("orders", JSON.stringify(orders))

      // clear cart
      this.cart = []
      localStorage.setItem("cart", JSON.stringify([]))
      this.checkoutOpen = false
      this.showCart = false

      // optional: show toast
      alert("Thanh toán giả lập thành công. Mã: " + order.id)
    }
  }
};
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}
</style>
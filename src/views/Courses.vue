<template>
  <div>

    <!-- ============================= -->
    <!-- 🟦 PHẦN 1: HEADER / SLIDER   -->
    <!-- ============================= -->
    <!-- Hiển thị tiêu đề “Các khóa học” và breadcrumb điều hướng -->
    <section class="slider-section text-white text-center position-relative overflow-hidden py-5 bg-primary">
      <div class="container">
        <h1 class="fw-bold display-5 mb-3">{{ $t('CoursesTitle') }}</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-decoration-none text-white-50">{{ $t('home') }}</router-link>
            </li>
            <li class="breadcrumb-item active text-white" aria-current="page">{{ $t('courses') }}</li>
          </ol>
        </nav>
      </div>
    </section>

    <!-- ================================== -->
    <!-- 🟩 PHẦN 2: DANH SÁCH KHÓA HỌC     -->
    <!-- ================================== -->
    <section id="content-courses" class="py-5">
      <div class="container">

        <!-- 🟨 Tiêu đề phụ -->
        <div class="text-center mb-5">
          <p class="text-muted lead">{{ $t('chooseCourseSubtitle') }}</p>
        </div>

        <!-- 🟧 Danh sách khóa học hiển thị theo dạng thẻ (card) -->
        <div class="row g-4 justify-content-center">

          <!-- 🔁 Lặp qua từng khóa học trong danh sách -->
          <div class="course-card col-sm-6 col-md-4 col-lg-3"
            v-for="course in courses"
            :key="course.id">

            <!-- 🟦 Thẻ hiển thị từng khóa học -->
            <div class="card h-100 shadow-lg border-0 overflow-hidden">

              <!-- Ảnh bìa + overlay chứa nút -->
              <div class="card-img-wrapper position-relative">
                <img :src="course.cover" class="card-img-top" :alt="course.name">

                <!-- 🟨 Overlay khi hover vào ảnh: hiện nút Chi tiết / Thêm vào giỏ -->
                <div class="overlay d-flex justify-content-center align-items-center">
                  <router-link :to="`/courses/${course.slug}`" class="btn btn-sm course-btn me-2">
                    {{ $t('detail') }} <i class="fa-solid fa-arrow-right ms-1"></i>
                  </router-link>

                  <!-- Nút thêm vào giỏ hàng -->
                  <button
                    class="btn btn-sm course-btn-add"
                    @click="addToCart(course)"
                    :disabled="orderStore.hasPurchased(course.id)">
                    {{ orderStore.hasPurchased(course.id) ? 'Đã mua' : 'Thêm vào giỏ' }}
                  </button>
                </div>
              </div>

              <!-- 🟩 Thông tin khóa học: tên, thời lượng, giá -->
              <div class="card-body text-center py-3">
                <h6 class="card-title fw-bold mb-2 gradient-text">{{ course.name[$i18n.locale] }}</h6>
                <p class="text-muted small mb-1">
                  <i class="fa-solid fa-clock me-1"></i>{{ course.duration[$i18n.locale] }}
                </p>
                <h6 class="text-danger fw-bold mb-0 fs-6">{{ course.price }}</h6>
              </div>
            </div>
          </div>     
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// =======================================
// 🧠 PHẦN 3: LOGIC VÀ XỬ LÝ DỮ LIỆU
// =======================================
import { courses } from '../data/courses.js'
import { onMounted } from 'vue'
import { useCartStore } from '../stores/cartStore.js'
import { useUserStore } from '../stores/userStore.js'
import { useOrderStore } from '../stores/orderStore.js'
import { useNotificationStore } from '../stores/notificationStore.js'

export default {
  name: "Course",
  setup() {
    // 🏪 Khởi tạo các store: giỏ hàng, người dùng, đơn hàng
    const cartStore = useCartStore()
    const userStore = useUserStore()
    const orderStore = useOrderStore()

    // 🔄 Khi component mount: khởi tạo dữ liệu đơn hàng
    onMounted(() => {
      orderStore.init()
    })

    const notify = useNotificationStore()

    // 🛒 Hàm thêm khóa học vào giỏ hàng
    const addToCart = (course) => {
      if (!userStore.user) {
        notify.show('⚠️ Vui lòng đăng nhập trước khi thêm vào giỏ hàng!', 'error')
        return
      }
      cartStore.addToCart(course)
      notify.show('✅ Đã thêm vào giỏ hàng!', 'success')
    }

    // Xuất dữ liệu và hàm ra template
    return { courses, cartStore, userStore, orderStore, addToCart }
  }
}
</script>

<style scoped>
/* ============================ */
/* 🎨 PHẦN 4: STYLE GIAO DIỆN  */
/* ============================ */

/* --- Gradient chữ --- */
.gradient-text {
  background: linear-gradient(90deg, #3ac7d6, #7a6cff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* --- Card hiển thị khóa học --- */
.course-card .card {
  transition: transform 0.4s, box-shadow 0.4s;
  border-radius: 1rem;
  cursor: pointer;
}
.course-card .card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
}

/* --- Overlay chứa nút --- */
.card-img-wrapper {
  position: relative;
  overflow: hidden;
}
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.card-img-wrapper:hover .overlay {
  opacity: 1;
}

/* --- Nút “Chi tiết” và “Thêm giỏ” --- */
.course-btn {
  background: linear-gradient(270deg, #7a6cff, #9a85ff, #7a6cff);
  background-size: 600% 100%;
  color: #fff;
  font-weight: 500;
  border-radius: 25px;
  transition: transform 0.3s;
  padding: 0.25rem 0.8rem;
}
.course-btn-add {
  background: linear-gradient(270deg, #3ac7d6, #6cf6f3, #3ac7d6);
  background-size: 600% 100%;
  color: #fff;
  font-weight: 500;
  border-radius: 25px;
  transition: transform 0.3s;
  padding: 0.25rem 0.8rem;
}
.course-btn:hover, .course-btn-add:hover {
  transform: translateY(-2px);
  animation: gradientShift 4s ease infinite;
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* --- Hiệu ứng phóng to ảnh khi hover --- */
.course-card .card img {
  transition: transform 0.5s ease;
}
.course-card .card:hover img {
  transform: scale(1.08);
}

/* --- Responsive trên mobile --- */
@media (max-width: 768px) {
  .overlay {
    opacity: 1;
    background: rgba(0,0,0,0.2);
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>

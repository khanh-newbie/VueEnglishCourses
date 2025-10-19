<template>
  <div>
    <!-- Slider / Header trang khóa học -->
    <section class="slider-section text-white text-center position-relative overflow-hidden py-5 bg-primary">
      <div class="container">
        <h1 class="fw-bold display-5 mb-3">Các khóa học</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-decoration-none text-white-50">Trang chủ</router-link>
            </li>
            <li class="breadcrumb-item active text-white" aria-current="page">Khóa học</li>
          </ol>
        </nav>
      </div>
    </section>

    <!-- Content courses -->
    <section id="content-courses" class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <p class="text-muted lead">Chọn khóa học phù hợp với trình độ của bạn</p>
        </div>
        <div class="row g-4 justify-content-center">
          <!-- Courses -->
          <div class="course-card col-sm-6 col-md-4 col-lg-3"
            v-for="course in courses"
            :key="course.id">
            <div class="card h-100 shadow-lg border-0 overflow-hidden">
              <div class="card-img-wrapper position-relative">
                <img :src="course.cover" class="card-img-top" :alt="course.name">
                <div class="overlay d-flex justify-content-center align-items-center">
                  <router-link :to="`/courses/${course.slug}`" class="btn btn-sm course-btn me-2">
                    Chi tiết <i class="fa-solid fa-arrow-right ms-1"></i>
                  </router-link>
                  <button class="btn btn-sm course-btn-add" @click="addToCart(course)">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
              <div class="card-body text-center py-3">
                <h6 class="card-title fw-bold mb-2 gradient-text">{{ course.name }}</h6>
                <p class="text-muted small mb-1">
                  <i class="fa-solid fa-clock me-1"></i>{{ course.duration }}</p>
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
import { courses } from '../data/courses.js';
import { useCartStore } from '../stores/cartStore.js'

export default {
  name: "Course",
  data() {
    return {
      courses,
      cartStore: useCartStore()
    }
  },
  methods: {
    viewDetail(courseId) {
      console.log("Xem chi tiết khoá học ID:", courseId);
      // Nếu dùng router: this.$router.push(`/courses/${courseId}`)
    },
    addToCart(course) {
      this.cartStore.addToCart(course)
    }
  }
}
</script>

<style scoped>
  /* --- Gradient chữ --- */
.gradient-text {
  background: linear-gradient(90deg, #3ac7d6, #7a6cff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* --- Card --- */
.course-card .card {
  transition: transform 0.4s, box-shadow 0.4s;
  border-radius: 1rem;
  cursor: pointer;
}
.course-card .card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
}

/* --- Overlay nút khi hover --- */
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

/* --- Nút chi tiết / thêm giỏ --- */
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

/* --- Image scale khi hover --- */
.course-card .card img {
  transition: transform 0.5s ease;
}
.course-card .card:hover img {
  transform: scale(1.08);
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .overlay {
    opacity: 1;
    background: rgba(0,0,0,0.2);
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>

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
    <section id="content-courses" class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-4">
          <p class="text-muted">Chọn khóa học phù hợp với trình độ của bạn</p><br>
        </div>

        <div class="row g-3 justify-content-center">
          <!-- Courses -->
          <div class="course-card col-sm-6 col-md-4 col-lg-3 mb-5"
          v-for="course in courses"
          :key="course.id">
            <div class="card h-100 shadow-sm border-0">
              <img :src="course.cover" class="card-img-top" :alt="course.name">
              <div class="card-body py-3">
                <h6 class="card-title fw-bold mb-2">{{ course.name }}</h6>
                <p class="text-muted small mb-1">
                  <i class="fa-solid fa-clock me-1"></i>{{ course.duration }}</p>
                <h6 class="text-danger fw-bold mb-0 fs-6">{{ course.price }}</h6>
                <div class="mt-3 d-flex justify-content-between">
                  <router-link
                    :to="`/courses/${course.slug}`"
                    class="btn btn-sm course-btn"
                  >
                    Chi tiết <i class="fa-solid fa-arrow-right ms-1"></i>
                  </router-link>

                  <button
                    class="btn btn-sm btn-success"
                    @click="addToCart(course)"
                  >
                    Thêm vào giỏ
                  </button>

                </div>
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

export default {
  name: "Course",
  data() {
    return {
      courses
    }
  },
  methods: {
    viewDetail(courseId) {
      console.log("Xem chi tiết khoá học ID:", courseId);
      // Nếu dùng router: this.$router.push(`/courses/${courseId}`)
    },
    addToCart(course) {
      // gọi phương thức addToCart trong Header thông qua ref
      this.$root.$refs.header.addToCart(course);
    }
  }
}
</script>

<style scoped>
  .course-btn {
    background: #3ac7d6; /* gradient tím nhạt */
    color: #fff;
    font-weight: 500;
    border-radius: 25px;
    transition: all 0.3s ease;
  }

  .course-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(108, 99, 255, 0.4);
    background: linear-gradient(135deg, #7a6cff, #9a85ff);
  }
</style>

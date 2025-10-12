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
          <!-- Course 1 -->
          <div class="course-card col-sm-6 col-md-4 col-lg-3">
            <div class="card h-100 shadow-sm border-0">
              <img src="" class="card-img-top" alt="Toeic - Reading">
              <div class="card-body py-3">
                <h6 class="card-title fw-bold mb-2">Toeic – Reading</h6>
                <p class="text-muted small mb-1"><i class="fa-solid fa-clock me-1"></i>10 tuần</p>
                <h6 class="text-danger fw-bold mb-0 fs-6">1.000.000 ₫</h6>
                <button class="detail-btn">
                  Chi tiết <i class="fa-solid fa-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Course 2 -->
          <div class="course-card col-sm-6 col-md-4 col-lg-3">
            <div class="card h-100 shadow-sm border-0">
              <img src="" class="card-img-top" alt="Toeic - Listening">
              <div class="card-body py-3">
                <h6 class="card-title fw-bold mb-2">Toeic Listening</h6>
                <p class="text-muted small mb-1"><i class="fa-solid fa-clock me-1"></i>16 tuần</p>
                <h6 class="text-danger fw-bold mb-0 fs-6">1.260.000 ₫</h6>
                <button class="detail-btn">
                  Chi tiết <i class="fa-solid fa-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Course"
}
</script>

<style scoped>
/* CSS riêng màn Course */
</style>

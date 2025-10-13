<template>
 <!-- SLIDER -->
    <div id="slider" class="slider-section text-white overflow-hidden">
        <div class="container py-5">
            <div class="row">
                <div class="col-12">
                    <div class="position-absolute top-0 start-0 mt-3 ms-3 text-start">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item">
                                <router-link to="/" class="text-white-50 text-decoration-none">Trang chủ</router-link>
                                </li>
                                <li class="breadcrumb-item">
                                <router-link to="/courses" class="text-white-50 text-decoration-none">Khóa học</router-link>
                                </li>
                                <li class="breadcrumb-item active text-white" aria-current="page">{{ course?.name }}</li>
                            </ol>
                        </nav>
                    </div>

                    <div class="container d-flex flex-column align-items-center justify-content-center text-center pt-4">
                        <h1 class="fw-bold mb-2 display-5">{{ course?.name }}</h1>
                        <p class="mb-1"><i class="bi bi-person-circle me-2"></i>{{ course?.teacher }}</p>
                        <p class="mb-0"><i class="bi bi-book me-2"></i>{{ course?.title }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Shapes trang trí -->
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
    </div>

    <!-- CONTENT -->
    <div id="content">
        <!-- COURSE DETAIL SECTION -->
        <section id="course-detail" class="py-5 bg-light">
            <div class="container">
                <div class="row g-4">
                    <!-- LEFT CONTENT -->
                    <div class="col-lg-8">
                        <!-- Tabs -->
                        <ul class="nav nav-tabs" id="courseTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab">Tổng quan</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="curriculum-tab" data-bs-toggle="tab" data-bs-target="#curriculum" type="button" role="tab">Chương trình học</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="instructor-tab" data-bs-toggle="tab" data-bs-target="#instructor" type="button" role="tab">Giảng viên</button>
                            </li>
                        </ul>

                        <!-- Tab Contents -->
                        <div class="tab-content mt-3" id="courseTabContent">
                            <!-- Tổng quan -->
                            <div class="tab-pane fade show active" id="overview" role="tabpanel">
                                <h4 class="fw-bold mb-3">Tổng quan khóa học</h4>
                                <p>Khóa học Toeic Reading giúp bạn nắm vững kỹ năng đọc hiểu, từ vựng và chiến lược làm bài thi hiệu quả.</p>
                            </div>

                            <!-- Chương trình học -->
                            <div class="tab-pane fade" id="curriculum" role="tabpanel">
                                <h4 class="fw-bold mb-3">Chương trình học</h4>
                                <ul class="list-group">
                                    <!-- Lesson 1 -->
                                    <div class="card mb-3 shadow-sm">
                                        <div class="card-body d-flex justify-content-between align-items-center">
                                            <div class="col-md-10">
                                                <h5 class="card-title mb-1">Lesson 1</h5>
                                                <p class="card-text mb-0">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, incidunt at? Dolor porro impedit distinctio odit laborum perspiciatis aperiam minima, mollitia amet ab molestias atque esse quibusdam assumenda, nulla sit.
                                                </p>
                                            </div>
                                            <div class="col-md-2 d-flex justify-content-center align-items-center">
                                                <button class="btn btn-sm btn-primary" onclick="location.href='LectureDetail'">Xem trước</button>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Lesson 2 -->
                                    <div class="card mb-3 shadow-sm">
                                        <div class="card-body d-flex justify-content-between align-items-center">
                                            <div class="col-md-10">
                                                <h5 class="card-title mb-1">Lesson 2</h5>
                                                <p class="card-text mb-0">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, incidunt at? Dolor porro impedit distinctio odit laborum perspiciatis aperiam minima, mollitia amet ab molestias atque esse quibusdam assumenda, nulla sit.
                                                </p>
                                            </div>
                                            <div class="col-md-2 d-flex justify-content-center align-items-center">
                                                <button class="btn btn-sm btn-primary" onclick="location.href='LectureDetail'">Xem trước</button>  
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Lesson 3 -->
                                    <div class="card mb-3 shadow-sm">
                                        <div class="card-body d-flex justify-content-between align-items-center">
                                            <div class="col-md-10">
                                                <h5 class="card-title mb-1">Lesson 3</h5>
                                                <p class="card-text mb-0">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, incidunt at? Dolor porro impedit distinctio odit laborum perspiciatis aperiam minima, mollitia amet ab molestias atque esse quibusdam assumenda, nulla sit.
                                                </p>
                                            </div>
                                            <div class="col-md-2 d-flex justify-content-center align-items-center">
                                                <button class="btn btn-sm btn-primary" onclick="location.href='LectureDetail'">Xem trước</button>
                                            </div>
                                        </div>
                                    </div>                        
                                </ul>
                            </div>

                            <!-- Giảng viên -->
                            <div class="tab-pane fade" id="instructor" role="tabpanel">
                                <div class="d-flex align-items-center mt-3">
                                <img src="https://secure.gravatar.com/avatar/024468074b51259bc54a1458828c56fca665cc3a62ebf983717e2199809060b3?s=150" 
                                    class="rounded-circle me-3" width="80" height="80" alt="Giảng viên">
                                <div>
                                    <h5 class="mb-1">{{ course?.teacher }}</h5>
                                    <p class="mb-0 text-muted">Giảng viên Toeic chuyên sâu với hơn 5 năm kinh nghiệm.</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT SIDEBAR -->
                    <div class="col-lg-4">
                        <div class="card shadow-sm">
                            <img src="https://englishwithhuy.com/wp-content/themes/edublink/assets/images/course-preview.jpg" 
                                class="card-img-top" alt="Preview">
                            <div class="card-body">
                                <h5 class="fw-bold">Khoá học bao gồm:</h5>
                                <ul class="list-unstyled mb-3">
                                    <li><i class="bi bi-cash-coin me-2 text-success"></i><strong>Giá:</strong> {{ course?.price }}</li>
                                    <li><i class="bi bi-person-fill me-2 text-primary"></i><strong>Giáo viên:</strong> {{ course?.teacher }}</li>
                                    <li><i class="bi bi-journal-text me-2 text-warning"></i><strong>Bài học:</strong> 5</li>
                                    <li><i class="bi bi-people-fill me-2 text-info"></i><strong>Học viên:</strong> 15</li>
                                </ul>
                                <button class="btn btn-success w-100 mb-3">Tham gia khóa học</button>
                                <div class="text-center">
                                    <p class="mb-2 fw-bold">Chia sẻ khoá học:</p>
                                    <a href="#" class="btn btn-outline-primary btn-sm me-1"><i class="bi bi-facebook"></i></a>
                                    <a href="#" class="btn btn-outline-info btn-sm me-1"><i class="bi bi-twitter-x"></i></a>
                                    <a href="#" class="btn btn-outline-secondary btn-sm"><i class="bi bi-linkedin"></i></a>
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
import { courses } from '../data/courses.js'

export default {
  name: "CourseDetail",
  data() {
    return {
      course: null
    }
  },
  mounted() {
    this.loadCourse()
  },
  watch: {
    '$route.params.slug': function() {
      this.loadCourse()
    }
  },
  methods: {
    loadCourse() {
      const slug = this.$route.params.slug
      this.course = courses.find(c => c.slug === slug)
    }
  }
}
</script>

<style scoped>
/* CSS riêng màn Course */
</style>

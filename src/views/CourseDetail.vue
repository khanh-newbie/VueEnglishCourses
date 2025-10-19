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
                                <CourseCurriculum :courseType="slugType" />
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
                                    <li><i class="bi bi-journal-text me-2 text-warning"></i><strong>Bài học:</strong> {{ lessonCount }} </li>
                                    <li><i class="bi bi-people-fill me-2 text-info"></i><strong>Học viên:</strong> {{ course?.students }}</li>
                                </ul>
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
import CourseCurriculum from "../components/CourseCurriculum.vue"
import lessons from '../data/lesson.json';
import { useCartStore } from '../stores/cartStore.js'

export default {
  name: "CourseDetail",
  components: { CourseCurriculum },
  props: [ 'slug'],
  data: () => ({ course: null }),
  computed: {
    slugType() {
      // ✅ Tự động xác định loại khóa học từ slug
      if (this.slug?.includes('reading')) return 'reading'
      if (this.slug?.includes('listening')) return 'listening'
      return ''
    },
    lessonCount() {
        return this.slugType ? lessons[this.slugType].length : 0;
    }
  },
  mounted() {
    this.loadCourse()
  },
  watch: {
    '$route.params.slug': 'loadCourse'
  },
  methods: {
    loadCourse() {
      this.course = courses.find(c => c.slug === this.$route.params.slug)
    }
  }
}
</script>


<style scoped>
/* CSS riêng màn Course */
</style>

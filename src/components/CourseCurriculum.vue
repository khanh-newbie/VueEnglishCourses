<template>
  <div>
    <h4 class="fw-bold mb-3">Chương trình học</h4>

    <div v-if="filteredLessons && filteredLessons.length">
      <div
        v-for="lesson in filteredLessons"
        :key="lesson.id"
        class="card mb-3 shadow-sm"
      >
        <div class="card-body d-flex justify-content-between align-items-center">
          <div class="col-md-10">
            <h5 class="card-title mb-1">{{ lesson.title }}</h5>
            <p class="card-text mb-0">{{ lesson.description }}</p>
          </div>
          <div class="col-md-2 d-flex justify-content-center align-items-center">
            <button
              class="btn btn-sm btn-primary"
              @click="goToLesson(lesson.id)"
            >
              Xem trước
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-muted">Chưa có bài học cho khóa này.</p>
    </div>
  </div>
</template>

<script>
import lessonsData from "../data/lesson.json";

export default {
  name: "CourseCurriculum",
  props: {
    courseType: {
      type: String,
      required: true
    }
  },
  computed: {
    filteredLessons() {
      return lessonsData[this.courseType] || [];
    }
  },
  methods: {
    goToLesson(id) {
      // Chuyển sang trang chi tiết bài học
      this.$router.push({ name: "LectureDetail", params: { id } });
    }
  }
};
</script>

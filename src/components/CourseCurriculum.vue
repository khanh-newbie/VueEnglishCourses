<template>
  <div>
    <h4 class="fw-bold mb-3">Chương trình học</h4>

    <div v-if="filteredLessons.length">
      <div
        v-for="(lesson, index) in filteredLessons"
        :key="lesson.id"
        class="card mb-3 shadow-sm"
      >
        <div class="card-body d-flex justify-content-between align-items-center">
          <div class="col-md-10">
            <h5 :class="{ 'text-muted': isLocked(index) }" class="card-title mb-1">
              {{ lesson.title }}
            </h5>
            <p class="card-text mb-0">{{ lesson.description }}</p>
          </div>
          <div class="col-md-2 d-flex justify-content-center align-items-center">
            <button
              class="btn btn-sm btn-primary"
              :disabled="isLocked(index)"
              @click="goToLesson(lesson.id, index)"
            >
              Xem trước
            </button>
            <i
              v-if="isLocked(index)"
              class="bi bi-lock-fill ms-2 text-secondary"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-muted">Chưa có bài học cho khóa này.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import lessonsData from "../data/lesson.json";
import { useUserStore } from "../stores/userStore.js";
import { useCourseStore } from '../stores/courseStore.js'
import { useRouter } from "vue-router";

const props = defineProps({
  courseType: { type: String, required: true },
  courseId: { type: String, required: true }
});

const router = useRouter();
const courseStore = useCourseStore()

// danh sách bài học
const filteredLessons = computed(() => lessonsData[props.courseType] || []);

// kiểm tra bài học có bị khóa hay không
const isLocked = (index) => courseStore.isLessonLocked(index, String(props.courseId))

// đi đến trang bài học
const goToLesson = (id, index) => {
  if (isLocked(index)) {
    alert("🔒 Bạn cần đăng nhập và mua khóa học để xem bài này!");
    return;
  }
  router.push({
    name: "LectureDetail",
    params: { slug: props.courseType, id }
  });
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  transition: all 0.2s ease;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.btn-primary {
  min-width: 100px;
}
.text-muted {
  cursor: not-allowed;
}
</style>

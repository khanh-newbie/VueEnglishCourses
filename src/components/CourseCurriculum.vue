<template>
  <div>
    <h4 class="fw-bold mb-3">{{ $t('StudyProgram') }}</h4>

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
              {{ $t('Preview') }}
            </button>
            <i
              :class="[
                'ms-2',
                isLocked(index) ? 'bi bi-lock-fill text-secondary' : 'bi bi-unlock-fill text-success'
              ]"
              style="font-size: 1.2rem;"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-muted">{{ $t('NoLessonForCourse') }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import lessonsData from "../data/lesson.json";
import { useUserStore } from "../stores/userStore.js";
import { useCourseStore } from '../stores/courseStore.js'
import { useRouter } from "vue-router";
import { useNotificationStore } from "../stores/notificationStore.js";

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

const notify = useNotificationStore()

// đi đến trang bài học
const goToLesson = (id, index) => {
  if (isLocked(index)) {
    notify.show('🔒 Bạn cần đăng nhập và mua khóa học để xem bài này!', 'error');
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
i {
  transition: transform 0.2s ease, color 0.2s ease;
}
i:hover {
  transform: scale(1.2);
}

</style>

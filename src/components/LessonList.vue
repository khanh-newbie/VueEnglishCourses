<template>
  <div class="col-md-3 border-end" style="min-height: 100vh;">
    <!-- Ô tìm kiếm -->
    <div class="p-3 border-bottom">
      <input
        type="text"
        v-model="search"
        class="form-control"
        placeholder="Search for course content"
      />
    </div>

    <!-- Danh sách bài học -->
    <div class="list-group">
      <button
        v-for="(lesson, index) in filteredLessons"
        :key="lesson.id"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        @click="handleClick(lesson, index)"
      >
        <!-- Tên bài học -->
        <span :class="{ 'text-muted': isLocked(index) }">
          {{ lesson.title }}
        </span>

        <!-- Icon khóa nếu bài bị khóa -->
        <i v-if="isLocked(index)" class="bi bi-lock-fill text-secondary"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useOrderStore } from "../stores/orderStore";
import { useUserStore } from "../stores/userStore";
import { useCourseStore } from "../stores/courseStore.js";

const props = defineProps({
  lessons: Array,
  courseId: String,
});
const emits = defineEmits(["selectLesson"]);

const search = ref("");
const userStore = useUserStore();
const courseStore = useCourseStore();

// reactive mảng khóa đã mua
const purchased = computed(() => userStore.user?.purchasedCourses || []);

const filteredLessons = computed(() =>
  props.lessons.filter(
    (l) =>
      l.title.toLowerCase().includes(search.value.toLowerCase()) ||
      (l.description && l.description.toLowerCase().includes(search.value.toLowerCase()))
  )
);

// kiểm tra khóa
const isLocked = (index) => {
  return courseStore.isLessonLocked(index, props.courseId);
};

const handleClick = (lesson, index) => {
  if (isLocked(index)) {
    alert("🔒 Bạn cần đăng nhập và mua khóa học để xem bài này!");
    return;
  }
  emits("selectLesson", lesson);
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
.list-group-item.text-muted {
  cursor: not-allowed;
}
</style>

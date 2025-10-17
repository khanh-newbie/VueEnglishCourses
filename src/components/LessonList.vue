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
        v-for="lesson in lessons"
        :key="lesson.id"
        class="list-group-item list-group-item-action"
        @click="$emit('selectLesson', lesson)"
      >
        {{ lesson.title }}
      </button>
    </div>
  </div>  
</template>

<script setup>
import { ref, computed } from "vue";
import lessons from "../data/readingLesson.json";

const props = defineProps({
  lessons: Array
});
const emits = defineEmits(["selectLesson"]);

const search = ref("");

const filteredLessons = computed(() =>
  props.lessons.filter(l =>
    l.title.toLowerCase().includes(search.value.toLowerCase()) ||
    l.description.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>

<template>
  <div id="content" class="py-5">
    <div class="container-fluid">
      <div class="row">
        <!-- Danh sách bài học -->
        <LessonList
          :lessons="lessons"
          @selectLesson="selectedLesson = $event"
        />

        <!-- Nội dung bài học -->
        <LessonContent :lesson="selectedLesson" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import LessonList from "../components/LessonList.vue";
import LessonContent from "../components/LessonContent.vue";
import readingLessons from "../data/readingLesson.json";
import listeningLessons from "../data/listeningLesson.json";

const route = useRoute();
const lessons = ref([]);
const selectedLesson = ref(null);

async function loadLessons() {
  const slug = route.params.slug;  // reading hoặc listening
  const lessonId = Number(route.params.id); // id bài học trong URL

  try {
    //load file JSON tương ứng
    let data = [];
    if (slug === "reading") {
      data = (await import("../data/readingLesson.json")).default;
    } else if (slug === "listening") {
      data = (await import("../data/listeningLesson.json")).default;
    }

    lessons.value = data;
    selectedLesson.value =
      lessons.value.find((l) => l.id === lessonId) || lessons.value[0];
  } catch (err) {
    console.error("Lỗi khi load dữ liệu bài học:", err);
  }
}

// Load khi component mount
onMounted(loadLessons);

// Nếu chuyển route (VD: từ reading sang listening), thì reload
watch(() => route.fullPath, loadLessons);
</script>


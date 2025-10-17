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
import { ref } from "vue";
import LessonList from "../components/LessonList.vue";
import LessonContent from "../components/LessonContent.vue";

const lessons = ref([
  {
    id: 1,
    title: "Lesson 1: Giới thiệu & Chiến lược làm bài",
    description: "Giới thiệu cấu trúc đề và mẹo làm bài.",
    video: "https://www.youtube.com/embed/Ot5sziwGlsM?si=s1JnHCmf_WHAyH23",
    quiz: [
      {
        question: "What is the main purpose of the video?",
        options: [
          { label: "A", text: "To introduce the IELTS format" },
          { label: "B", text: "To explain grammar rules" },
          { label: "C", text: "To discuss vocabulary" }
        ]
      },
      {
        question: "How many sections are in the IELTS Listening test?",
        options: [
          { label: "A", text: "Two" },
          { label: "B", text: "Three" },
          { label: "C", text: "Four" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Lesson 2: Từ vựng mô tả hành động trong ảnh",
    description: "Từ vựng mô tả hành động của người trong ảnh.",
    video: "https://www.youtube.com/embed/TX7WjvP4F1o",
    quiz: []
  }
]);

const selectedLesson = ref(lessons.value[0]);
</script>

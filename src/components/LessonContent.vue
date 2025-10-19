<template>
  <div class="col-md-9 px-5" style="text-align: center;" v-if="lesson">
    <!-- Tiêu đề TOEIC -->
    <h3 class="fw-bold mb-3 mt-3">
      TOEIC 
    </h3>

    <!-- Tiêu đề bài học -->
    <h5 class="mb-4">{{ lesson.title }}</h5>

    <!-- Video -->
    <div class="ratio ratio-16x9 mb-4">
      <iframe
        :src="lesson.video"
        width="560"
        height="315"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  lesson: Object,
});
</script>

<style scoped>
/* Chỉ còn video và tiêu đề */
</style>

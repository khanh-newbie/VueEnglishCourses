<template>
  <div class="col-md-9 px-5" style="text-align: center;" v-if="lesson">
    <h3 class="fw-bold mb-3 mt-3">TOEIC READING</h3>
    <h5 class="mb-4">{{ lesson.title }}</h5>

    <div class="ratio ratio-16x9 mb-4">
      <iframe
        :src="lesson.video"
        width="560"
        height="315"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>

    <h3 class="text-center fw-bold mb-4">Mini Quiz</h3>
    <form id="quizForm">
      <div v-for="(q, i) in currentQuiz" :key="i" class="mb-4">
        <p class="fw-semibold">{{ q.question }}</p>
        <div
          v-for="(opt, j) in q.options"
          :key="j"
          class="form-check"
        >
          <input
            class="form-check-input"
            type="radio"
            :name="'q' + i"
            :id="'q' + i + opt.label"
            :value="opt.label"
            v-model="userAnswers[i]"
          />

          <label class="form-check-label" :for="'q' + i + opt.label">
            {{ opt.label }}. {{ opt.text }}
          </label>
        </div>
      </div>
      <div class="text-end mb-5">
        <button class="btn btn-primary px-4" @click.prevent="submitQuiz">Gửi</button>
      </div>
    </form>
  </div>
</template>

<!-- <script setup>
const props = defineProps({
  lesson: Object
});
</script> -->
<script setup>
import { ref, watch } from "vue";
import quizData from "../data/readingQuiz.json";

const props = defineProps({
  lesson: Object,
});

const currentQuiz = ref([]);
const userAnswers = ref({});
const score = ref(0);

watch(
  () => props.lesson,
  (newLesson) => {
    if (newLesson && quizData[newLesson.id]) {
      currentQuiz.value = quizData[newLesson.id];
      userAnswers.value = {};
      score.value = 0;
    } else {
      currentQuiz.value = [];
    }
  },
  { immediate: true }
);

function submitQuiz() {
  let correct = 0;
  currentQuiz.value.forEach((q, i) => {
    if (userAnswers.value[i] === q.correct) correct++;
  });
  score.value = correct;
  alert(`✅ Bạn trả lời đúng ${correct}/${currentQuiz.value.length} câu!`);
}
</script>

<style scoped>
/* Khối tổng */
#quizForm {
  display: inline-block;
  text-align: left;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
}

/* Tiêu đề quiz */
h3.text-center {
  font-size: 1.8rem;
  color: #1a1a1a;
}

/* Câu hỏi */
#quizForm p {
  font-weight: 600;
  font-size: 1rem;
  color: #222;
  margin-bottom: 10px;
}

/* Cụm lựa chọn */
.form-check {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  background: #f9fafc;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.form-check:hover {
  background: #eef3ff;
}

/* Radio */
.form-check-input {
  position: relative !important;
  margin: 0 !important;
  transform: scale(1.15);
  accent-color: #0d6efd; /* màu xanh Bootstrap */
}

/* Text đáp án */
.form-check-label {
  font-size: 0.95rem;
  color: #333;
}

/* Nút gửi */
#quizForm button {
  margin-top: 25px;
  background-color: #0d6efd;
  border: none;
  font-weight: 500;
  padding: 10px 25px;
  border-radius: 8px;
  transition: 0.25s;
}

#quizForm button:hover {
  background-color: #0b5ed7;
  box-shadow: 0 4px 10px rgba(13, 110, 253, 0.3);
}
</style>






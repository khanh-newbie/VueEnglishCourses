<template>
  <div class="col-md-9 px-5" style="text-align: center;" v-if="lesson">
    <!-- 🟦 Tiêu đề chính: Hiển thị loại khóa TOEIC (READING / LISTENING / SPEAKING / WRITING) -->
    <h3 class="fw-bold mb-3 mt-3">
      TOEIC {{ displaySlug }}
    </h3>

    <!-- 🟩 Tiêu đề bài học cụ thể -->
    <h5 class="mb-4">{{ lesson.title }}</h5>

    <!-- 🎥 Phần Video bài học -->
    <div class="video-wrapper mb-4">
      <iframe
        :src="lesson.video"
        title="Lesson Video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <!-- 🔴 Nếu là SPEAKING: hiện phần thu âm -->
    <div v-if="displaySlug === 'SPEAKING'" class="record-section mx-auto p-4 shadow-sm rounded-4 bg-white">
      <h3 class="text-center fw-bold mb-4 text-primary">Speaking Practice</h3>

      <!-- Hiển thị đề bài (prompt) -->
      <div class="text-start mb-4 p-3 bg-light rounded-3 border">
        <h5 class="fw-semibold">Your Task:</h5>
        <p class="mt-2 fs-5">{{ lesson.prompt }}</p>
      </div>

      <!-- Nút điều khiển thu âm -->
      <div class="mb-3">
        <button
          class="btn btn-danger me-2"
          @click="startRecording"
          :disabled="isRecording"
        >
          🔴 Start Recording
        </button>
        <button
          class="btn btn-secondary"
          @click="stopRecording"
          :disabled="!isRecording"
        >
          ⏹ Stop
        </button>
      </div>

      <!-- Khi có bản thu -->
      <div v-if="audioUrl">
        <p class="text-success">✅ Recording completed! You can listen or submit:</p>
        <audio :src="audioUrl" controls></audio>
        <div class="mt-3">
          <button class="btn btn-success" @click="submitRecording">
            📤 Submit Recording
          </button>
        </div>
      </div>
    </div>

    <!-- ✏️ Nếu là WRITING: hiện textarea nhập bài -->
    <div v-else-if="displaySlug === 'WRITING'" class="writing-section mx-auto p-4 shadow-sm rounded-4 bg-white">
      <h3 class="text-center fw-bold mb-4 text-primary">Writing Practice</h3>

      <!-- Đề bài -->
      <div class="text-start mb-4 p-3 bg-light rounded-3 border">
        <h5 class="fw-semibold">Your Task:</h5>
        <p class="mt-2 fs-5">{{ lesson.prompt }}</p>
      </div>

      <!-- Ô nhập bài -->
      <textarea
        v-model="writingAnswer"
        class="form-control mb-3"
        rows="6"
        placeholder="Write your answer here..."
      ></textarea>

      <!-- Nút Submit -->
      <div class="text-center">
        <button class="btn btn-success px-4 py-2 fw-semibold" @click="submitWriting">
          📤 Submit 
        </button>
      </div>
    </div>

    <!-- 🧩 Còn lại (READING / LISTENING): hiện quiz -->
    <div v-else class="quiz-container mx-auto p-4 shadow-sm rounded-4 bg-white">
      <h3 class="text-center fw-bold mb-4 text-primary">Mini Quiz</h3>
      <form id="quizForm">
        <div
          v-for="(q, i) in currentQuiz"
          :key="i"
          class="quiz-question mb-5 text-start"
        >
          <p class="fw-semibold fs-5 mb-3">
            {{ i + 1 }}. {{ q.question }}
          </p>

          <!-- Lặp qua các lựa chọn -->
          <div
            v-for="(opt, j) in q.options"
            :key="j"
            class="form-check mb-2 ps-4"
          >
            <input
              class="form-check-input"
              type="radio"
              :name="'q' + i"
              :id="'q' + i + opt.label"
              :value="opt.label"
              v-model="userAnswers[i]"
            />
            <label
              class="form-check-label fs-6"
              :for="'q' + i + opt.label"
            >
              <strong>{{ opt.label }}.</strong> {{ opt.text }}
            </label>
          </div>
        </div>

        <!-- Nút Gửi -->
        <div class="text-center mt-4">
          <button
            class="btn btn-primary px-4 py-2 fw-semibold"
            @click.prevent="submitQuiz"
          >
            Gửi
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
/* ===================================
   🧠 LOGIC COMPONENT
=================================== */

import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import readingQuiz from "../data/readingQuiz.json";
import listeningQuiz from "../data/listeningQuiz.json";

// Lấy route hiện tại để xác định slug (READING / LISTENING / SPEAKING / WRITING)
const route = useRoute();

// Nhận props từ component cha (truyền xuống là lesson hiện tại)
const props = defineProps({
  lesson: Object,
});

// --- Hiển thị tiêu đề TOEIC ---
const displaySlug = computed(() => {
  const s = route.params.slug || "";
  return s.toUpperCase();
});

// --- Quiz: danh sách câu hỏi & câu trả lời ---
const currentQuiz = ref([]);
const userAnswers = ref([]);
const score = ref(null);

// --- Load quiz theo bài học ---
const loadQuiz = () => {
  if (!props.lesson) return;
  const slug = route.params.slug;
  const lessonId = props.lesson.id;

  const quizData = slug === "reading" ? readingQuiz : listeningQuiz;
  currentQuiz.value = quizData[lessonId] || [];
  userAnswers.value = Array(currentQuiz.value.length).fill(null);
  score.value = null;
};

// --- Khi component mount hoặc thay đổi bài học ---
onMounted(() => loadQuiz());
watch(() => props.lesson, () => loadQuiz(), { deep: true });

// --- Nút gửi quiz ---
function submitQuiz() {
  let correct = 0;
  currentQuiz.value.forEach((q, i) => {
    if (userAnswers.value[i] === q.correct) correct++;
  });
  score.value = correct;
  alert(`Bạn đúng ${correct}/${currentQuiz.value.length} câu!`);
}

/* 🎙️ PHẦN SPEAKING - GHI ÂM */
const isRecording = ref(false);
const audioUrl = ref(null);
let mediaRecorder;
let audioChunks = [];
let audioBlob = null;

// 🎙 Bắt đầu ghi âm
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      const wavBlob = await convertToWav(blob);
      audioBlob = wavBlob;
      audioUrl.value = URL.createObjectURL(wavBlob);
    };

    mediaRecorder.start();
    isRecording.value = true;
  } catch (err) {
    alert("⚠️ Không thể truy cập micro!");
    console.error(err);
  }
};

// ⏹ Dừng ghi âm
const stopRecording = () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
  isRecording.value = false;
};

// 🎛 Toggle giữa start và stop
const toggleRecording = () => {
  if (isRecording.value) stopRecording();
  else startRecording();
};

// 🔊 Chuyển WebM -> WAV
async function convertToWav(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const audioCtx = new AudioContext();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return bufferToWave(audioBuffer);
}

// 🧠 Hàm chuyển AudioBuffer -> WAV thật
function bufferToWave(abuffer) {
  return new Promise((resolve) => {
    const numOfChan = abuffer.numberOfChannels;
    const length = abuffer.length * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    const channels = [];
    let sample, offset = 0, pos = 0;

    const writeUTFBytes = (view, offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    // Header WAV
    writeUTFBytes(view, pos, "RIFF"); pos += 4;
    view.setUint32(pos, 36 + abuffer.length * 2, true); pos += 4;
    writeUTFBytes(view, pos, "WAVE"); pos += 4;
    writeUTFBytes(view, pos, "fmt "); pos += 4;
    view.setUint32(pos, 16, true); pos += 4;
    view.setUint16(pos, 1, true); pos += 2;
    view.setUint16(pos, numOfChan, true); pos += 2;
    view.setUint32(pos, abuffer.sampleRate, true); pos += 4;
    view.setUint32(pos, abuffer.sampleRate * 2 * numOfChan, true); pos += 4;
    view.setUint16(pos, numOfChan * 2, true); pos += 2;
    view.setUint16(pos, 16, true); pos += 2;
    writeUTFBytes(view, pos, "data"); pos += 4;
    view.setUint32(pos, abuffer.length * 2, true); pos += 4;

    for (let i = 0; i < numOfChan; i++) channels.push(abuffer.getChannelData(i));

    while (pos < length) {
      for (let i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        view.setInt16(pos, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        pos += 2;
      }
      offset++;
    }

    resolve(new Blob([buffer], { type: "audio/wav" }));
  });
}

// 🚀 Gửi file lên Flask
const submitRecording = async () => {
  if (!audioBlob) {
    alert("🎧 Chưa có bản ghi âm!");
    return;
  }

  const formData = new FormData();
  formData.append("audio", audioBlob, "record.wav");
formData.append("reference", props.lesson.prompt);

  try {
    const res = await fetch("http://127.0.0.1:5000/api/speaking", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Kết quả:", data);

    if (data.error) {
      alert("❌ " + data.error);
    } else {
      alert(`📜 Transcript: ${data.transcript}\n✅ ${data.result}\n⭐ Điểm: ${data.score}/10`);
    }
  } catch (err) {
    console.error("Lỗi khi gửi file:", err);
    alert("🚫 Không thể gửi file đến server!");
  }
};

/* ✏️ PHẦN WRITING */
const writingAnswer = ref("");

async function submitWriting() {
  if (!writingAnswer.value.trim()) {
    alert("✏️ Please write your answer before submitting!");
    return;
  }

  const formData = new FormData();
  formData.append("answer", writingAnswer.value);
  formData.append("topic", props.lesson.id || "essay1");

  try {
    const res = await fetch("http://127.0.0.1:5000/api/writing", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.error) {
      alert("❌ " + data.error);
    } else {
      alert(`📖 ${data.result}\n⭐ Score: ${data.score}/10`);
    }
  } catch (err) {
    console.error("Lỗi gửi bài writing:", err);
    alert("🚫 Không thể gửi bài viết!");
  }
}

</script>

<style scoped>
/* ====== Quiz chung ====== */
.quiz-container {
  max-width: 650px;
  background-color: #ffffff;
  border: 1px solid #eaeaea;
}

.quiz-question {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 15px;
}

.quiz-question:last-child {
  border-bottom: none;
}

.form-check-input {
  transform: scale(1.2);
  margin-top: 0.35rem;
}

.form-check-label {
  cursor: pointer;
  transition: color 0.2s ease;
}

.form-check-label:hover {
  color: #0d6efd;
}

.btn-primary {
  border-radius: 10px;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  transform: scale(1.03);
}

/* ====== Speaking ====== */
.record-section {
  max-width: 650px;
  background-color: #ffffff;
  border: 1px solid #eaeaea;
}

.record-section button {
  min-width: 150px;
}

/* ====== Writing ====== */
.writing-section {
  max-width: 650px;
  background-color: #ffffff;
  border: 1px solid #eaeaea;
}

.writing-section textarea {
  font-size: 1rem;
  padding: 12px;
  resize: vertical;
}

/* 🎥 VIDEO STYLING */
.video-wrapper {
  position: relative;
  padding-top: 56.25%; /* 16:9 ratio */
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: #000;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 16px;
}

/* Hiệu ứng khi hover video */
.video-wrapper:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
}

/* Nếu muốn thêm border sáng nhẹ */
.video-wrapper::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  pointer-events: none;
}

</style>

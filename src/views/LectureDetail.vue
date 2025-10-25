<template>
  <!-- 🧩 PHẦN NỘI DUNG CHÍNH -->
  <div id="content" class="py-5">
    <div class="container-fluid">
      <div class="row">
        <!-- 🧠 1️⃣ DANH SÁCH BÀI HỌC (LessonList.vue)
             - Hiển thị tất cả bài học thuộc khóa hiện tại
             - Khi click chọn bài, phát ra event selectLesson -->
        <LessonList
          :lessons="lessons"
          :courseId="slugType"
          @selectLesson="handleSelectLesson"
        />

        <!-- 📚 2️⃣ NỘI DUNG BÀI HỌC (LessonContent.vue)
             - Hiển thị nội dung chi tiết bài đang chọn -->
        <LessonContent :lesson="selectedLesson" />
      </div>
    </div>
  </div>
</template>

<script setup>
/* 
===========================================
🎯 LOGIC CHÍNH CHO TRANG HỌC
- Lấy danh sách bài học theo khóa (reading, listening, speaking, writing)
- Theo dõi route để tải đúng file JSON
- Hiển thị danh sách + nội dung bài học
===========================================
*/

import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import LessonList from "../components/LessonList.vue";
import LessonContent from "../components/LessonContent.vue";
import { useCourseStore } from "../stores/courseStore.js";

/* 🔹 Biến trạng thái */
const route = useRoute();              // Lấy thông tin từ URL
const lessons = ref([]);               // Danh sách bài học
const selectedLesson = ref(null);      // Bài học đang được chọn
const courseStore = useCourseStore();


// Xác định loại khóa học từ slug
const slugType = ref(route.params.slug || "");

// Khi user chọn bài
const handleSelectLesson = (lesson, index) => {
  if (courseStore.isLessonLocked(index, slugType.value)) {
    alert("🔒 Bạn cần đăng nhập và mua khóa học để xem bài này!");
    return;
  }
  selectedLesson.value = lesson;
};

/* 
-------------------------------------------
🔸 HÀM loadLessons()
- Xác định khóa học từ slug (vd: reading)
- Load file JSON tương ứng (readingLesson.json, ...)
- Tìm bài học theo id (nếu có trong URL)
-------------------------------------------
*/
async function loadLessons() {
  const slug = route.params.slug;           // reading, listening, speaking, writing
  const lessonId = Number(route.params.id); // id bài học trong URL

  try {
    // 📂 Import file JSON theo loại khóa học
    const module = await import(`../data/${slug}Lesson.json`);
    lessons.value = module.default;

    // ✅ Chọn bài theo id, nếu không có thì chọn bài đầu tiên
    selectedLesson.value =
      lessons.value.find((l) => l.id === lessonId) || lessons.value[0];
  } catch (err) {
    console.error(`❌ Không tìm thấy dữ liệu cho slug: ${slug}`, err);
    lessons.value = [];
    selectedLesson.value = null;
  }
}

/* 
-------------------------------------------
🚀 KHI COMPONENT MOUNT
- Gọi loadLessons() lần đầu tiên
-------------------------------------------
*/
onMounted(loadLessons);

/* 
-------------------------------------------
👀 THEO DÕI ROUTE THAY ĐỔI
- Nếu user chuyển từ khóa reading → writing
  thì tự động load lại bài học
-------------------------------------------
*/
watch(() => route.fullPath, loadLessons);
</script>

<style scoped>
/* 🎨 STYLE RIÊNG CHO TRANG BÀI HỌC (nếu cần thêm sau) */
</style>

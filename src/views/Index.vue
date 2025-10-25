<template>
  <!-- 🌟 HERO SECTION (Phần mở đầu trang chủ)
       → Giới thiệu ngắn gọn về khóa học TOEIC
       → Gồm tiêu đề, tên giảng viên, nút CTA và ảnh minh họa -->
  <section class="hero-section text-white d-flex align-items-center">
    <div class="container">
      <div class="row align-items-center">

        <!-- 🧠 1️⃣ PHẦN TEXT GIỚI THIỆU -->
        <div
          class="col-md-6 text-center text-md-start mb-4 mb-md-0"
          style="position: relative; z-index: 1;"
        >
          <!-- Tiêu đề chính -->
          <h1 class="fw-bold display-4 mb-3 hero-title">
            Học TOEIC<br />cùng chuyên gia
          </h1>

          <!-- Tên giảng viên -->
          <h3 class="fw-semibold mb-4 hero-subtitle">Hoàng Bích Diệp</h3>

          <!-- Nút điều hướng đến trang khóa học -->
          <router-link
            to="/courses"
            class="btn btn-cta fw-semibold px-5 py-3 rounded-pill shadow-lg"
          >
            Xem các khoá học đang mở
            <i class="fa-solid fa-arrow-right ms-2"></i>
          </router-link>
        </div>

        <!-- 🖼️ 2️⃣ PHẦN ẢNH GIẢNG VIÊN -->
        <div
          class="col-md-6 text-center hero-image-wrapper"
          style="position: relative; z-index: 1;"
        >
          <img
            src="/src/assets/images/teacher2.jpg"
            alt="Hoàng Bích Diệp"
            class="hero-image"
          />
        </div>
      </div>
    </div>

    <!-- 🌫️ 3️⃣ LỚP OVERLAY MỜ (tạo chiều sâu cho nền gradient) -->
    <div class="hero-overlay"></div>
  </section>
</template>

<script>
/*
===========================================
🎯 COMPONENT: HeroSection
- Hiển thị banner chính đầu trang
- Giới thiệu về khóa học & giảng viên
- Có hiệu ứng chuyển động và nút CTA
===========================================
*/
export default {
  name: "HeroSection",
};
</script>

<style scoped>
/* ===========================================
🎨 PHẦN STYLE - Trang trí Hero Section
=========================================== */

/* 🌈 NỀN GRADIENT + OVERLAY */
.hero-section {
  position: relative;
  padding: 6rem 0;
  background: linear-gradient(135deg, #57d061, #0d6efd); /* xanh lá + xanh dương */
  overflow: hidden;
}

/* 🌫️ Lớp phủ mờ phía trên nền */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 0;
}

/* ✨ HIỆU ỨNG CHỮ HIỆN DẦN */
.hero-title {
  animation: fadeInDown 1s ease forwards;
}
.hero-subtitle {
  animation: fadeInDown 1.2s ease forwards;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 🪶 HIỆU ỨNG ẢNH NỔI NHẸ */
.hero-image-wrapper {
  animation: float 4s ease-in-out infinite;
}
.hero-image {
  max-width: 100%;
  border-radius: 1rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* 🟢 NÚT CTA (Call to Action) */
.btn-cta {
  color: #fff;
  background: #57d061;
  border: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}
.btn-cta:hover {
  background: #45b74a;
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}
</style>

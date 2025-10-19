<template>
  <!-- HERO CONTENT -->
  <section class="hero-section text-white d-flex align-items-center">
    <div class="container">
      <div class="row align-items-center">
        <!-- Text -->
        <div class="col-md-6 text-center text-md-start mb-4 mb-md-0" style="position: relative; z-index: 1;">
          <h1 class="fw-bold display-4 mb-3 hero-title">
            Học TOEIC<br>cùng chuyên gia
          </h1>
          <h3 class="fw-semibold mb-4 hero-subtitle">Hoàng Bích Diệp</h3>
          <router-link
            to="/courses"
            class="btn btn-cta fw-semibold px-5 py-3 rounded-pill shadow-lg"
          >
            Xem các khoá học đang mở
            <i class="fa-solid fa-arrow-right ms-2"></i>
          </router-link>
        </div>

        <!-- Image -->
        <div class="col-md-6 text-center hero-image-wrapper" style="position: relative; z-index: 1;">
          <img
            src="/src/assets/images/teacher2.jpg"
            alt="Hoàng Bích Diệp"
            class="hero-image"
          />
        </div>
      </div>
    </div>

    <!-- Overlay mờ -->
    <div class="hero-overlay"></div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style scoped>
/* Background gradient + overlay */
.hero-section {
  position: relative;
  padding: 6rem 0;
  background: linear-gradient(135deg, #57d061, #0d6efd);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25); /* overlay mờ tối */
  z-index: 0;
}

/* Text animations */
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

/* Image float + shadow */
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

/* CTA button */
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
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}
</style>

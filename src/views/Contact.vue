<template>
  <!-- ========================= -->
  <!-- 🔹 PHẦN SLIDER (TIÊU ĐỀ TRANG) -->
  <!-- ========================= -->
  <div
    id="slider"
    class="slider-section text-white text-center position-relative overflow-hidden"
  >
    <div class="container py-5">
      <!-- Tiêu đề chính -->
      <h1 class="fw-bold display-5 mb-3">{{ $t('contactTitle') }}</h1>

      <!-- Breadcrumb: Hiển thị đường dẫn điều hướng -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb justify-content-center mb-0">
          <li class="breadcrumb-item">
            <!-- Link quay lại trang chủ -->
            <router-link
              to="/"
              class="text-decoration-none text-white-50"
            >
              {{ $t('home') }}
            </router-link>
          </li>
          <li
            class="breadcrumb-item active text-white"
            aria-current="page"
          >
            {{ $t('contactTitle') }}
          </li>
        </ol>
      </nav>
    </div>

    <!-- ========================= -->
    <!-- 🔹 CÁC HÌNH TRANG TRÍ (SHAPES) -->
    <!-- ========================= -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
  </div>

  <!-- ========================= -->
  <!-- 🔹 PHẦN NỘI DUNG CHÍNH -->
  <!-- ========================= -->
  <div id="content">
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row justify-content-center align-items-start">
          
          <!-- ========================= -->
          <!-- 🔸 CỘT BÊN TRÁI: THÔNG TIN LIÊN HỆ -->
          <!-- ========================= -->
          <div class="col-md-5 mb-4 mb-md-0">
            <!-- Tiêu đề phụ -->
            <h3 class="fw-bold mb-3">
              {{ $t('alwaysHeardFromYou') }}
            </h3>

            <!-- Email -->
            <h5 class="fw-semibold">{{ $t('email') }}</h5>
            <p>
              <a
                href="mailto:hbdiep04@gmail.com"
                class="text-decoration-none text-primary"
              >
                {{ $t('email') }}
              </a>
            </p>

            <!-- Điện thoại -->
            <h5 class="fw-semibold mt-3">{{ $t('phone') }}</h5>
            <p>
              <a
                href="tel:+0328695050"
                class="text-decoration-none text-dark"
              >
                +0987 654 321
              </a>
            </p>

            <!-- Icon mạng xã hội -->
            <div class="d-flex gap-3 mt-4">
              <a href="#" class="text-dark fs-4"><i class="bi bi-facebook"></i></a>
              <a href="#" class="text-dark fs-4"><i class="bi bi-twitter"></i></a>
              <a href="#" class="text-dark fs-4"><i class="bi bi-linkedin"></i></a>
              <a href="#" class="text-dark fs-4"><i class="bi bi-share"></i></a>
            </div>
          </div>

          <!-- ========================= -->
          <!-- 🔸 CỘT BÊN PHẢI: GOOGLE MAP -->
          <!-- ========================= -->
          <div class="col-md-6">
            <div class="card shadow-sm border-0">
              <div class="card-body p-0">
                <div class="ratio ratio-16x9">
                  <!-- Bản đồ Google nhúng -->
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.3011426867224!2d105.78657997471312!3d20.980562389433313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ade83ba9e115%3A0x6f4fdb5e1e9e39ed!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaeG6v24gdHLDumMgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1760168013531!5m2!1svi!2s"
                    width="600"
                    height="450"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <!-- ========================= -->
          <!-- 🔸 KẾT THÚC CỘT BẢN ĐỒ -->
          <!-- ========================= -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// ===============================
// 🔸 SCRIPT SETUP THÀNH PHẦN CONTACT PAGE
// - Chỉ định tên component: "Contact"
// - Không có logic động vì đây là trang tĩnh
// ===============================
export default {
  name: "Contact",
};
</script>

<style scoped>
/* =============================== */
/* 🎨 CSS CHO TRANG LIÊN HỆ (Contact.vue) */
/* =============================== */

/* PHẦN SLIDER ĐẦU TRANG */
.slider-section {
  background: linear-gradient(135deg, #0d6efd, #57d061); /* Nền chuyển màu xanh */
  position: relative;
  padding: 5rem 0;
}

/* CÁC HÌNH TRANG TRÍ (Shapes) */
.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.2;
}

/* Hình số 1 (màu trắng, góc trái) */
.shape-1 {
  width: 150px;
  height: 150px;
  background: #fff;
  top: 10%;
  left: -5%;
}

/* Hình số 2 (màu vàng, góc phải dưới) */
.shape-2 {
  width: 100px;
  height: 100px;
  background: #ffc107;
  bottom: 15%;
  right: 10%;
}

/* Hình số 3 (màu xanh lá, góc phải giữa) */
.shape-3 {
  width: 200px;
  height: 200px;
  background: #198754;
  top: 30%;
  right: -5%;
}
</style>

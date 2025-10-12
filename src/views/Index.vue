<template>
    <!-- CONTENT -->
    <div id="content">
        <!-- CONTENT SECTION -->
        <section class="content-section text-white d-flex align-items-center">
            <div class="container">
                <div class="row align-items-center">
                    <!-- Text -->
                    <div class="col-md-6 text-center text-md-start mb-4 mb-md-0">
                        <h1 class="fw-bold display-5">Học IELTS<br>cùng chuyên gia</h1>
                        <h3 class="fw-semibold mb-4">Hoàng Bích Diệp</h3>
                        <router-link
                        to="/courses"
                        class="btn btn-light fw-semibold px-4 py-2 rounded-pill"
                        >
                        Xem các khoá học đang mở <i class="fa-solid fa-arrow-right ms-2"></i>
                        </router-link>
                    </div>
                    <!-- Image -->
                    <div class="col-md-6 text-center">
                        <div class="content-image-wrapper">
                            <img src="" alt="Hoàng Bích Diệp" class="image">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: "Index"
}
</script>

<style scoped>
.content-section {
  padding: 5rem 0;
  background-color: #6c63ff; /* ví dụ màu nền */
}
.image {
  max-width: 100%;
  border-radius: 0.5rem;
}
</style>


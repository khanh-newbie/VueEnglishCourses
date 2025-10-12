<template>
  <!-- SLIDER -->
    <div id="slider" class="slider-section text-white text-center position-relative overflow-hidden">
        <div class="container py-5">
            <h1 class="fw-bold display-5 mb-3">Liên hệ chúng tôi</h1>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item">
                        <a href="#" class="text-decoration-none text-white-50">Trang chủ</a>
                    </li>
                    <li class="breadcrumb-item active text-white" aria-current="page">Liên hệ chúng tôi</li>
                </ol>
            </nav>
        </div>

        <!-- Shapes trang trí -->
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
    </div>

    <!-- CONTENT -->
    <div id="content">
        <section class="py-5 bg-light">
            <div class="container">
                <div class="row justify-content-center align-items-start">
                
                    <div class="col-md-5 mb-4 mb-md-0">
                        <h3 class="fw-bold mb-3">Chúng tôi luôn mong muốn <br> được nghe từ bạn!</h3>
                        
                        <h5 class="fw-semibold">Email</h5>
                        <p><a href="mailto:hbdiep04@gmail.com" 
                            class="text-decoration-none text-primary">
                            hbdiep04@gmail.com
                        </a></p>
                        <h5 class="fw-semibold mt-3">Điện thoại</h5>
                        <p><a href="tel:+0328695050" class="text-decoration-none text-dark">+0987 654 321</a></p>
                        
                        <div class="d-flex gap-3 mt-4">
                        <a href="#" class="text-dark fs-4"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="text-dark fs-4"><i class="bi bi-twitter"></i></a>
                        <a href="#" class="text-dark fs-4"><i class="bi bi-linkedin"></i></a>
                        <a href="#" class="text-dark fs-4"><i class="bi bi-share"></i></a>
                        </div>
                    </div>
                
                    <div class="col-md-6">
                        <div class="card shadow-sm border-0">
                        <div class="card-body p-0">
                            <div class="ratio ratio-16x9">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.3011426867224!2d105.78657997471312!3d20.980562389433313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ade83ba9e115%3A0x6f4fdb5e1e9e39ed!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaeG6v24gdHLDumMgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1760168013531!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                        </div>
                    </div>
                
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: "Contact"
}
</script>

<style scoped>
/* CSS riêng màn Course */
</style>

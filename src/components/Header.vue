<template>
    <!-- HEADER -->
    <div id="header" class="bg-light shadow-sm py-3">
        <div class="container">
            <div class="row align-items-center">
                <!-- Logo -->
                <div class="col-md-3 col-6">
                    <a href="#" class="d-flex align-items-center text-decoration-none">
                        <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
                        alt="Logo"
                        height="40"
                        class="me-2"
                        />
                        <span class="fw-bold text-dark">English Center</span>
                    </a>
                </div>

                <!-- Menu -->
                <div class="col-md-6 d-none d-md-block">
                    <ul class="nav justify-content-center">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Trang chủ</router-link>
                        </li>

                        <li class="nav-item dropdown d-flex align-items-center">
                        <router-link class="nav-link" to="/courses">Khóa học</router-link>

                        <a
                            class="nav-link dropdown-toggle dropdown-toggle-split"
                            href="#"
                            id="courseDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span class="visually-hidden">Toggle Dropdown</span>
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="courseDropdown">
                            <li>
                            <router-link class="dropdown-item" to="/courseDetail">Reading</router-link>
                            </li>
                            <li>
                            <router-link class="dropdown-item" to="/courseDetail">Listening</router-link>
                            </li>
                        </ul>
                        </li>

                        <li class="nav-item">
                            <router-link class="nav-link" to="/contact">Liên hệ</router-link>
                        </li>
                    </ul>
                </div>

                <!-- Cart icon -->
                <div class="col-md-3 col-6 text-end">
                    <a href="#" class="position-relative text-dark fs-5">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">2</span>
                    </a>
                </div>               
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>
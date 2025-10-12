<template>
    <!-- CONTENT -->
    <div id="content" class="py-5">
        <div class="container-fluid">
            <div class="row">
                <!-- CỘT TRÁI: DANH SÁCH LESSON -->
                <div class="col-md-3 border-end" style="min-height: 100vh;">
                    <!-- Ô tìm kiếm -->
                    <div class="p-3 border-bottom">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Search for course content"
                        />
                    </div>

                    <!-- Danh sách bài học -->
                    <div class="list-group list-group-flush">
                        <a href="lesson.html?lesson=1" class="list-group-item list-group-item-action">
                            <strong>Lesson 1</strong><br>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo deleniti eligendi quod qui illum veritatis animi quo tempore commodi possimus enim accusamus ullam, excepturi quam molestiae numquam ex veniam corporis?
                        </a>
                        <a href="lesson.html?lesson=1" class="list-group-item list-group-item-action">
                            <strong>Lesson 2</strong><br>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo deleniti eligendi quod qui illum veritatis animi quo tempore commodi possimus enim accusamus ullam, excepturi quam molestiae numquam ex veniam corporis?
                        </a>
                        <a href="lesson.html?lesson=1" class="list-group-item list-group-item-action disabled">
                            <strong>Lesson 3 <i class="fa-solid fa-lock float-end"></i></strong><br>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo deleniti eligendi quod qui illum veritatis animi quo tempore commodi possimus enim accusamus ullam, excepturi quam molestiae numquam ex veniam corporis?
                        </a>
                        <a href="lesson.html?lesson=1" class="list-group-item list-group-item-action">
                            <strong>Lesson 4 <i class="fa-solid fa-lock-open float-end"></i> </strong><br>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo deleniti eligendi quod qui illum veritatis animi quo tempore commodi possimus enim accusamus ullam, excepturi quam molestiae numquam ex veniam corporis?
                        </a>
                    </div>
                </div>

                <!-- CỘT PHẢI: NỘI DUNG BÀI HỌC -->
                <div class="col-md-9 px-5">
                    <h3 class="fw-bold mb-3 mt-3">Tên khóa học</h3>
                    <h5 class="mb-4">Chủ đề bài 1: Giới thiệu & Chiến lược làm bài</h5>

                    <!-- VIDEO -->
                    <div class="ratio ratio-16x9 mb-4">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/CRxXL4iDJ-M?si=nI8a2YPE3UwCe24k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>

                    <!-- MINI QUIZ -->
                    <h5 class="text-center fw-bold mb-4">Mini Quiz</h5>

                    <form id="quizForm">
                        <!-- Câu 1 -->
                        <div class="mb-4">
                            <p class="fw-semibold">Câu 1: What is the main purpose of the video?</p>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q1" id="q1a" value="A">
                                <label class="form-check-label" for="q1a">A. To introduce the IELTS format</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q1" id="q1b" value="B">
                                <label class="form-check-label" for="q1b">B. To explain grammar rules</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q1" id="q1c" value="C">
                                <label class="form-check-label" for="q1c">C. To discuss vocabulary</label>
                            </div>
                        </div>

                        <!-- Câu 2 -->
                        <div class="mb-4">
                            <p class="fw-semibold">Câu 2: How many sections are in the IELTS Listening test?</p>
                                <div class="form-check">
                                <input class="form-check-input" type="radio" name="q2" id="q2a" value="A">
                                <label class="form-check-label" for="q2a">A. Two</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q2" id="q2b" value="B">
                                <label class="form-check-label" for="q2b">B. Three</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q2" id="q2c" value="C">
                                <label class="form-check-label" for="q2c">C. Four</label>
                            </div>
                        </div>

                        <!-- Câu 3 -->
                        <div class="mb-4">
                            <p class="fw-semibold">Câu 3: What should you do before listening?</p>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q3" id="q3a" value="A">
                                <label class="form-check-label" for="q3a">A. Read the questions carefully</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q3" id="q3b" value="B">
                                <label class="form-check-label" for="q3b">B. Skip the instructions</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q3" id="q3c" value="C">
                                <label class="form-check-label" for="q3c">C. Focus only on keywords</label>
                            </div>
                        </div>

                        <!-- Nút gửi -->
                        <div class="text-end mb-5">
                            <button type="submit" class="btn btn-primary px-4">Gửi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "LectureDetail"
}
</script>
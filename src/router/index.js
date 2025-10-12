import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Course from '../views/Course.vue'
import CourseDetail from '../views/CourseDetail.vue'
import Contact from '../views/Contact.vue'
import LectureDetail from '../views/LectureDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Index },
  { path: '/courses', name: 'Courses', component: Course },
  { path: '/courseDetail', name: 'CourseDetail', component: CourseDetail},
  { path: '/contact', name: 'Contact', component: Contact},
  { path: '/lectureDetail', name: 'LectureDetail', component: LectureDetail},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

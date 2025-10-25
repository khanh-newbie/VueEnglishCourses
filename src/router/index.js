import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Course from '../views/Courses.vue'
import CourseDetail from '../views/CourseDetail.vue'
import Contact from '../views/Contact.vue'
import LectureDetail from '../views/LectureDetail.vue'
import OrderHistory from '../views/OrderHistory.vue'

const routes = [
  { path: '/', name: 'Home', component: Index },
  { path: '/courses', name: 'Courses', component: Course },
  // { path: '/courseDetail', name: 'CourseDetail', component: CourseDetail},
  {
    path: '/courses/:slug',
    name: 'CourseDetail',
    component: CourseDetail,
    props: true 
  },
  { path: '/contact', name: 'Contact', component: Contact},
    {
    path: '/lecture/:slug/:id',
    name: 'LectureDetail',
    component: LectureDetail,
    props: true
  },
  { path: '/orders', 
    name: 'OrderHistory', 
    component: OrderHistory,
    props: true
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

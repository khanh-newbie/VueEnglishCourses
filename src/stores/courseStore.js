import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useUserStore } from './userStore.js'

export const useCourseStore = defineStore('course', () => {
  const userStore = useUserStore()
  const freeLessons = 2

  const purchasedCourses = computed(() => userStore.user?.purchasedCourses || [])

  const isLessonLocked = (lessonIndex, courseId) => {
    const loggedIn = !!userStore.user
    const hasPurchased = purchasedCourses.value.includes(String(courseId))
    return (!loggedIn || !hasPurchased) && lessonIndex >= freeLessons
  }

  return { isLessonLocked, freeLessons }
})

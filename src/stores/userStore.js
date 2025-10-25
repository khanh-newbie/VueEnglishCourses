// src/stores/userStore.js
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('currentUser') || 'null'))
  const users = ref(JSON.parse(localStorage.getItem('users') || '[]'))

  // --- Tự động lưu local ---
  watch(user, (val) => {
    if (val) localStorage.setItem('currentUser', JSON.stringify(val))
    else localStorage.removeItem('currentUser')
  }, { deep: true })

  watch(users, (val) => {
    localStorage.setItem('users', JSON.stringify(val))
  }, { deep: true })

  // --- Hành động ---
  const signup = (name, email, password) => {
    const exists = users.value.some(u => u.email === email)
    if (exists) return false

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      avatar: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
      purchasedCourses: []
    }
    users.value.push(newUser)
    user.value = newUser
    return true
  }

  const login = (email, password) => {
    const found = users.value.find(u => u.email === email && u.password === password)
    if (!found) return false
    user.value = found
    return true
  }

  const logout = () => {
    user.value = null
  }

  // ✅ Thêm: khi mua khoá học
  const purchaseCourse = (courseSlug) => {
    if (!user.value) return
    if (!user.value.purchasedCourses) user.value.purchasedCourses = []

    if (!user.value.purchasedCourses.includes(courseSlug)) {
      user.value.purchasedCourses.push(courseSlug)
    }

    // đồng bộ với danh sách users
    const index = users.value.findIndex(u => u.id === user.value.id)
    if (index !== -1) {
      users.value[index] = user.value
    }

    localStorage.setItem('users', JSON.stringify(users.value))
    localStorage.setItem('currentUser', JSON.stringify(user.value))
  }

  // ✅ Kiểm tra user đã mua khóa chưa
  const hasPurchased = (courseSlug) => {
    return user.value?.purchasedCourses?.includes(courseSlug)
  }


  return { user, users, signup, login, logout, purchaseCourse, hasPurchased }
})

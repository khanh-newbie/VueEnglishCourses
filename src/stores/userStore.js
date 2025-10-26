// src/stores/userStore.js
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useNotificationStore } from './notificationStore.js'

export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('currentUser') || 'null'))
  const users = ref(JSON.parse(localStorage.getItem('users') || '[]'))

  const notify = useNotificationStore()

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
    if (exists) {
      notify.show('Email này đã được đăng ký!', 'error')
      return false
    }
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

    notify.show('🎉 Đăng ký thành công!', 'success')
    return true
  }

  const login = (email, password) => {
    const found = users.value.find(u => u.email === email && u.password === password)
    if (!found) 
    {
      notify.show('Sai email hoặc mật khẩu!', 'error')
      return false
    }
      user.value = found
      notify.show(`Xin chào ${found.name}! 👋`, 'success')
    return true
  }

  const logout = () => {
    user.value = null
    notify.show('Bạn đã đăng xuất thành công 👋', 'info')
  }

  // ✅ Thêm: khi mua khoá học
  const purchaseCourse = (courseSlug) => {
    if (!user.value) {
      notify.show('Vui lòng đăng nhập để mua khoá học!', 'error')
      return
    }

    if (!user.value.purchasedCourses) user.value.purchasedCourses = []

    if (!user.value.purchasedCourses.includes(courseSlug)) {
      user.value.purchasedCourses.push(courseSlug)
      notify.show('🎉 Mua khoá học thành công!', 'success')
    } else {
      notify.show('Bạn đã sở hữu khoá học này rồi!', 'info')
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

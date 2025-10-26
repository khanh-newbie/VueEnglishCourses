import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('users')) || [], // Danh sách người dùng
    user: JSON.parse(localStorage.getItem('user')) || null  // Người dùng hiện tại
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    username: (state) => state.user?.name || ''
  },

  actions: {
    // 🟢 Đăng ký người dùng mới
    signup({ name, email, password }) {
      const exists = this.users.some(u => u.email === email)
      if (exists) return { ok: false, message: 'Email này đã được đăng ký!' }

      const newUser = { name, email, password }
      this.users.push(newUser)
      localStorage.setItem('users', JSON.stringify(this.users))

      // ✅ Tự động đăng nhập sau khi đăng ký
      this.user = newUser
      localStorage.setItem('user', JSON.stringify(newUser))
      return { ok: true, message: 'Đăng ký thành công!' }
    },

    // 🔵 Đăng nhập
    login({ email, password }) {
      const found = this.users.find(u => u.email === email && u.password === password)
      if (!found) return { ok: false, message: 'Sai email hoặc mật khẩu!' }

      this.user = found
      localStorage.setItem('user', JSON.stringify(found))
      return { ok: true, message: 'Đăng nhập thành công!' }
    },

    // 🔴 Đăng xuất
    logout() {
      this.user = null
      localStorage.removeItem('user')
    }
  }
})

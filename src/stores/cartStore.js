import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart') || '[]')
  }),
  getters: {
    totalPrice: (state) => state.cart.reduce((sum, item) => {
      return sum + Number(item.price.replace(/\./g, '').replace(' ₫', ''))
    }, 0).toLocaleString()
  },
  actions: {
    addToCart(course) {
      if (!this.cart.find(c => c.id === course.id)) {
        this.cart.push(course)
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter(c => c.id !== id)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    clearCart() {
      this.cart = []
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
  }
})
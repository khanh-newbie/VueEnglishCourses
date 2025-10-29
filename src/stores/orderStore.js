import { defineStore } from 'pinia'

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orders: [],
    purchasedIds: [],
    initialized: false,
  }),

  actions: {
    init() {
      if (this.initialized) return
      this.initialized = true
      const storedOrders = localStorage.getItem('orders')
      const storedIds = localStorage.getItem('purchasedIds')

      if (storedOrders) this.orders = JSON.parse(storedOrders)
      if (storedIds) this.purchasedIds = JSON.parse(storedIds)
    },

    addOrder(order) {
      if (this.orders.some(o => o.id === order.id)) return;
      this.orders.push(order)

      // Lưu danh sách ID đã mua
      order.items.forEach(item => {
        if (!this.purchasedIds.includes(item.id)) {
          this.purchasedIds.push(item.id)
        }
      })

      // Lưu vào localStorage
      localStorage.setItem('orders', JSON.stringify(this.orders))
      localStorage.setItem('purchasedIds', JSON.stringify(this.purchasedIds))
    },

    hasPurchased(id) {
      return this.purchasedIds.includes(id)
    },

    getUserOrders(email) {
      return this.orders.filter(o => o.userEmail === email)
    }
  }
})

<template>
  <div class="container py-5" ref="invoiceRef">
    <!-- Nút xuất PDF ở góc trên bên phải
    <button
      class="btn btn-primary position-absolute end-0 mt-0 me-20 no-print"
      @click="exportPDF"
    >
      🖨️ {{ $t('ExportPDF') }}
    </button> -->

    <h3 class="mb-4">📜 {{ $t('OrderHistory') }}</h3>

    <div v-if="userOrders.length === 0" class="text-muted">
      {{ $t('NoPay') }}
    </div>

    <div v-else>
      <div
        v-for="order in userOrders"
        :key="order.id"
        class="card mb-3 p-3 shadow-sm border-0"
      >
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <div><strong>{{ $t('InvoiceCode') }}:</strong> {{ order.id }}</div>
            <div><strong>{{ $t('ExportExcel') }}:</strong> {{ new Date(order.createdAt).toLocaleString() }}</div>
            <div><strong>{{ $t('PaymentMethod') }}:</strong> {{ order.method || 'Thanh toán trực tiếp' }}</div>
          </div>
          <div class="text-end">
            <strong class="text-danger">{{ order.total }} ₫</strong>
          </div>
        </div>

        <ul class="mt-2 mb-0 small text-muted">
          <li v-for="it in order.items" :key="it.id">
            {{ it.name || it.title }} ({{ it.price || '0 ₫' }})
          </li>
        </ul>

        <!-- Nút xuất Excel cho từng hóa đơn -->
        <div class="mt-3">
          <button class="btn btn-success" @click="exportExcel(order)">
            📊 {{ $t('ExportExcel') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOrderStore } from '../stores/orderStore.js'
import { useUserStore } from '../stores/userStore.js'

// import html2pdf from 'html2pdf.js'
import * as XLSX from 'xlsx'

const invoiceRef = ref(null)
const orderStore = useOrderStore()
const userStore = useUserStore()

onMounted(() => {
  orderStore.init()
})

const userOrders = computed(() => {
  if (!userStore.user) return []
  return orderStore.getUserOrders(userStore.user.email)
})

// ===== PDF: Xuất tất cả hóa đơn =====
// function exportPDF() {
//   if (!invoiceRef.value) return

//   const now = new Date()
//   const pad = (n) => n.toString().padStart(2, '0')
//   const formattedDate = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`

//   html2pdf()
//     .set({
//       margin: 10,
//       filename: `HoaDon_${formattedDate}.pdf`,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//     })
//     .from(invoiceRef.value)
//     .save()
// }

// ===== Excel: Xuất từng hóa đơn riêng =====
function exportExcel(order) {
  const data = [
    ['Mã hóa đơn', order.id],
    ['Ngày', new Date(order.createdAt).toLocaleDateString()],
    ['Phương thức', order.method || 'Thanh toán trực tiếp'],
    [],
    ['Tên khóa học', 'Giá']
  ]

  order.items.forEach(it => data.push([it.name || it.title, it.price || 0]))
  data.push([], ['Tổng tiền', order.total])

  const ws = XLSX.utils.aoa_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Hóa đơn')

  const formattedDate = new Date(order.createdAt).toISOString().slice(0,10)
  XLSX.writeFile(wb, `HoaDon_${order.id}_${formattedDate}.xlsx`)
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
}
@media print {
  .no-print {
    display: none !important;
  }
}
</style>

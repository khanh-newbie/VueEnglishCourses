<template>
  <Header ref="header" />          <!-- Cố định -->
  <router-view />     <!-- Đây là content riêng của từng màn -->
  <Notification />
  <Footer />          <!-- Cố định -->

</template>

<script>
  import { ref } from 'vue'
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import Notification from './components/Notification.vue'
  
  const show = ref(false)

  export default {
    components: { Header, Footer, Notification }
  }
</script>

<style scoped>

</style>

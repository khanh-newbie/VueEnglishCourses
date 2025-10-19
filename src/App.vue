<template>
  <Header ref="header" />          <!-- Cố định -->
  <router-view />     <!-- Đây là content riêng của từng màn -->
  <Footer />          <!-- Cố định -->

</template>

<script>
  import { ref } from 'vue'
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  
  const show = ref(false)

  export default {
    components: { Header, Footer }
  }
</script>

<style scoped>

</style>

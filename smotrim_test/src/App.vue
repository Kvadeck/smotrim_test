<script setup lang="ts">
import PCarousel from '@/components/ThePCarousel.vue'
</script>

<template>
  <main class="wrapper">
    <PCarousel />
  </main>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
}
</style>

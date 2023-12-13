<template>
  <div class="body">
    <router-view name="HomePage">
      <HomePage />
    </router-view>
  </div>
</template>

<script setup lang="ts">
import HomePage from './pages/Home/index.vue'
</script>

<style scoped>
.body {
  height: 100%;
}
</style>

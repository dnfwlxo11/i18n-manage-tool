<template>
  <router-view></router-view>
  <!-- <router-view>
    <HomePage />
  </router-view> -->
</template>

<script setup lang="ts">
import HomePage from './pages/Home/index.vue'
</script>

<style lang="scss">
@import url('/fonts/pretendard-subset.css');

body {
  margin: 0;
  font-family: "Pretendard";
}

input[type="date"], textarea, button {
  font-family: "Pretendard";
}

input {
  border: none;

  &:focus {
    outline: none;
  }
}
</style>

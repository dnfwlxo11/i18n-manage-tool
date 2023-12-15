<template>
  <router-view></router-view>
  <!-- <router-view>
    <HomePage />
  </router-view> -->
</template>

<script setup lang="ts">
</script>

<style lang="scss">
@import url('/fonts/pretendard-subset.css');

#app {
  min-width: 800px;
}

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

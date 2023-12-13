<template>
  <div class="badge inline-block rounded-md pt-1 pb-1 pl-3 pr-3 text-sm">
    {{ p_content }}
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const $props = defineProps({
  content: {
    type: String
  }
})

const {
  content: p_content
} = toRefs($props)
</script>

<style lang="scss" scoped>
.badge {
  background: rgba(209, 236, 228, 0.4);
}
</style>


<template>
  <span class="svgicon" :style="{
    width: p_width,
    height: p_height,
    background: p_color,
    'mask-image': `url(${p_src})`,
    '-webkit-mask-image': `url(${p_src})`
  }"/>
</template>

<script setup>
import { toRefs } from 'vue'
const $props = defineProps({
  name: {
    type: String,
    default: 'icon'
  },
  src: {
    type: String,
    default: 'icon'
  },
  width: {
    type: String,
    default: '1.34vw'
  },
  height: {
    type: String,
    default: '1.34vw'
  },
  color: {
    type: String,
    default: 'rgba(0,0,0,1)'
  },
})

const {
  name: p_name,
  src: p_src,
  width: p_width,
  height: p_height,
  color: p_color
} = toRefs($props)
</script>

<style lang="scss" scoped>
.svgicon {
  display: inline-block;
  mask-repeat: no-repeat;
  mask-position: center;
  overflow: hidden;
  mask-size: cover;
}
</style>
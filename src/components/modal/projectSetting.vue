<template>
  <div 
    class="absolute flex left-0 top-0 h-full w-full backdrop-blur-[1px]" 
    @click="$emit('modal:close')"
  >
    <div class="pl-5 pr-5 m-auto w-[70%] h-[300px] bg-white shadow-lg rounded-md">
      <div class="text-2xl pt-2 pb-2 border-solid border-b-2 border-gray-100">
        프로젝트 {{ c_type }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs, defineEmits, defineProps } from 'vue'

const $props = defineProps({
  type: {
    type: String,
    default: 'create'
  }
})

defineEmits([
  'modal:close'
])

const {
  type: p_type
} = toRefs($props)

const c_type = computed(() => {
  switch(p_type.value) {
    case 'create':
      return '생성'
    case 'edit':
      return '수정'
    default:
      return '생성'
  }
})
</script>
<template>
  <div 
    class="absolute flex left-0 top-0 h-full w-full backdrop-brightness-50" 
    @click.self="emit('modalClose')"
  >
    <div class="pl-5 pr-5 m-auto w-[40%] bg-white shadow-lg rounded-md">
      <div class="flex text-2xl pt-2 pb-2 border-solid border-b-2 border-gray-100">
        <span>프로젝트 삭제</span>
        <svgIcon 
          class="mt-auto mb-auto ml-auto hover:cursor-pointer"
          @click="emit('modalClose')"
          src="./svgs/close.svg" 
          width="24px"
          height="24px"
          color="rgba(37, 52, 69, 1)"
        />
      </div>
      <div class="pb-4">
        <div class="flex h-[100px]">
          <div class="m-auto">해당 프로젝트를 정말 지우시겠어요?</div>
        </div>

        <div>
          <button 
            class="w-full bg-rose-600 text-white pt-2 pb-2"
            @click="f_submitModal"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deleteDataById } from '../../composable/db.js'
import { computed, toRefs, ref, watch } from 'vue'
const { ipcRenderer } = require('electron')
import svgIcon from '../../components/basic/svgIcon.vue'

const $props = defineProps({
  data: {
    type: Object,
    default: () => { return {} }
  },
})

const emit = defineEmits([
  'modalClose',
  'modalRemove',
])

const {
  data: p_data,
} = toRefs($props)

const _projectPath = ref()
const _projectName = ref('새 프로젝트')

const f_submitModal = async () => {
  const { _id } = p_data.value

  const res = await deleteDataById(_id)
  console.log(res)

  emit('modalRemove')
}
</script>

<style lang="scss" scoped>
.scroll {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
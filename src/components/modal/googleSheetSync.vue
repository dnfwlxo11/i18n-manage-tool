<template>
  <div 
    class="z-[3] absolute flex left-0 top-0 h-full w-full backdrop-brightness-50" 
    @click.self="emit('modal:close')"
  >
    <div class="pl-5 pr-5 m-auto w-[40%] bg-white shadow-lg rounded-md">
      <div class="text-2xl pt-2 pb-2 border-solid border-b-2 border-gray-100">
        구글 시트 연동
      </div>
      <div class="pt-4 pb-4">
        <div class="mb-4">
          <div class="flex text-sm mb-1">
            <span class="mr-2">스프레드시트 ID</span>
            <svgIcon 
              class="mt-auto mb-auto"
              src="./svgs/alert-circle-outline.svg" 
              width="14px"
              height="14px"
              color="rgba(57, 71, 86, 1)"
            />
          </div>
          <div class="flex">
            <div class="box-border flex-1 mr-3 p-2 pt-1 pb-1 border-solid border-[0.5px] border-slate-500 rounded-md">
              <input class="w-full" type="text" @input="evt => _spreadsheetId = evt.target.value" v-model="_spreadsheetId">
            </div>
          </div>
        </div>

        <div class="mb-6">
          <div class="flex text-sm mb-1">
            <span class="mr-2">API json 파일</span>
            <svgIcon 
              class="mt-auto mb-auto"
              src="./svgs/alert-circle-outline.svg" 
              width="14px"
              height="14px"
              color="rgba(57, 71, 86, 1)"
            />
          </div>
          <div class="flex">
            <div class="scroll whitespace-nowrap overflow-x-auto box-border flex-1 mr-3 p-2 pt-1 pb-1 border-solid border-[0.5px] border-slate-500 rounded-md" @click="f_selectFile">
              {{ _filename }}
              <input 
                ref="r_input" 
                class="invisible w-[1px]" 
                type="file" 
                accept="application/"
                @change="f_readJson"
              >
            </div>
            <button class="p-2 pt-1 pb-1 w-[70px]" @click="f_selectFile">
              선택
            </button>
          </div>
        </div>

        <div>
          <button 
            class="w-full bg-[#2962ec] text-white pt-2 pb-2"
            @click="f_submitModal"
          >
            {{ c_type }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import svgIcon from '../../components/basic/svgIcon.vue'

import { computed, toRefs, ref } from 'vue'
const { ipcRenderer, dialog, remote } = require('electron')

const $props = defineProps({
  type: {
    type: String,
    default: 'create'
  }
})

const emit = defineEmits([
  'modal:close',
  'modal:add'
])

const {
  type: p_type
} = toRefs($props)

const r_input = ref()
const _spreadsheetId = ref()
const _filename = ref()
const _apiJson = ref()

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

ipcRenderer.on('selectDirectory', (evt, args) => {
  const [ projectPath ] = args

  _projectPath.value = projectPath
})

const f_readJson = (evt) => {
  const reader = new FileReader()
  reader.onload = () => {
    _apiJson.value = JSON.parse(reader.result)
    _filename.value = evt.target.files[0].name
  };

  reader.readAsBinaryString(evt.target.files[0])
}

const f_selectFile = () => {
  r_input.value.click()
}

const f_submitModal = () => {
  const spreadsheetId = "1FCu2fXLpyeanpYiQeePN7oRrGyncrqx7QtbdJesqvJI"

  emit('modal:add', { 
    spreadsheetId: _spreadsheetId.value, 
    apiJson: _apiJson.value 
  })
}
</script>

<style lang="scss" scoped>
.scroll {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
<template>
  <div 
    class="absolute flex left-0 top-0 h-full w-full backdrop-brightness-50" 
    @click.self="emit('modalClose')"
  >
    <div class="pl-5 pr-5 m-auto w-[40%] bg-white shadow-lg rounded-md">
      <div class="text-2xl pt-2 pb-2 border-solid border-b-2 border-gray-100">
        프로젝트 {{ c_type }}
      </div>
      <div class="pt-4 pb-4">
        <div class="mb-4">
          <div class="text-sm mb-1">프로젝트 명</div>
          <div class="flex">
            <div class="box-border flex-1 mr-3 p-2 pt-1 pb-1 border-solid border-[0.5px] border-slate-500 rounded-md">
              <input class="w-full" type="text" @input="evt => _projectName = evt.target.value" v-model="_projectName">
            </div>
          </div>
        </div>

        <div class="mb-6">
          <div class="text-sm mb-1">적용 프로젝트 경로</div>
          <div class="flex">
            <div class="scroll overflow-auto box-border flex-1 mr-3 p-2 pt-1 pb-1 border-solid border-[0.5px] border-slate-500 rounded-md" @click="f_selectDirectory">
              {{ _projectPath }}
            </div>
            <button class="p-2 pt-1 pb-1 w-[70px]" @click="f_selectDirectory">
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
import { updateDataById, findDataByFilter } from '../../composable/db.js'
import { computed, toRefs, ref, watch } from 'vue'
const { ipcRenderer } = require('electron')

const $props = defineProps({
  data: {
    type: Object,
    default: () => { return {} }
  },
  type: {
    type: String,
    default: 'create'
  },
})

const emit = defineEmits([
  'modalClose',
  'modalCreate',
  'modalUpdate',
])

const {
  data: p_data,
  type: p_type,
} = toRefs($props)

const _projectPath = ref()
const _projectName = ref('새 프로젝트')

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

const f_selectDirectory = () => {
  ipcRenderer.send("openDialog", "directory")
}

const f_submitModal = async () => {
  if (p_type.value === 'create') {
    const response = await findDataByFilter({ projectName: _projectName.value })
    
    if (response?.length || !_projectPath.value) return

    emit('modalCreate', {
      projectName: _projectName.value,
      projectPath: _projectPath.value,
    })
  } else if (p_type.value === 'edit') {
    const { _id } = p_data.value

    emit('modalUpdate', {
      id: _id,
      projectName: _projectName.value,
      projectPath: _projectPath.value,
    })
  }
}

watch(p_data, ({ _id, projectName, projectPath }) => {
  _projectName.value = projectName || ''
  _projectPath.value = projectPath || ''
}, { immediate: true })
</script>

<style lang="scss" scoped>
.scroll {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
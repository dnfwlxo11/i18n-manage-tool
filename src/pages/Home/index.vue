<template>
  <div class="homepage flex h-full">
    <leftSideNav />
    <Component
      class="max-h-max p-10 overflow-auto"
      :is="c_menus"
    />
    <!-- 프로젝트 경로 : {{ _projectPath }} <br>
    <button @click="f_selectDirectory">
      업로드
    </button> -->
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
const { ipcRenderer, dialog, remote } = require('electron')
import leftSideNav from '../../components/nav/leftSide.vue'

import projectPage from './projects.vue'

const _projectPath = ref()

ipcRenderer.on('selectDirectory', (evt, args) => {
  const [ projectPath ] = args

  _projectPath.value = projectPath
})

const c_menus = computed(() => {
  const path = useRoute().path

  switch(path) {
    case '/':
      return projectPage
    default:
      return projectPage
  }
})

const f_selectDirectory = () => {
  console.log(dialog, remote)
  // ipcRenderer.send("openDialog", "directory")
  remote.dialog.showOpenDialog({
    properties: [
      'openDirectory'
    ]
  })
}

onMounted(() => {
  console.log(useRoute())
})
</script>
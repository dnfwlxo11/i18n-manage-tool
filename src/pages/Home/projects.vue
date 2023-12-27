<template>
  <div class="flex-1">
    <div class="title text-2xl mb-5 font-bold">
      Projects
    </div>
    <div class="projects grid grid-cols-3 gap-8">
      <template v-if="_data?.length">
        <div 
          v-for="item of _data"
          class="hover:cursor-pointer shadow-lg relative p-4 flex flex-col align-middle rounded-md min-h-[240px]"
          @click="router.push(`/project/${item.projectName}`)"
        >
          <div class="image_wrapper w-14 mb-4">
            <img class="h-full w-full object-contain" src="/vite.svg">
          </div>
          <div class="project_name text-md mb-4 font-semibold text-lg">
            {{ item.projectName }}
          </div>
          <div class="languages flex flex-wrap gap-2 mt-auto">
            <badge :content="'한국어'" />
            <badge :content="'영어'" />
            <badge :content="'네팔어'" />
            <badge :content="'태국어'" />
            <badge :content="'베트남어'" />
          </div>
          <div 
            class="absolute top-4 right-12"
            @click.stop="f_editProject(item)"
          >
            <svgIcon 
              src="./svgs/edit-outline.svg" 
              width="24px"
              height="24px"
              color="rgba(193, 193, 193, 1)"
            />
          </div>
          <div 
            class="absolute top-4 right-4"
            @click.stop="f_removeProject(item)"
          >
            <svgIcon 
              src="./svgs/close.svg" 
              width="24px"
              height="24px"
              color="rgba(193, 193, 193, 1)"
            />
          </div>
        </div>
      </template>
      <div 
        class="hover:cursor-pointer flex flex-col justify-center min-h-[240px] rounded-md shadow-md"
        @click="f_createProject"
      >
        <svgIcon 
          class="block ml-auto mr-auto mb-5"
          src="./svgs/sticker-plus-outline.svg" 
          width="40px"
          height="40px"
          color="rgba(193, 193, 193, 1)"
        />
        <span class="text-center text-md text-[#8F8F8F]">
          새 프로젝트 생성
        </span>
      </div>
    </div>
    <projectSettingModal 
      v-if="_isProjectSetting" 
      :data="_currentData"
      :type="_currentSettingType"
      @modalCreate="f_moveProject"
      @modalUpdate="f_updateProject"
      @modalClose="_isProjectSetting=false" 
    />
    <removeProjectModal 
      v-if="_isProjectRemove" 
      :data="_currentData"
      :type="_currentSettingType"
      @modalRemove="(_isProjectRemove=false,_currentProjectTitle='',_currentProjectPath='',f_init())"
      @modalClose="_isProjectRemove=false" 
    />
  </div>
</template>

<script setup>
import { findAllData, insertData, updateDataById } from '@/composable/db.js'
import { useRouter } from 'vue-router'
import { nextTick, onMounted, ref } from 'vue'
import svgIcon from '@/components/basic/svgIcon.vue'
import badge from '@/components/basic/badge.vue'
import projectSettingModal from '@/components/modal/projectSetting.vue'
import removeProjectModal from '@/components/modal/removeProject.vue'

const _isProjectSetting = ref(false)
const _isProjectRemove = ref(false)
const router = useRouter()

const _data = ref()
const _currentSettingType = ref('create')
const _currentProjectTitle = ref()
const _currentProjectPath = ref()
const _currentData = ref()

const f_moveProject = async (data) => {
  await insertData(data)
  _isProjectSetting.value = false
  await f_init()
  // router.push('/project/1')
}

const f_createProject = () => {
  _currentSettingType.value = 'create'
  _currentProjectTitle.value = ''
  _currentProjectPath.value = ''
  _isProjectSetting.value = true
}

const f_editProject = (data) => {
  _currentSettingType.value = 'edit'
  _currentData.value = data
  _isProjectSetting.value = true
}

const f_updateProject = async (data) => {
  const { id, projectName, projectPath } = data
  _currentData.value = data

  await updateDataById(id, { projectName, projectPath })
  await f_init()

  _isProjectSetting.value = false
}

const f_removeProject = (data) => {
  _currentData.value = data
  _isProjectRemove.value = true
}

const f_init = async () => {
  _data.value = await findAllData()
}

onMounted(async () => {
  await nextTick()
  await f_init()
})
</script>

<style lang="scss" scoped>
.projects {
  .project {
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
  }
}
</style>
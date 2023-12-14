<template>
  <div class="flex-1">
    <div class="title text-2xl mb-5 font-bold">
      Projects
    </div>
    <div class="projects grid grid-cols-3 gap-8">
      <div 
        v-for="item of ['AIONE', 'DEEPPAD']"
        class="hover:cursor-pointer shadow-lg relative p-4 flex flex-col align-middle rounded-md min-h-[240px]"
        @click="router.push(`/project/${item}`)"
      >
        <div class="image_wrapper w-14 mb-4">
          <img class="h-full w-full object-contain" src="/vite.svg">
        </div>
        <div class="project_name text-md mb-4 font-semibold text-lg">
          {{ item }}
        </div>
        <div class="languages flex flex-wrap gap-2 mt-auto">
          <badge :content="'한국어'" />
          <badge :content="'영어'" />
          <badge :content="'네팔어'" />
          <badge :content="'태국어'" />
          <badge :content="'베트남어'" />
        </div>
        <div 
          class="absolute top-4 right-4"
          @click.stop="f_editProject(item, '/test')"
        >
          <svgIcon 
            src="/icons/edit-outline.svg" 
            width="24px"
            height="24px"
            color="rgba(193, 193, 193, 1)"
          />
        </div>
      </div>
      <div 
        class="hover:cursor-pointer flex flex-col justify-center min-h-[240px] rounded-md shadow-md"
        @click="(_currentSettingType='create',_isProjectSetting=false)"
      >
        <svgIcon 
          class="block ml-auto mr-auto mb-5"
          src="/icons/sticker-plus-outline.svg" 
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
      :type="_currentSettingType"
      :title="_currentProjectTitle"
      :projectPath="_currentProjectPath"
      @modal:create="f_createProject"
      @modal:close="_isProjectSetting=false" 
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import svgIcon from '../../components/basic/svgIcon.vue'
import badge from '../../components/basic/badge.vue'
import projectSettingModal from '../../components/modal/projectSetting.vue'

const _isProjectSetting = ref(false)
const router = useRouter()

const _currentSettingType = ref('create')
const _currentProjectTitle = ref()
const _currentProjectPath = ref()

const f_createProject = () => {
  _isProjectSetting.value = false
  router.push('/project/1')
}

const f_editProject = (name: string, path: string) => {
  _currentSettingType.value = 'edit'
  _currentProjectTitle.value = name
  _currentProjectPath.value = path
  _isProjectSetting.value = true
}
</script>

<style lang="scss" scoped>
.projects {
  .project {
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
  }
}
</style>
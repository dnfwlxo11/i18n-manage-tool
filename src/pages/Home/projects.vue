<template>
  <div class="flex-1">
    <div class="title text-2xl mb-5 font-bold">
      Projects
    </div>
    <div class="projects grid grid-cols-3 gap-8">
      <div 
        v-for="item of 10"
        class="shadow-lg relative p-4 flex flex-col align-middle rounded-md min-h-[240px]"
      >
        <div class="image_wrapper w-14 mb-4">
          <img class="h-full w-full object-contain" src="/vite.svg">
        </div>
        <div class="project_name text-md mb-4 font-semibold text-lg">
          테스트
        </div>
        <div class="languages flex flex-wrap gap-2 mt-auto">
          <badge :content="'한국어'" />
          <badge :content="'영어'" />
          <badge :content="'네팔어'" />
          <badge :content="'태국어'" />
          <badge :content="'베트남어'" />
        </div>
        <div class="absolute top-4 right-4">
          <svgIcon 
            src="/icons/edit-outline.svg" 
            width="24px"
            height="24px"
            color="rgba(193, 193, 193, 1)"
          />
        </div>
      </div>
      <div 
        class="flex flex-col justify-center min-h-[240px] rounded-md shadow-md"
        @click="_isProjectSetting=true"
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
    <projectSettingModal v-if="_isProjectSetting" @modal:close="_isProjectSetting=false" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import svgIcon from '../../components/basic/svgIcon.vue'
import badge from '../../components/basic/badge.vue'
import projectSettingModal from '../../components/modal/projectSetting.vue'

const _isProjectSetting = ref(false)
</script>

<style lang="scss" scoped>
.projects {
  .project {
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
  }
}
</style>
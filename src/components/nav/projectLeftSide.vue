<template>
  <div class="leftside h-full pt-5 pb-5">
    <div class="hover:cursor-pointer h-full overflow-auto">
      <div 
        class="flex mb-[50px] pl-3 pr-3"
        @click="router.go(-1)"
      >
        <svgIcon 
          src="./svgs/chevron-left.svg" 
          width="34px"
          height="34px"
          color="rgba(255, 255, 255, 1)"
        />
        <span class="mt-auto mb-auto text-md font-bold">뒤로가기</span>
      </div>

      <div class="menus">
        <div
          class="menu w-full p-3 pl-5 pr-5"
          v-for="(menu, idx) of p_menus"
          :key="idx"
        >
          <span>{{ menu }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import svgIcon from '../../components/basic/svgIcon.vue'
import { useRoute, useRouter } from 'vue-router'
import { toRefs } from 'vue'

const $props = defineProps({
  menus: {
    type: Array,
    default: [],
  }
})

const {
  menus: p_menus
} = toRefs($props)

const router = useRouter()
</script>

<style lang="scss" scoped>
.leftside {
  width: 140px;
  color: rgba(255, 255, 255, 1);
  background: rgba(41, 98, 236, 1);

  .menus {
    .menu {
      &:hover {
        background: rgba(31, 42, 122, 0.6);
        box-shadow: 5px 0 0 0 rgba(255, 255, 255, 1) inset;
      }
    }
  }
}
</style>
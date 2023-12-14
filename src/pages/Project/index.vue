<template>
  <div class="flex h-full">
    <!-- <projectLeftSide :menus="['한국어', '영어', '네팔어', '태국어', '베트남어']" /> -->
    <div class="max-h-max flex-1 p-10 overflow-auto flex flex-col">
      <div 
        class="inline-flex mb-5 hover:cursor-pointer"
        @click="router.go(-1)"
      >
        <svgIcon 
          src="/icons/chevron-left.svg" 
          width="34px"
          height="34px"
          color="rgba(0, 0, 0, 1)"
        />
        <span class="mt-auto mb-auto text-md font-bold">뒤로가기</span>
      </div>
      <div class="flex mb-3">
        <div class="text-2xl font-bold">
          프로젝트 {{ useRoute().params.id }}  
        </div>
        <div class="flex ml-auto border-[0.5px] border-slate-400 rounded-[24px] box-border p-1">
          <input class="box-border pl-3 pr-2" type="text" placeholder="검색어를 입력해주세요.">
          <svgIcon 
            class="mr-1 mt-auto mb-auto"
            src="/icons/magnify.svg" 
            width="20px"
            height="20px"
            color="rgba(148, 163, 184, 1)"
          />
        </div>
      </div>
      <div class="mb-7">
        <button v-if="r_excel" class="border-[#2962ec] text-[#2962ec] mr-3 p-2 pt-1 pb-1 hover:bg-[#2962ec] hover:text-white" @click="r_excel.click()">엑셀 가져오기</button>
        <button class="border-[#2962ec] text-[#2962ec] mr-3 p-2 pt-1 pb-1 hover:bg-[#2962ec] hover:text-white" @click="_googleSheetModal=true">구글 시트 연동</button>
        <input 
          ref="r_excel" 
          class="input" 
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @change="f_readXlsx"
        >
      </div>
      <div v-if="_sheets?.length || 0" class="content flex-1 overflow-auto relative">
        <table>
          <thead>
            <tr>
              <th 
                :class="{ 'sticky top-0 z-[2]': key.includes('key') }"
                class="text-md min-w-[100px] bg-[#2962ec] box-border text-white p-2 border-r-[1px] border-white"
                v-for="(data, key) in _targetSheet?.rows?.[0]" 
                :key="key"
              >
                {{ key }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(row, rowIdx) of _targetSheet?.rows" 
              :key="rowIdx"
            >
              <td 
                :class="{ 'sticky z-[1]': key.includes('key') }"
                class="text-sm font-semibold min-w-[100px] box-border border-r-[1px] border-b-[1px] border-white"
                v-for="(data, key, idx) in row"
                :key="key"
              >
                <input 
                  v-if="!key.includes('key')" 
                  class="bg-transparent p-2"
                  :class="`focus:bg-[#cad5f3]`"
                  type="text" 
                  @input="evt => _targetSheet.rows[rowIdx][key] = evt.target.value" 
                  v-model="_targetSheet.rows[rowIdx][key]"
                >
                <span class="p-2" v-else>{{ data }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="empty">
        <span class="mr-3">아직 번역 시트가 존재하지 않습니다.</span>
        <button class="bg-slate-300 text-black mr-3 p-2 pt-1 pb-1">새로만들기</button>
      </div>
      <div v-if="_sheets?.length" class="mb-3 flex opacity-20 hover:opacity-100 w-full overflow-auto h-[60px]">
        <div 
          :class="{ 'bg-slate-400': sheet.sheetName === _targetSheet.sheetName }"
          class="box-border h-full p-2 bg-slate-300 mr-[2px] font-semibold hover:bg-slate-400"
          v-for="(sheet, idx) of _sheets || []"
          :key="idx"
          @click="_targetSheet = sheet"
        >
          {{ sheet.sheetName }}
        </div>
      </div>
      <button v-if="r_excel" class="mt-auto hover:border-[#2962ec] hover:bg-white hover:text-[#2962ec] mr-3 p-2 pt-1 pb-1 bg-[#2962ec] text-white" @click="extractTranslateFile">프로젝트에 적용</button>
    </div>
    <googleSheetSyncModal 
      v-if="_googleSheetModal" 
      @modal:add="v => loadGoogleSheet(v.spreadsheetId, v.apiJson)"
      @modal:close="_googleSheetModal=false"
    />
  </div>
</template>

<script setup>
import projectLeftSide from '../../components/nav/projectLeftSide.vue'
import googleSheetSyncModal from '../../components/modal/googleSheetSync.vue'
import svgIcon from '../../components/basic/svgIcon.vue'

import * as XLSX from 'xlsx'
import { connGoogleApis } from '../../composable/googleSheet.js'
import { convertData } from '../../composable/extractor.js'
const { google } = require('googleapis')
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()

const r_excel = ref()
const _filename = ref()
const _sheets = ref([])
const _targetSheet = ref()
const _googleSheetModal = ref(false)
const _googleSync = ref(false)

const f_readXlsx = (evt) => {
  let input = evt.target;

  _sheets.value = []

  const reader = new FileReader();
  reader.onload = () => {
    let data = reader.result;
    let workBook = XLSX.read(data, { type: 'binary' })
    workBook.SheetNames.forEach((sheetName) => {
      let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
      _sheets.value.push({ sheetName, rows })

    })
    
    _targetSheet.value = _sheets.value[0]
    _filename.value = input.files[0].name
  };

  reader.readAsBinaryString(input.files[0])
}

const loadGoogleSheet = async (spreadsheetId, apiJson) => {
  const result = await connGoogleApis(spreadsheetId, apiJson)

  _sheets.value = result
  _targetSheet.value = _sheets.value[0]
  _googleSheetModal.value = false
}

const extractTranslateFile = () => {
  const result = convertData(_sheets.value)


}
</script>

<style lang="scss" scoped>
.input {
  visibility: hidden;
  width: 1px;
}

.content {
  &::-webkit-scrollbar {
    display: none;
  }
}

table {
  th,
  td {
    white-space: nowrap;
  }

  th {
    top: 0;
    position: sticky;
  }

  td {
    background: rgba(255, 255, 255, 1);

    &:nth-child(odd) {
      background: rgba(241, 243, 245, 1);
    }
  }
}
</style>
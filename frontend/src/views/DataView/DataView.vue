<script setup>
import { useRoute } from 'vue-router'
import AreaChart from './components/AreaChart/AreaChart.vue'
import BarChart from './components/BarChart/BarChart.vue'
import HeatMap from './components/HeatMap/HeatMap.vue'
import LineChart from './components/LineChart/LineChart.vue'
import PieChart from './components/PieChart/PieChart.vue'
import RadarChart from './components/RadarChart/RadarChart.vue'
import SankeyDiagram from './components/SankeyDiagram/SankeyDiagram.vue'
import ScatterPlot from './components/ScatterPlot/ScatterPlot.vue'
import StackedBar from './components/StackedBar/StackedBar.vue'
import FilterNav from './components/FilterNav/FilterNav.vue'
import { useConsumeStore, useUserStore } from '@/stores'
import { ref, onMounted } from 'vue'

const userStore = useUserStore()
const consumeStore = useConsumeStore()
onMounted(() => {
  if (consumeStore.consumeList.length === 0) consumeStore.getConsumeData()
  if (consumeStore.outcomeList.length === 0) consumeStore.getOutcomeData()
  if (consumeStore.incomeList.length === 0) consumeStore.getIncomeData()
})
const route = useRoute()
console.log(route.query.id)

const member_id = ref(route.query.id || userStore.userInfo.member_id)
const date = ref('')
const type = ref('all')

const handleReset = () => {
  // 重置
  member_id.value = userStore.userInfo.member_id
  date.value = ''
  type.value = 'all'
  ElNotification({
    message: '重置成功',
    type: 'success',
    duration: 2000
  })
}

const handleFilter = (info) => {
  console.log(info)
  if (info.member_id) {
    member_id.value = info.member_id
  } else {
    member_id.value = userStore.userInfo.member_id
  }
  date.value = info.date
  type.value = info.type
}
</script>

<template>
  <div class="data-v-container wh-full fd-col">
    <div class="filter-container">
      <FilterNav @reset="handleReset" @filter="handleFilter"></FilterNav>
    </div>
    <div class="data-v-content f-s flex-wrap mt-15">
      <CardContainer class="chart-card">
        <PieChart :member_id="member_id" :date="date" :type="type"></PieChart>
      </CardContainer>
      <CardContainer class="chart-card">
        <BarChart :date="date" :type="type"></BarChart>
      </CardContainer>
      <CardContainer class="chart-card">
        <LineChart :member_id="member_id" :date="date" :type="type"></LineChart>
      </CardContainer>
      <!-- <CardContainer class="chart-card">
        <ScatterPlot :member_id="member_id" :date="date" :type="type"></ScatterPlot>
      </CardContainer>
      <CardContainer class="chart-card">
        <AreaChart :member_id="member_id" :date="date" :type="type"></AreaChart>
      </CardContainer>
      <CardContainer class="chart-card">
        <RadarChart :member_id="member_id" :date="date" :type="type"></RadarChart>
      </CardContainer>
      <CardContainer class="chart-card">
        <StackedBar :member_id="member_id" :date="date" :type="type"></StackedBar>
      </CardContainer>
      <CardContainer class="chart-card">
        <HeatMap :member_id="member_id" :date="date" :type="type"></HeatMap>
      </CardContainer>
      <CardContainer class="chart-card">
        <SankeyDiagram
          :member_id="member_id"
          :date="date"
          :type="type"
        ></SankeyDiagram>
      </CardContainer> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-card {
  margin-right: 10px;
  margin-bottom: 10px;
  width: 41vw;
  height: 60vh;
  :deep(.el-card__body) {
    padding: 0 !important;
    .content {
      overflow: hidden !important;
      &::-webkit-scrollbar {
        display: none !important;
      }
    }
  }
}
</style>

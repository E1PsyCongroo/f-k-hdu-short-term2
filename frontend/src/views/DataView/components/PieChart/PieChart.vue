<script setup>
import * as echarts from 'echarts'
import { onMounted, watch, ref } from 'vue'
import { usePieConfig } from '../../composables/usePieConfig'
import { useGlobalStore, useConsumeStore} from '@/stores';

const globalStore = useGlobalStore()
const consumeStore = useConsumeStore()

const props = defineProps({
  member_id: {
    type: Number,
    default: 0
  },
  date: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'all'
  }
})

let myChart = null
// 定义更新图表的函数
async function updateChart() {
  console.log(props)
  if (!myChart) return
  const { optionPost: newOption } = usePieConfig(
    props.member_id,
    props.date,
    props.type
  )
  optionPost.value = newOption
  myChart.setOption(optionPost)
}

const optionPost = ref(null)
onMounted(async () => {
  if (consumeStore.consumeList.length === 0) await consumeStore.getConsumeData()
  if (consumeStore.outcomeList.length === 0) await consumeStore.getOutcomeData()
  if (consumeStore.incomeList.length === 0) await consumeStore.getIncomeData()
  const chartDom = document.getElementById('pie-main')
  if (chartDom) {
    myChart = echarts.init(chartDom, globalStore.isDark ? 'dark' : 'none')
    updateChart() // 初始化图表
  }
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})

// 监听 props 的变化
watch(() => [props.member_id, props.date, props.type], updateChart, {
  immediate: true
})
</script>

<template>
  <div class="wh-full f-c">
    <e-charts id="pie-main" class="chart" :option="optionPost" />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>

import { useConsumeStore, useMemberStore } from '@/stores'
const consumeStore = useConsumeStore()
const memberStore = useMemberStore()

export const usePieConfig = (memId, date, type) => {
  consumeStore.getConsumeData()
  if (consumeStore.consumeList.length === 0) consumeStore.getConsumeData()
  if (consumeStore.outcomeList.length === 0) consumeStore.getOutcomeData()
  if (consumeStore.incomeList.length === 0) consumeStore.getIncomeData()
  let name = ''
  if (memId !== 0 && memId !== '') {
    name = memberStore.members.find((item) => item.memId === memId)?.name
  }
  let dataList

  if (type === 'income') {
    dataList = consumeStore.incomeList
  } else if (type === 'outcome') {
    dataList = consumeStore.outcomeList
  } else {
    dataList = consumeStore.consumeList
  }

  // 处理数据的函数
  const processData = (list) => {
    const result = list.reduce((acc, item) => {
      // 检查 memId 和 date 是否匹配
      const isMemIdMatch = item.memId === memId || memId === '' || memId === 0
      const isDateMatch = date === '' || item.consumeDate.slice(0, 7) === date

      if (isMemIdMatch && isDateMatch) {
        // 查找是否已经存在相同 category 的数据
        const found = acc.find((entry) => entry.name === item.category)
        if (found) {
          found.value += item.amount // 累加 value
        } else {
          acc.push({ name: item.category, value: item.amount }) // 添加新项
        }
      }
      return acc
    }, [])
    return result
  }

  // 获取去重后的数据
  const uniqueDataPost = processData(dataList)

  const optionPost = {
    title: {
      text: `${name} 收支类型分类`,
      bottom: '10',
      left: 'center'
    },
    color: [
      '#b7eb8f',
      '#95de64',
      '#73d13d',
      '#52c41a',
      '#389e0d',
      '#237804',
      '#135200'
    ],
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '收支类型分类',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: uniqueDataPost
      }
    ]
    // darkMode: true
  }

  return { optionPost }
}

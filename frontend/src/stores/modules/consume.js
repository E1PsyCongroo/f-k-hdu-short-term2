import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getIncomeAPI,
  getOutcomeAPI,
  getConsumeAPI,
  getAllTagsAPI,
  deleteConsumeAPI,
  addConsumeAPI,
  updateConsumeAPI
} from '@/api/consume'
import { ElMessage } from 'element-plus'
import { useFamilyStore } from '@/stores'

export const useConsumeStore = defineStore('consume', () => {
  // state
  const consumeList = ref([])
  const incomeList = ref([])
  const outcomeList = ref([])
  const familyStore = useFamilyStore()
  // 获取消费记录
  const getConsumeData = async () => {
    const res = await getConsumeAPI({ family_id: familyStore.family.family_id })
    console.log(res)
    consumeList.value = res.data
  }
  // 获取收入
  const getIncomeData = async () => {
    const res = await getIncomeAPI({ family_id: familyStore.family.family_id })
    console.log(res)
    incomeList.value = res.data
  }

  // 获取支出
  const getOutcomeData = async () => {
    const res = await getOutcomeAPI({ family_id: familyStore.family.family_id })
    console.log(res)
    outcomeList.value = res.data
  }

  // 获取 tags
  const tags = ref([])
  const getTags = async () => {
    const res = await getAllTagsAPI({ family_id: familyStore.family.family_id })
    console.log(res)
    tags.value = res.data
  }

  const refresh = () => {
    getConsumeData()
    getIncomeData()
    getOutcomeData()
    getTags()
  }
  // 删除操作
  const deleteConsume = async (id) => {
    const res = await deleteConsumeAPI(id)
    if (res.status === 200) {
      console.log(res)
      ElMessage.success('删除成功')
      refresh()
    }
  }
  // 新增操作
  const addConsume = async (info) => {
    const res = await addConsumeAPI(info)
    if (res.status === 200) {
      console.log(res)
      ElMessage.success('新增成功')
      refresh()
    }
  }
  // 编辑操作
  const editConsume = async (info, id) => {
    const res = await updateConsumeAPI(info, id)
    if (res.status === 200) {
      ElMessage.success('编辑成功')
      refresh()
    }
  }
  return {
    consumeList,
    incomeList,
    outcomeList,
    tags,
    getTags,
    getIncomeData,
    getOutcomeData,
    getConsumeData,
    deleteConsume,
    refresh,
    addConsume,
    editConsume
  }
})

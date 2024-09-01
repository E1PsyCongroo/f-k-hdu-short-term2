import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFamilyAPI } from '@/api/member'
import { useUserStore } from '@/stores'

export const useFamilyStore = defineStore('family', () => {
  // state
  const family = ref([])
  // 获取当前用户信息
  const userStore = useUserStore()

  const initFamily = async () => {
    if (userStore.userInfo.token) {
      const res = await getFamilyAPI({
        member_id: userStore.userInfo.member_id
      })
      console.log(res)
      if (res.status === 200) {
        family.value = res.data
      }
    }
  }

  const updateFamilyInfo = async () => {
    const res = await getFamilyAPI({ member_id: userStore.userInfo.member_id })
    console.log(res)
    if (res.status === 200) {
      family.value = res.data
    }
  }

  return {
    family,
    initFamily,
    updateFamilyInfo
  }
})

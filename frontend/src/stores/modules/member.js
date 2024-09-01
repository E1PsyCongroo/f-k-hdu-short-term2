import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMemberAPI, addMemberAPI } from '@/api/member'
import { useUserStore } from './user' // 引入 user store
import { useFamilyStore } from './family'

export const useMemberStore = defineStore('member', () => {
  // state
  const members = ref([])
  // 获取当前用户信息
  const userStore = useUserStore()

  const initMembers = async () => {
    if (userStore.userInfo.token) {
      const res = await getMemberAPI({
        member_id: userStore.userInfo.member_id
      })
      console.log(res)
      if (res.status === 200) {
        members.value = res.data
      }
    }
  }

  const addMember = async (info) => {
    const res = await addMemberAPI(info)
    if (res.status === 200) {
      await initMembers()
      ElMessage.success('新增用户成功')
      window.location.reload(true)
      await useFamilyStore.updateFamilyInfo()
    }
  }

  return {
    members,
    initMembers,
    addMember
  }
})

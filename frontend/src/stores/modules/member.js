import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMemberAPI, addMemberAPI, updateMemberAPI, deleteMemberAPI } from '@/api/member'
import { useUserStore, useFamilyStore } from '@/stores'

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
      await useFamilyStore().updateFamilyInfo()
    }
  }

  const updateMember = async (info, member_id) => {
    console.log(info, member_id)
    const res = await updateMemberAPI(info, member_id)
    if (res.status === 200) {
      await initMembers()
      ElMessage.success('更新用户成功')
    }
  }

  const deleteMember = async (member_id) => {
    const res = await deleteMemberAPI(member_id)
    if (res.status === 200) {
      await initMembers()
      ElMessage.success('删除用户成功')
      await useFamilyStore().updateFamilyInfo()
    }
  }

  return {
    members,
    initMembers,
    addMember,
    updateMember,
    deleteMember
  }
})

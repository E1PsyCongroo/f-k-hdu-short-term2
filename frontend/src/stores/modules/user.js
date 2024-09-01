import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/api/user.js'

export const useUserStore = defineStore(
  'user',
  () => {
    // state
    const userInfo = ref({})
    // actions

    const getUserInfo = async ({ username, password }) => {
      // 登录获取用户信息
      const userRes = await loginAPI({ username, password })
      console.log(userRes)
      if (userRes.status === 200) {
        userInfo.value = userRes.data
      }
      return userRes
    }

    const clearUserInfo = () => {
      userInfo.value = {}
    }
    // getters
    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    }
  },
  // 本地持久化
  {
    persist: true
  }
)

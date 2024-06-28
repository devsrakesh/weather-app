import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/utils/axiosUtil'

interface User {
  email: string
  _id: string
  accessToken: string
  refreshToken: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  const signup = async (email: string, password: string) => {
    try {
      const response = await axios.post('/auth/register', { email, password })
      user.value = response.data.data
      isAuthenticated.value = true
      cacheTokens(response.data.data.accessToken, response.data.data.refreshToken)
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/auth/login', { email, password })
      user.value = response.data.data
      isAuthenticated.value = true
      cacheTokens(response.data.data.accessToken, response.data.data.refreshToken)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const getRefreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      console.log(refreshToken)

      if (!refreshToken || !user.value) {
        throw new Error('No refresh token available')
      }

      const response = await axios.post('/auth/refresh-token', {
        userId: user.value._id,
        refreshToken
      })

      user.value.accessToken = response.data.data.accessToken
      user.value.refreshToken = response.data.data.refreshToken
      cacheTokens(response.data.data.accessToken, response.data.data.refreshToken)
    } catch (error) {
      console.error('Token refresh failed:', error)
      throw error
    }
  }

  const cacheTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  const clearAuth = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  const initializeAuth = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (accessToken && refreshToken) {
      try {
        await getRefreshToken()
        isAuthenticated.value = true
      } catch {
        console.log('t4st')
        clearAuth()
      }
    }
  }

  return {
    user,
    isAuthenticated,
    signup,
    login,
    getRefreshToken,
    initializeAuth,
    clearAuth
  }
})

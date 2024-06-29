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
  const user = ref<User>({
    email: '',
    _id: '',
    accessToken: '',
    refreshToken: ''
  })
  const isAuthenticated = ref(false)

  const signup = async (email: string, password: string) => {
    try {
      const response = await axios.post('/auth/register', { email, password })
      user.value = response.data.data
      isAuthenticated.value = true
      cacheTokens(
        response.data.data.accessToken,
        response.data.data.refreshToken,
        response.data.data._id
      )
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
      cacheTokens(
        response.data.data.accessToken,
        response.data.data.refreshToken,
        response.data.data._id
      )
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const getRefreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      const userId = localStorage.getItem('userId')

      console.log(refreshToken, userId)

      if (refreshToken && userId) {
        const response = await axios.post('/auth/refresh-token', {
          userId: userId,
          refreshToken: refreshToken
        })

        console.log('test', response.data.data)

        user.value.accessToken = response.data.data.accessToken
        user.value.refreshToken = response.data.data.accessToken

        cacheTokens(response.data.data.accessToken, response.data.data.refreshToken, userId)
      } else {
        console.log('test', refreshToken, userId)
        throw new Error('No refresh token available')
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      throw error
    }
  }

  const cacheTokens = (accessToken: string, refreshToken: string, _id: string) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('userId', _id)
  }

  const clearAuth = () => {
    user.value = {
      email: '',
      _id: '',
      accessToken: '',
      refreshToken: ''
    }
    isAuthenticated.value = false
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
  }

  const initializeAuth = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (accessToken && refreshToken) {
      try {
        isAuthenticated.value = true
        await getRefreshToken()
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

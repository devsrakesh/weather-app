// src/utils/axiosUtil.ts
import { useAuthStore } from '@/stores/authStore'
import axios, { type AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const authStore = useAuthStore()
//     const originalRequest = error.config

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       try {
//         await authStore.getRefreshToken()
//         originalRequest.headers['Authorization'] = `Bearer ${authStore.user?.accessToken}`
//         return axios(originalRequest)
//       } catch (err) {
//         authStore.clearAuth()
//         return Promise.reject(err)
//       }
//     }

//     return Promise.reject(error)
//   }
// )

export default api

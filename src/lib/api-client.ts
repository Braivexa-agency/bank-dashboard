import axios, { AxiosInstance, AxiosError } from 'axios'
import { useAuthStore } from '@/stores/authStore'

// Get API base URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Set to true if using cookies/sessions
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = useAuthStore.getState().auth.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      const status = error.response.status
      
      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        useAuthStore.getState().auth.reset()
      } else if (status === 403) {
        // Forbidden
        console.error('Access forbidden')
      } else if (status === 404) {
        // Not found
        console.error('Resource not found')
      } else if (status >= 500) {
        // Server error
        console.error('Server error:', error.response.data)
      }
    }
    
    return Promise.reject(error)
  }
)

export default apiClient


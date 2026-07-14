import axios from 'axios'
import {
  clearAuthSession,
  getAccessToken,
  isProtectedPath,
  refreshAuthSession,
  shouldRefreshAccessToken,
} from '../utils/authStorage'
import { isLocalPreviewMode, LOCAL_PREVIEW_READ_ONLY_MESSAGE } from '../mocks/localPreview'

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DOMAIN,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// ------------------------------
// 중복 요청 방지
// ------------------------------
const pendingRequests = new Map()
const getRequestKey = (config) => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// ------------------------------
// Refresh Token 로직
// ------------------------------
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)))
  failedQueue = []
}

const requestTokenRefresh = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_DOMAIN}/jwt/refresh`,
    {},
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    },
  )

  const accessToken = res?.data?.accessToken
  if (!accessToken) {
    throw new Error('액세스 토큰 재발급에 실패했습니다.')
  }

  refreshAuthSession(accessToken)
  return accessToken
}

export const ensureFreshAccessToken = async ({ force = false } = {}) => {
  const accessToken = getAccessToken()
  if (!accessToken) return null

  if (!force && !shouldRefreshAccessToken()) {
    return accessToken
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
  }

  isRefreshing = true

  try {
    const nextAccessToken = await requestTokenRefresh()
    processQueue(null, nextAccessToken)
    return nextAccessToken
  } catch (error) {
    processQueue(error, null)
    clearAuthSession()
    throw error
  } finally {
    isRefreshing = false
  }
}

// ------------------------------
// 요청 인터셉터
// ------------------------------
api.interceptors.request.use(
  async (config) => {
    const requireAuth = config.requireAuth ?? false
    if (requireAuth && isLocalPreviewMode) {
      return Promise.reject(new Error(LOCAL_PREVIEW_READ_ONLY_MESSAGE))
    }

    const key = getRequestKey(config)
    if (pendingRequests.has(key)) return Promise.reject(new Error('중복 요청 차단됨'))
    pendingRequests.set(key, true)

    if (requireAuth) {
      try {
        const accessToken = await ensureFreshAccessToken()

        if (!accessToken) {
          if (isProtectedPath()) {
            window.location.href = '/login'
          }
          return Promise.reject(new Error('로그인이 만료되었습니다. 다시 로그인해주세요.'))
        }

        config.headers.Authorization = `Bearer ${accessToken}`
      } catch (refreshError) {
        if (isProtectedPath()) {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return config
  },
  (err) => Promise.reject(err),
)

api.interceptors.response.use(
  (res) => {
    pendingRequests.delete(getRequestKey(res.config))
    return res.data
  },
  async (err) => {
    const originalRequest = err.config
    if (originalRequest) {
      pendingRequests.delete(getRequestKey(originalRequest))
    }

    if (err.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const accessToken = await ensureFreshAccessToken({ force: true })
        if (!accessToken) {
          throw new Error('로그인이 만료되었습니다. 다시 로그인해주세요.')
        }

        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        if (isProtectedPath()) {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(err)
  },
)

export default api

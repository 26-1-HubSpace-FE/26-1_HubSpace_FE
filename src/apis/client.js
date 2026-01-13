// apiClient.js
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DOMAIN,
  headers: { 'Content-Type': 'application/json' },
})

// 중복 요청 관리용 Map
const pendingRequests = new Map()

// 요청 Key 생성 함수
const getRequestKey = (config) => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const key = getRequestKey(config)

    if (pendingRequests.has(key)) {
      console.warn(`중복 요청 차단됨: ${key}`)
      return Promise.reject(new Error('중복 요청 차단됨'))
    }

    pendingRequests.set(key, true)
    return config
  },
  (err) => {
    console.error('Request Error:', err.message)
    return Promise.reject(err)
  },
)

// 응답 인터셉터
api.interceptors.response.use(
  (res) => {
    const key = getRequestKey(res.config)
    pendingRequests.delete(key)
    return res.data
  },
  (err) => {
    const key = getRequestKey(err.config || {})
    pendingRequests.delete(key)
    console.error('Response Error:', err.response?.data || err.message)
    return Promise.reject(err)
  },
)

export default api

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const EXPIRES_AT_KEY = 'authExpiresAt'
const AUTH_EVENT_NAME = 'auth-session-changed'

// 기본 세션 유지 시간: 1시간
// TODO: 액세스토큰 만료되면 리프레시 토큰으로 자동으로 리프레시 해주는 로직이 필요할듯. 정식으로 할 때
const SESSION_DURATION_MS = 60 * 60 * 1000

const PUBLIC_PATHS = ['/login', '/cookie', '/search', '/result']

const emitAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_EVENT_NAME))
}

export const isProtectedPath = (pathname = window.location.pathname) =>
  !PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))

export const setAuthSession = ({ accessToken, refreshToken }) => {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  }

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }

  localStorage.setItem(EXPIRES_AT_KEY, String(Date.now() + SESSION_DURATION_MS))
  emitAuthChange()
}

export const clearAuthSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(EXPIRES_AT_KEY)
  emitAuthChange()
}

export const getAuthExpiresAt = () => Number(localStorage.getItem(EXPIRES_AT_KEY) || 0)

export const isAuthExpired = () => {
  const expiresAt = getAuthExpiresAt()
  if (!expiresAt) return true
  return Date.now() >= expiresAt
}

export const getRemainingSessionTime = () => {
  const expiresAt = getAuthExpiresAt()
  if (!expiresAt) return 0
  return Math.max(expiresAt - Date.now(), 0)
}

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!accessToken) return null

  if (isAuthExpired()) {
    clearAuthSession()
    return null
  }

  return accessToken
}

export const hasValidSession = () => !!getAccessToken()

export const refreshAuthSession = (accessToken) => {
  if (!accessToken) return

  setAuthSession({
    accessToken,
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  })
}

export const getAuthEventName = () => AUTH_EVENT_NAME

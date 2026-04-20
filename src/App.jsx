import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './components/AppRouter'
import styles from './App.module.css'
import { Toaster, toast } from 'sonner'
import Footer from './components/footer/Footer'
import {
  clearAuthSession,
  getAuthEventName,
  getRefreshDelay,
  isProtectedPath,
  shouldRefreshAccessToken,
} from './utils/authStorage'
import { ensureFreshAccessToken } from './apis/ApiClient'

function App() {
  useEffect(() => {
    let timeoutId = null

    const scheduleAutoRefresh = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }

      const refreshDelay = getRefreshDelay()
      if (refreshDelay === 0 && !shouldRefreshAccessToken()) return

      timeoutId = window.setTimeout(() => {
        ensureFreshAccessToken({ force: true })
          .catch(() => {
            clearAuthSession()

            if (isProtectedPath()) {
              toast.error('로그인 시간이 만료되었습니다. 다시 로그인해주세요.', {
                duration: 1800,
              })

              window.setTimeout(() => {
                window.location.href = '/login'
              }, 250)
            }
          })
          .finally(() => {
            scheduleAutoRefresh()
          })
      }, refreshDelay)
    }

    scheduleAutoRefresh()

    const authEventName = getAuthEventName()
    window.addEventListener(authEventName, scheduleAutoRefresh)
    window.addEventListener('storage', scheduleAutoRefresh)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      window.removeEventListener(authEventName, scheduleAutoRefresh)
      window.removeEventListener('storage', scheduleAutoRefresh)
    }
  }, [])

  return (
    <div className={styles.app}>
      <RouterProvider router={AppRouter} />
      <Footer />
      <Toaster
        position='top-center'
        duration={2000}
        richColors
        closeButton
        toastOptions={{
          style: {
            marginTop: '20px',
          },
        }}
      />
    </div>
  )
}

export default App

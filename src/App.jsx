import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './components/AppRouter'
import styles from './App.module.css'
import { Toaster, toast } from 'sonner'
import {
  clearAuthSession,
  getAuthEventName,
  getRemainingSessionTime,
  isProtectedPath,
} from './utils/authStorage'

function App() {
  useEffect(() => {
    let timeoutId = null

    const scheduleAutoLogout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }

      const remainingTime = getRemainingSessionTime()
      if (remainingTime <= 0) return

      timeoutId = window.setTimeout(() => {
        clearAuthSession()

        if (isProtectedPath()) {
          toast.error('로그인 시간이 만료되었습니다. 다시 로그인해주세요.', {
            duration: 1800,
          })

          window.setTimeout(() => {
            window.location.href = '/login'
          }, 250)
        }
      }, remainingTime)
    }

    scheduleAutoLogout()

    const authEventName = getAuthEventName()
    window.addEventListener(authEventName, scheduleAutoLogout)
    window.addEventListener('storage', scheduleAutoLogout)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      window.removeEventListener(authEventName, scheduleAutoLogout)
      window.removeEventListener('storage', scheduleAutoLogout)
    }
  }, [])

  return (
    <div className={styles.app}>
      <RouterProvider router={AppRouter} />
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

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setAuthSession } from '../../../utils/authStorage'
import LoadingSpinner from '../../../components/loadingSpinner/LoadingSpinner'
import './cookiePage.css'

export default function CookiePage() {
  const navigate = useNavigate()

  useEffect(() => {
    const exchangeToken = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/jwt/exchange`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // 쿠키
        })

        if (!res.ok) throw new Error('인증 실패')

        const data = await res.json()
        setAuthSession({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })

        // 로그인 완료 후 메인 페이지로 이동
        navigate('/dashboard', { replace: true })
      } catch (err) {
        const msg = err?.message || '소셜 로그인 실패'
        alert(msg)
        navigate('/login', { replace: true })
      }
    }

    exchangeToken()
  }, [navigate])

  return (
    <div className='cookiePage'>
      <div className='cookiePage-loading'>
        <LoadingSpinner
          className='cookiePage-spinner'
          size={48}
          cubeSize={16}
          color='#2d3b86'
        />
        <p className='cookiePage-text'>로그인 중입니다...</p>
      </div>
    </div>
  )
}

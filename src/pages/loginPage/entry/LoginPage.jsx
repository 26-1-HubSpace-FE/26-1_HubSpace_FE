import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import GradientLayout from '../../../components/gradientLayout/GradientLayout'
import googleIcon from '../../../assets/auth/auth-google-logo.svg'
import authLogo from '../../../assets/auth/auth-logo.png'
import { hasValidSession } from '../../../utils/authStorage'

export default function LoginPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (hasValidSession()) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_DOMAIN}/oauth2/authorization/google`
  }

  return (
    <GradientLayout>
      <img src={authLogo} alt='HubSpace' className='login__logo' />

      <h2 className='login__title'>폼 신청 여부를 쉽게 확인할 수 있는 서비스</h2>
      <p className='login__description'>신청자는 자신의 신청 여부를 확인하고, 관리자는 문의를 줄일 수 있습니다.</p>

      <button onClick={handleLogin} className='login__button'>
        <img src={googleIcon} />
      </button>

      <div className='login__about'>
        <p className='login__about-text'>
          허브스페이스는 이벤트 관리자가 Google Forms를 생성해 실시간으로 신청을 받거나, CSV·TSV 형식의 기존 신청 데이터를 업로드하여 관리할 수 있는 서비스입니다. 신청자는 이벤트 관리자가 제공한 조회 URL에서 자신의 정보를 입력하고 신청 내역을 확인할 수 있습니다.
        </p>
        <p className='login__about-text'>
          허브스페이스는 이벤트 신청용 Google Form을 생성하고 관리하기 위한 목적으로만 Google Forms 접근 권한을 사용합니다.
        </p>
      </div>
    </GradientLayout>
  )
}

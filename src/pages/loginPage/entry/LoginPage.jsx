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
      <p className='login__description'>신청자는 자신의 신청 여부를 확인하고, 관리자는 문의를 줄일 수 있습니다.<br/>
        HubSpace helps event managers create Google Forms for event registration<br/>
        and allows applicants to check whether their registration was successfully submitted.</p>

      <button onClick={handleLogin} className='login__button'>
        <img src={googleIcon} />
      </button>
    </GradientLayout>
  )
}

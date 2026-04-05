import './Header.css'
import { useFetchUserInfo } from './apis/fetchUserInfo'
import { useNavigate } from 'react-router-dom'
import defaultLogo from '../../assets/default/default-logo.svg'
import defaultProfile from '../../assets/default/default-profile.png'

export default function Header() {
  const { userInfo, loading } = useFetchUserInfo()
  const navigate = useNavigate()

  const nickname = userInfo?.nickname || userInfo?.username || '사용자'
  const email = userInfo?.email || ''
  const displayName = `${nickname}님`

  return (
    <div className='header'>
      <button type='button' className='header-title header-title--button' onClick={() => navigate('/')}>
        <img src={defaultLogo} alt='HubSpace' className='header-title__logo' />
        <div className='header-title__title'>HubSpace</div>
      </button>
      <div className='header-account'>
        <img src={defaultProfile} alt='기본 프로필' className='header-account__profile' />
        <div className='header-account__info'>
          <div className='header-account__nickname'>{loading ? '불러오는 중...' : displayName}</div>
          <div className='header-account__email'>{loading ? '' : email}</div>
        </div>
      </div>
    </div>
  )
}

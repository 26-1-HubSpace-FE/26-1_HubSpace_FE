import './Header.css'
import { useFetchUserInfo } from './apis/fetchUserInfo'
import { useNavigate } from 'react-router-dom'
import hubspaceLogo from '../../assets/default/hubspace-logo.png'

export default function Header() {
  const { userInfo, loading } = useFetchUserInfo()
  const navigate = useNavigate()

  const nickname = userInfo?.nickname || userInfo?.username || '사용자'
  const email = userInfo?.email || ''
  const displayName = `${nickname}님`

  return (
    <div className='header'>
      <button type='button' className='header-title header-title--button' onClick={() => navigate('/')}>
        <img src={hubspaceLogo} alt='HubSpace' className='header-title__logo' />
      </button>
      <div className='header-account'>
        <div className='header-account__info'>
          <div className='header-account__nickname'>{loading ? '불러오는 중...' : displayName}</div>
          <div className='header-account__email'>{loading ? '' : email}</div>
        </div>
      </div>
    </div>
  )
}

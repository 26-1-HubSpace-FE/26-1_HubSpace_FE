import './Header.css'
import { Icon } from '../icon/Icon'

export default function Header() {
  return (
    <div className='header'>
      <div className='header-title'>
        <Icon name='default-profile' width={60} height={60} className='header-title__logo' />
        <div className='header-title__title'>HubSpace</div>
      </div>
      <div className='header-account'>
        <Icon name='default-profile' width={60} height={60} className='header-accout__profile' />
        <div className='header-account__info'>
          <div className='header-account__nickname'>홍길동님</div>
          <div className='header-account__email'>example@gmail.com</div>
        </div>
      </div>
    </div>
  )
}

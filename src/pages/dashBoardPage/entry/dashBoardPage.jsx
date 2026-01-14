import './DashBoardPage.css'
import EventItem from '../component/EventItem'

export default function DashBoardPage() {
  return (
    <div>
      <div className='dashBoard-header'>
        <div className='dashBoard-header__header'>
          <div className='dashBoard-header__title'>내 이벤트</div>
          <div className='dashBoard-header__info'>생성된 페이지를 손쉽게 관리하세요.</div>
        </div>
        <div className='dashBoard-header__button--new'>+ 새 이벤트</div>
      </div>
      <div className='dashBoard-eventList'>
        <EventItem />
      </div>
    </div>
  )
}

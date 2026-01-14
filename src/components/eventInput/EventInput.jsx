import './EventInput.css'

export default function EventInput() {
  return (
    <div>
      <div className='eventInput-title'>이벤트 관리명</div>
      <div className='eventInput-info'>폼 제복과 다른 관리자에게만 보여지는 관리용 제목입니다.</div>
      <div className='eventInput-input'>
        <input className='eventInput-input-input'></input>
        <div className='eventInput-input-icon'></div>
      </div>
    </div>
  )
}

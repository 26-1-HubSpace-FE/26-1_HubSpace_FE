import DeleteButton from '../../../components/deleteButton/DeleteButton'
import EventButton from '../../../components/eventButton/EventButton'
import EventDropdown from '../../../components/eventDropdown/EventDropdown'
import EventInput from '../../../components/eventInput/EventInput'
import { Icon } from '../../../components/icon/Icon'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { formEvent } from '../utils/FormDetailDummy'
import './FormDetailPage.css'

export default function FormDetailPage() {
  const event = formEvent.data
  const navigate = useNavigate()

  const handleCopyId = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        toast.success('ID가 복사되었습니다!')
      })
      .catch((err) => {
        toast.error('복사 실패', { autoClose: 2000 })
        console.error('복사 실패:', err)
      })
  }

  const handleEdit = () => {
    // 이벤트 수정 로직 구현
    toast.success('이벤트 정보가 수정되었습니다!')
    navigate('/dashboard')
  }

  return (
    <div>
      <div className='formDetail-header'>
        <div className='formDetail-header__title'>이벤트 수정</div>
        <div className='formDetail-header__info'>이벤트 상세 정보를 수정 가능합니다.</div>
      </div>
      <div className='formDetail-identity'>
        <div className='formDetail-id'>
          <div className='formDetail-id__title'>
            <div className='formDetail-id__id'>{`이벤트 ID : ${event.id}`}</div>
            <Icon
              name='detail-copy'
              height={14}
              className='formDetail-id__copy'
              onClick={() => handleCopyId(event.id)}
            />
          </div>
          <div className='formDetail-id__info'>이벤트 고유 ID이며, 어디에 사용됩니다.</div>
        </div>
        <div className='formDetail-name'>
          <EventInput />
        </div>
      </div>
      <div className='formDetail-field'>
        <div className='formDetail-field__header'>
          <div className='formDetail-field__title'>조회 인증 정보</div>
          <div className='formDetail-field__info'>
            신청자가 조회 시 입력할 정보 필드입니다. 추가 수정은 불가합니다.
          </div>
          <div className='formDetail-field__field'>
            <EventDropdown columns={event.searchColumns} disabled={true} />
          </div>
        </div>
      </div>
      <div className='formDetail-footer'>
        <DeleteButton />
        <EventButton text='이벤트 수정' onClick={handleEdit} />
      </div>
    </div>
  )
}

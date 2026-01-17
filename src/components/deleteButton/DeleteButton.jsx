import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import './DeleteButton.css'

export default function DeleteButton() {
  const navigate = useNavigate()

  const handleConfirmDelete = () => {
    toast.dismiss() // 기존 toast 닫기
    toast.success('이벤트가 종료되었습니다!', { autoClose: 2000 })
    navigate('/dashboard')
  }

  const handleDelete = () => {
    toast(
      ({ closeToast }) => (
        <div className='deleteToast'>
          <div className='deleteToast__message'>정말로 이벤트를 종료하시겠습니까?</div>
          <div className='deleteToast__actions'>
            <button
              className='deleteToast__button deleteToast__button--cancel'
              onClick={closeToast}
            >
              취소
            </button>
            <button
              className='deleteToast__button deleteToast__button--confirm'
              onClick={handleConfirmDelete}
            >
              종료
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      },
    )
  }

  return (
    <div className='deleteButton' onClick={handleDelete}>
      이벤트 종료
    </div>
  )
}

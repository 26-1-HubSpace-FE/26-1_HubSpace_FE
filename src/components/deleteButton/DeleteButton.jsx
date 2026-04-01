import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import './DeleteButton.css'

export default function DeleteButton() {
  const navigate = useNavigate()

  const handleConfirmDelete = () => {
    toast.dismiss() // 기존 toast 닫기
    toast.success('이벤트가 종료되었습니다!', { duration: 2000 })
    navigate('/dashboard')
  }

  const handleDelete = () => {
    toast.custom((toastId) => (
        <div className='deleteToast'>
          <div className='deleteToast__message'>정말로 이벤트를 종료하시겠습니까?</div>
          <div className='deleteToast__actions'>
            <button
              className='deleteToast__button deleteToast__button--cancel'
              onClick={() => toast.dismiss(toastId)}
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
      ))
  }

  return (
    <div className='deleteButton' onClick={handleDelete}>
      이벤트 종료
    </div>
  )
}

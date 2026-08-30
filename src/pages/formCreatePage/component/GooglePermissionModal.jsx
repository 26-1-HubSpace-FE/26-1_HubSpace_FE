import { useEffect } from 'react'
import './GooglePermissionModal.css'

export default function GooglePermissionModal({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className='googlePermissionModal-overlay' onClick={onClose}>
      <div
        className='googlePermissionModal-content'
        role='dialog'
        aria-modal='true'
        aria-labelledby='googlePermissionModal-title'
        aria-describedby='googlePermissionModal-description'
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type='button'
          className='googlePermissionModal-close'
          aria-label='닫기'
          onClick={onClose}
        >
          ✕
        </button>

        <div className='googlePermissionModal-header'>
          <div id='googlePermissionModal-title' className='googlePermissionModal-title'>
            Google 권한이 필요합니다
          </div>
          <p id='googlePermissionModal-description' className='googlePermissionModal-description'>
            Google Form을 생성하고 수정하려면 다음 권한을 허용해주세요.
          </p>
        </div>

        <ul className='googlePermissionModal-permissions'>
          <li>Google Drive에 Form 파일 생성</li>
          <li>Google Forms의 질문 및 설정 수정</li>
        </ul>

        <div className='googlePermissionModal-actions'>
          <button
            type='button'
            className='googlePermissionModal-button googlePermissionModal-button--cancel'
            onClick={onClose}
          >
            취소
          </button>
          <button
            type='button'
            className='googlePermissionModal-button googlePermissionModal-button--confirm'
            onClick={onConfirm}
            autoFocus
          >
            Google 권한 허용하기
          </button>
        </div>
      </div>
    </div>
  )
}

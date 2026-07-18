import './EventTitleEditModal.css'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { apiPatchPrivate } from '../../../utils/ApiUtil'

export default function EventTitleEditModal({ event, onClose, onUpdated }) {
  const [eventTitle, setEventTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!event) return
    setEventTitle(event.eventTitle ?? '')
  }, [event])

  useEffect(() => {
    if (!event || isSubmitting) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [event, isSubmitting, onClose])

  if (!event) return null

  const trimmedTitle = eventTitle.trim()
  const isValid = trimmedTitle.length > 0 && trimmedTitle !== event.eventTitle

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid || isSubmitting) return

    try {
      setIsSubmitting(true)
      const res = await apiPatchPrivate(`/v1/events/${event.id}/title`, {
        eventTitle: trimmedTitle,
      })
      const isSuccess = res?.isSuccess ?? res?.success ?? true

      if (!isSuccess) {
        toast.error(res?.message || '이벤트 이름 수정에 실패했습니다.', { duration: 2000 })
        return
      }

      onUpdated(event.id, trimmedTitle)
      toast.success('이벤트 이름이 수정되었습니다!')
      onClose()
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || '이벤트 이름 수정에 실패했습니다.'
      toast.error(message, { duration: 2000 })
      console.error('이벤트 이름 수정 실패:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='editTitleModal-overlay' onClick={handleClose}>
      <div
        className='editTitleModal-content'
        role='dialog'
        aria-modal='true'
        aria-labelledby='editTitleModal-title'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type='button'
          className='editTitleModal-close'
          aria-label='닫기'
          onClick={handleClose}
          disabled={isSubmitting}
        >
          ✕
        </button>

        <div className='editTitleModal-header'>
          <div id='editTitleModal-title' className='editTitleModal-header__title'>
            이름 수정
          </div>
          <div className='editTitleModal-header__info'>새로운 이벤트 이름을 입력해주세요.</div>
        </div>

        <form className='editTitleModal-form' onSubmit={handleSubmit}>
          <input
            id='editTitleModal-input'
            className='editTitleModal-input'
            aria-label='이벤트 이름'
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder='이벤트 이름을 입력하세요.'
            autoFocus
            disabled={isSubmitting}
          />

          <div className='editTitleModal-actions'>
            <button
              type='button'
              className='editTitleModal-button editTitleModal-button--cancel'
              onClick={handleClose}
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type='submit'
              className='editTitleModal-button editTitleModal-button--submit'
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? '수정 중...' : '수정'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

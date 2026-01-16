import DeleteButton from '../../../components/deleteButton/DeleteButton'
import EventButton from '../../../components/eventButton/EventButton'
import EventDropdown from '../../../components/eventDropdown/EventDropdown'
import EventInput from '../../../components/eventInput/EventInput'
import './FormDetailPage.css'

export default function FormDetailPage() {
  return (
    <div>
      <div className='formDetail-header'>
        <div className='formDetail-header__title'></div>
        <div className='formDetail-header__info'></div>
      </div>
      <div className='formDetail-identity'>
        <div className='formDetail-id'>
          <div className='formDetail-id__title'>
            <div className='formDetail-id__id'></div>
            <div className='formDetail-id__copy'></div>
          </div>
          <div className='formDetail-id__info'></div>
        </div>
        <div className='formDetail-name'>
          <EventInput />
        </div>
      </div>
      <div className='formDetail-field'>
        <div className='formDetail-field__header'>
          <div className='formDetail-field__title'></div>
          <div className='formDetail-field__info'></div>
          <div className='formDetail-field__field'>
            <EventDropdown />
            <EventDropdown />
            <EventDropdown />
          </div>
        </div>
      </div>
      <div className='formDetail-footer'>
        <DeleteButton />
        <EventButton />
      </div>
    </div>
  )
}

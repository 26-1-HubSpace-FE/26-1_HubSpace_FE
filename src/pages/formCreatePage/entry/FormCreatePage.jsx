import './FormCreatePage.css'
import EventInput from '../../../components/eventInput/EventInput'
import EventDropdown from '../../../components/eventDropdown/EventDropdown'
import EventButton from '../../../components/eventButton/EventButton'

export default function FormCreatePage() {
  return (
    <div>
      <div className='formCreate-header'>
        <div className='formCreate-title'></div>
        <div className='formCreate-info'></div>
      </div>
      <div className='formCreate-name'>
        <EventInput />
      </div>
      <div className='formCreate-field'>
        <div className='formCreate-field__header'>
          <div className='formCreate-field__title'></div>
          <div className='formCreate-field__info'></div>
          <div className='formCreate-field__field'>
            <EventDropdown />
            <EventDropdown />
            <EventDropdown />
          </div>
          <div className='fromCreate-field__notice'></div>
        </div>
      </div>
      <EventButton />
    </div>
  )
}

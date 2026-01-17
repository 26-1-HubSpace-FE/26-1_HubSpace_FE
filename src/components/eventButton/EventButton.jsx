import './EventButton.css'

export default function EventButton({ text, onClick }) {
  return (
    <div>
      <button className='eventButton-button' onClick={onClick}>
        {text}
      </button>
    </div>
  )
}

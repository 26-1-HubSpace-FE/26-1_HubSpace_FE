import './PolicyPage.css'

export default function PolicyPage({ title, src }) {
  return (
    <div className='policy-page'>
      <iframe
        src={src}
        title={title}
        className='policy-page__frame'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      />
    </div>
  )
}

import './LoadingSpinner.css'

export default function LoadingSpinner({
  size = 40,
  cubeSize = 15,
  color = '#333333',
  className = '',
}) {
  return (
    <div
      className={`loadingSpinner ${className}`.trim()}
      style={{
        '--spinner-size': `${size}px`,
        '--spinner-cube-size': `${cubeSize}px`,
        '--spinner-color': color,
      }}
      aria-label='로딩 중'
      role='status'
    >
      <div className='loadingSpinner__cube loadingSpinner__cube--first'></div>
      <div className='loadingSpinner__cube loadingSpinner__cube--second'></div>
    </div>
  )
}

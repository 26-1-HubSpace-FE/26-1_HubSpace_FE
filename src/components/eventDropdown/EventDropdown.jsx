import './EventDropdown.css'
import { useState } from 'react'
import { Icon } from '../icon/Icon'

export default function EventDropdown({
  columns = [],
  disabled = false,
  value = ['선택', '선택', '선택'],
  onChange,
}) {
  const labels = ['정보 1', '정보 2', '정보 3']
  const [openIndex, setOpenIndex] = useState(null)

  const toggleDropdown = (index) => {
    if (!disabled) setOpenIndex(openIndex === index ? null : index)
  }

  const selectColumn = (index, col) => {
    if (disabled) return

    const newValues = [...value]
    newValues[index] = col
    onChange(newValues)
    setOpenIndex(null)
  }

  return (
    <div className='eventDropdown-multi'>
      {value.map((val, index) => (
        <div key={index} className={`eventDropdown ${disabled ? 'eventDropdown--disabled' : ''}`}>
          <div className='eventDropdown__label'>{labels[index]}</div>

          <div className='eventDropdown__toggle' onClick={() => toggleDropdown(index)}>
            <div className='eventDropdown__title'>{val}</div>
            {!disabled && (
              <Icon
                name='detail-field'
                height={4}
                className={`eventDropdown__arrow ${
                  openIndex === index ? 'eventDropdown__arrow--open' : ''
                }`}
              />
            )}
          </div>

          {openIndex === index && (
            <div className='eventDropdown__list'>
              {columns.map((col, idx) => (
                <div
                  key={idx}
                  className='eventDropdown__item'
                  onClick={() => selectColumn(index, col)}
                >
                  {col}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

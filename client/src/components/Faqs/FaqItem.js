import { useEffect, useRef, useState } from 'react'
import { getRefValue } from '../../lib/hooks'
import './Faq.css'

export const FaqItem = ({ data, isOpen, btnOnClick }) => {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (isOpen) {
      const contentEl = getRefValue(contentRef)

      setHeight(contentEl.scrollHeight)
    } else {
      setHeight(0)
    }
  }, [isOpen])

  return (
    <li className={`accordion-item ${isOpen ? 'active' : ''}`}>
      <h2 className='accordion-item-title'>
        <button className='accordion-item-btn' onClick={btnOnClick}>
          {data.question}
        </button>
      </h2>
      <div className='accordion-item-container' style={{ height }}>
        <div ref={contentRef} className='accordion-item-content'>
          {data.answer}
        </div>
      </div>
    </li>
  )
}

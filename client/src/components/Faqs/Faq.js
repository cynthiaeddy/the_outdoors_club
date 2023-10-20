import { useState } from 'react'
import { FaqItem } from './FaqItem'
import './Faq.css'

export const Faq = ({ items }) => {
  const [currentIdx, setCurrentIdx] = useState(-1)
  const btnOnClick = (idx) => {
    setCurrentIdx((currentValue) => (currentValue !== idx ? idx : -1))
  }

  return (
    <ul className='accordion'>
      {items.map((item, idx) => (
        <FaqItem
          key={idx}
          data={item}
          isOpen={idx === currentIdx}
          btnOnClick={() => btnOnClick(idx)}
        />
      ))}
    </ul>
  )
}

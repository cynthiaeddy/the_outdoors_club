import React from 'react'
import { ContactUs } from '../ContactUs/ContactUs'
import './Modals.css'

export const ModalContactUs = ({ isOpen = true, modalContactUsClose }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className='ModalWrapper'>
      <div className='ModalContainer contact'>
        <ContactUs modalContactUsClose={modalContactUsClose} />
      </div>
    </div>
  )
}

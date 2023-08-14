import React from 'react'
import { ContactUs } from '../ContactUs/ContactUs'
import './Modals.css'



export const ModalContactUs = ({
  isOpen = true,
  modalContactUsClose,
}) => {
  // if isOpen is false, dont render anything
  if (!isOpen) {
    return null
  }

  // if isOpen is true, render the modal
  return (
    <div className='ModalWrapper'>
      <div className='ModalContainer'>
        <ContactUs modalContactUsClose={modalContactUsClose} />
      </div>
    </div>
  )
}

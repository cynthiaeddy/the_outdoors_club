import React from 'react'
import './Modals.css'
import { TermsAndConditions } from '../TermsAndConditions/TermsAndConditions'



export const ModalTerms = ({
  isOpen = true,
  modalTermsClose,
}) => {
  // if isOpen is false, dont render anything
  if (!isOpen) {
    return null
  }

  // if isOpen is true, render the modal
  return (
    <div className='ModalWrapper'>
      <div className='ModalContainer '>
        <TermsAndConditions modalTermsClose={modalTermsClose} />
      </div>
    </div>
  )
}

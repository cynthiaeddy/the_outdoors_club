import React from 'react'
import './Modals.css'
import { TermsAndConditions } from '../TermsAndConditions/TermsAndConditions'

export const ModalTerms = ({ isOpen = true, modalTermsClose }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className='ModalWrapper'>
      <div className='ModalContainer '>
        <TermsAndConditions modalTermsClose={modalTermsClose} />
      </div>
    </div>
  )
}

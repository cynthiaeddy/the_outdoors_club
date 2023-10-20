import React from 'react'
import { Login } from '../Login/Login'
import './Modals.css'

export const ModalLogin = ({
  isOpen = true,
  modalLoginClose,
  modalUserAcctClose,
}) => {
  // if isOpen is false, dont render anything
  if (!isOpen) {
    return null
  }

  // if isOpen is true, render the modal
  return (
    <div className='ModalWrapper'>
      <div className='ModalContainer'>
        <Login
          modalLoginClose={modalLoginClose}
          modalUserAcctClose={modalUserAcctClose}
        />
      </div>
    </div>
  )
}

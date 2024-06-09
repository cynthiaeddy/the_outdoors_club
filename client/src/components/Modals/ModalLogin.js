import React from 'react'
import { Login } from '../Login/Login'
import './Modals.css'

export const ModalLogin = ({
  isOpen = true,
  modalLoginClose,
  modalUserAcctClose,
}) => {
  if (!isOpen) {
    return null
  }

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

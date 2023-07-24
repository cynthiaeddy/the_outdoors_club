import React from 'react'
import { Login } from '../Login/Login'
import './Modals.css'



export const ModalForgotPassword = ({
  isOpen = true,
  modalForgotPasswordClose,
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className='ModalWrapper'>
      <div className='ModalContainer'>
        <Login modalForgotPasswordClose={modalForgotPasswordClose} />
      </div>
    </div>
  )
}

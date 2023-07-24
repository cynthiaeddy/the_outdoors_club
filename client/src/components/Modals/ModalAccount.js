import React from 'react'
import './Modals.css'
import { UserAccount } from '../UserAccount/UserAccount'



export const ModalAccount = ({
  isOpen = true,
  modalUserAcctClose,
}) => {
  // if isOpen is false, dont render anything
  if (!isOpen) {
    return null
  }

  // if isOpen is true, render the modal
  return (
    <div className='ModalWrapper'>
      <div className='ModalContainer '>
        <UserAccount modalUserAcctClose={modalUserAcctClose} />
      </div>
    </div>
  )
}

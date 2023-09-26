import {useEffect } from 'react'
import './Modals.css'
import { UserAccount } from '../UserAccount/UserAccount'

export const ModalAccount = ({
  isOpen = true,
  modalUserAcctClose,
  modalUserAcctCloseSignup,
  timeSignup,
  time,
}) => {

  useEffect(() => {
    if (time > timeSignup) {
      if (Date.now() - time >= 180000060*30) {
        modalUserAcctClose()
      }
    }
    if (time < timeSignup) {
      if (Date.now() - timeSignup >= 180000060*30) {
        modalUserAcctCloseSignup()
      }
    }
  },)

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

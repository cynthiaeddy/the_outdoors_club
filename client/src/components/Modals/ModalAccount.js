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

  console.log(time, timeSignup, Date.now(), Date.now() - time >= 12000, 'in modal account, time, timeSignup,date')
  console.log(time > timeSignup, 'time > timeSignup')
  useEffect(() => {
    if (time > timeSignup) {
      if (Date.now() - time >= 12000) {
        modalUserAcctClose()
      }
    } else if (time < timeSignup) {
      if (Date.now() - timeSignup >= 12000) {
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

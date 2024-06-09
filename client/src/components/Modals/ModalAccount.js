import { useEffect } from 'react'
import './Modals.css'
import { UserAccount } from '../UserAccount/UserAccount'

export const ModalAccount = ({ isOpen = true, modalUserAcctClose }) => {
  const user = localStorage.getItem('token')

  useEffect(() => {
    if (!user) {
      modalUserAcctClose()
    }
  })

  if (!isOpen) {
    return null
  }

  return (
    <div className='ModalWrapper'>
      <div className='ModalContainer '>
        <UserAccount modalUserAcctClose={modalUserAcctClose} />
      </div>
    </div>
  )
}

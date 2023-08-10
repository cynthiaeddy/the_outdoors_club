import './Modals.css'
import { GrClose } from 'react-icons/gr'



export const ModalDuplicateEmail = ({
  isOpen = true,
  setErrorMessage
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className='ModalWrapper'>
      <div className='ModalContainer'>
        <div className='ModalEmail'>
          <button
            type='button'
            onClick={setErrorMessage}
            className='ModalContainer-button'>
            <GrClose />
          </button>
          <h3>Email already in use.</h3>
        </div>
      </div>
    </div>
  )
}

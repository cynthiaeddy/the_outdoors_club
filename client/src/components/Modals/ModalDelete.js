import './Modals.css'
import { GrClose } from 'react-icons/gr'

export const ModalDelete = ({ handleDeleteTrue, handleDeleteFalse }) => {
  return (
    <div className='ModalWrapper'>
      <div className='ModalContainer'>
        <div className='ModalDelete'>
          <button
            type='button'
            onClick={handleDeleteFalse}
            className='ModalContainer-button'
          >
            <GrClose />
          </button>
          <h3>You sure you wanna delete?</h3>
          <button onClick={handleDeleteFalse} className='cta-button delete'>
            Cancel
          </button>{' '}
          <button onClick={handleDeleteTrue} className='cta-button delete'>
            confirm
          </button>
        </div>
      </div>
    </div>
  )
}

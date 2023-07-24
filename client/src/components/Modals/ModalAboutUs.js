import './Modals.css'
import { GrClose } from 'react-icons/gr'



export const ModalAboutUs = ({
  isOpen = true,
  modalAboutUsClose,
}) => {
  if (!isOpen) {
    return null
  }
  return (
    <div className='ModalWrapper'>
      <div className='ModalContainer'>
        <div className='ModalDelete'>
          <button
            type='button'
            onClick={modalAboutUsClose}
            className='ModalContainer-button'>
            <GrClose />
          </button>
          <h3 className='Home_about-text'>
            The Outdoors Club is dedicated to developing interest, appreciation
            and knowledge of our natural environment and local attractions by
            leading walks and hikes in parks, pathways, urban locales and
            historical neighborhoods. Open to adults 18 and over, outings occur
            all-year, usually during the weekends. We hike/walk around the New
            York City area and the broader Tri-State area. All activities are
            accessible by public transportation. Launched in 1978, the Outdoors
            Club is a 501(c)(3) non-profit organization, funded entirely by
            membership dues. Our dedicated hike leaders and staff, all
            volunteers happily share their time and expertise with the Outdoors
            Club community.
          </h3>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import './Footer.css'
import { ModalAboutUs } from '../Modals/ModalAboutUs'
import { ModalContactUs } from '../Modals/ModalContactUs'

export const Footer = ({isMobile}) => {
  const [isModalAboutUsOpen, setIsModalAboutUsOpen] = useState(false)
  const [isModalContactUsOpen, setIsModalContacyUsOpen] = useState(false)

  const modalAboutUsClose = () => {
    setIsModalAboutUsOpen(false)
  }
  const modalAboutUsOpen = () => {
    setIsModalAboutUsOpen(true)
  }

  const modalContactUsClose = () => {
    setIsModalContacyUsOpen(false)
  }
  const modalContactUsOpen = () => {
    setIsModalContacyUsOpen(true)
  }

  return (
    <>
      <div className='FooterContainer'>
        <div className='Footer_links'>
        <button className='Footer_text button' onClick={modalContactUsOpen}>
            Contact Us
          </button>{' '}
          <button className='Footer_text button' onClick={modalAboutUsOpen}>
            About Us
          </button>{' '}
          <h3 className='Footer_text'>
            {!isMobile ?  <a
              href='https://www.meetup.com/outdoorsclubny'
              target='_blank'
              rel="noopener noreferrer"
              className='Footer_text'>
              Meetup Link
            </a>: <a
              href='https://www.meetup.com/outdoorsclubny'
              className='Footer_text'>
              Meetup Link
            </a>}
          </h3>
        </div>
        <div className='Footer_me'>
          {!isMobile ?  <a href={'https://cynthiaeddy.netlify.app/'} target='_blank'
              rel="noopener noreferrer">
            <h6>Built and Designed by Cynthia Eddy</h6>
          </a>:  <a href={'https://cynthiaeddy.netlify.app/'} >
            <h6>Built and Designed by Cynthia Eddy</h6>
          </a>}
        </div>
      </div>
      <ModalContactUs
        isOpen={isModalContactUsOpen}
        modalContactUsClose={modalContactUsClose}
      />
      <ModalAboutUs
        isOpen={isModalAboutUsOpen}
        modalAboutUsClose={modalAboutUsClose}
      />
    </>
  )
}

import { useState } from 'react'
import './Footer.css'
// import { ModalAboutUs } from '../Modals/ModalAboutUs'

export const Footer = () => {
  const [isModalAboutUsOpen, setIsModalAboutUsOpen] = useState(false)

  const modalAboutUsClose = () => {
    setIsModalAboutUsOpen(false)
  }
  const modalAboutUsOpen = () => {
    setIsModalAboutUsOpen(true)
  }

  return (
    <>
      <div
        className='
  FooterContainer'>
        <div className='Footer_links'>
          <h3 className='Footer_text'>
            <a href='mailto:outdoorsclubny@yahoo.com' className='Footer_text'>
              Contact Us
            </a>
          </h3>
          <button className='Footer_text button' onClick={modalAboutUsOpen}>
            About Us
          </button>{' '}
          <h3 className='Footer_text'>
            <a
              href='https://www.meetup.com/outdoorsclubny'
              className='Footer_text'>
              Meetup Link
            </a>
          </h3>
        </div>
        <div className='Footer_me'>
          <a href={'https://cynthiaeddy.netlify.app/'}>
            <h6>Built and Designed by Cynthia Eddy</h6>
          </a>
        </div>
      </div>
      {/* <ModalAboutUs
        isOpen={isModalAboutUsOpen}
        modalAboutUsClose={modalAboutUsClose}
      /> */}
    </>
  )
}

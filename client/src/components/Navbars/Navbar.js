/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import outdoors_logo from '../../assets/outdoors_logo.png'
import { UserContext } from '../../context'
import { ModalLogin } from '../Modals/ModalLogin'
import { ModalAccount } from '../Modals/ModalAccount'
import { NavbarMobile } from './NavbarMobile'
import './Navbar.css'

export const Navbar = ({ isMobile = true }) => {
  const [state, setState] = useContext(UserContext)

  const navigate = useNavigate()
  const user = localStorage.getItem('token')

  const admin = state.data?.role === 'admin'
  const leader = state.data?.role === 'leader'
  const userRole = state.data?.role === 'user'
  const userName = state.data?.firstName

  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false)

  const [isModalUserAcctOpen, setIsModalUserAcctOpen] = useState(false)

  const modalLoginClose = () => {
    setIsModalLoginOpen(false)
  }

  const modalLoginOpen = () => {
    setIsModalLoginOpen(true)
  }

  const modalUserAcctClose = () => {
    setIsModalUserAcctOpen(false)
  }
  const modalUserAcctOpen = () => {
    setIsModalUserAcctOpen(true)
  }

  const logout = () => {
    setState({ data: null, loading: false, error: null })
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <>
      <nav className={`NavbarContainer ${!isMobile ? '' : ' mobile'}`}>
        {!isMobile ? (
          <ul className='Navbar-items'>
            <div className='Navbar-logo'>
              <img src={outdoors_logo} className='logo' alt='outdoors logo' />
            </div>
            <li className='nav-item'>
              <NavLink to='/' className='nav-links'>
                home
              </NavLink>
            </li>

            {user && leader && (
              <li className='nav-item'>
                <NavLink to='/leader' className='nav-links'>
                  leader
                </NavLink>
              </li>
            )}

            {user && admin && (
              <li className='nav-item'>
                <NavLink to='/admin' className='nav-links'>
                  admin
                </NavLink>
              </li>
            )}
            {user && userRole && (
              <>
                <li className='nav-item'>
                  <button onClick={modalUserAcctOpen} className='nav-links'>
                    {userName}'s Account
                  </button>
                </li>
              </>
            )}

            {user ? (
              <li className='nav-item'>
                <button className='nav-links' onClick={logout}>
                  sign out
                </button>
              </li>
            ) : (
              <>
                <li className='nav-item'>
                  <button
                    type='button'
                    onClick={modalLoginOpen}
                    className='nav-links'
                  >
                    log In
                  </button>
                </li>

                <li className='nav-item'>
                  <NavLink to='/signup' className='nav-links'>
                    sign up
                  </NavLink>
                </li>
              </>
            )}
            <li className='nav-item'>
              <NavLink
                to='https://www.meetup.com/outdoorsclubny'
                className='nav-links'
                target='_blank'
                rel='noopener noreferrer'
              >
                meetup link
              </NavLink>
            </li>
          </ul>
        ) : (
          <NavbarMobile
            user={user}
            admin={admin}
            leader={leader}
            userRole={userRole}
            logout={logout}
          />
        )}
      </nav>
      <ModalAccount
        isOpen={isModalUserAcctOpen}
        modalUserAcctClose={modalUserAcctClose}
      />
      <ModalLogin
        isOpen={isModalLoginOpen}
        modalLoginClose={modalLoginClose}
        modalUserAcctClose={modalUserAcctClose}
      />
    </>
  )
}

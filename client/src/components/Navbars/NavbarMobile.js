import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MenuButton } from './MenuButton'
import outdoors_logo from '../../assets/outdoors_logo.png'
import './NavbarMobile.css'

export const NavbarMobile = ({
  user,
  admin,
  leader,
  userRole,
  logout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [click, setClick] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setDropdown(!dropdown)
    setClick(!click)
  }

  const toggleMenuNav = () => {
    setIsMenuOpen(false)
    setDropdown(false)
  }
  return (
    <>
      <div className='Navbar-logo mobile'>
        <img src={outdoors_logo} className='logo-mobile' alt='outdoors logo' />
      </div>
      <div className='ex'>
        <input type='checkbox' id='chk' />
        <label htmlFor='chk' className='show-menu-btn' onClick={toggleMenu}>
          <MenuButton isOpen={isMenuOpen} />
        </label>
        {dropdown && (
          <ul className={`menu ${!click ? 'clicked' : ''}`}>
            <li className='nav-item mobile'>
              <NavLink to='/' className='nav-links' onClick={toggleMenuNav}>
                home
              </NavLink>
            </li>
            {user && leader && (
              <li className='nav-item mobile'>
                <NavLink
                  to='/leader'
                  className='nav-links'
                  onClick={toggleMenuNav}>
                  leader
                </NavLink>
              </li>
            )}
            {user && admin && (
              <li className='nav-item mobile'>
                <NavLink
                  to='/admin'
                  className='nav-links'
                  onClick={toggleMenuNav}>
                  admin
                </NavLink>
              </li>
            )}
            {user && userRole && (
              <>
                <li className='nav-item mobile'>
                  <NavLink
                    to='/account'
                    className='nav-links'
                    onClick={toggleMenuNav}>
                    account
                  </NavLink>
                </li>
              </>
            )}
            {user ? (
              <li className='nav-item mobile'>
                <button className='nav-links sign-out' onClick={logout}>
                  sign out
                </button>
              </li>
            ) : (
              <>
                <li className='nav-item mobile'>
                  <NavLink
                    to='/signin'
                    className='nav-links log-in'
                    onClick={toggleMenuNav}>
                    log in
                  </NavLink>
                </li>
                <li className='nav-item mobile'>
                  <NavLink
                    to='/signup'
                    className='nav-links'
                    onClick={toggleMenuNav}>
                    sign up
                  </NavLink>
                </li>
              </>
            )}
            <li className='nav-item mobile'>
              <NavLink
                to='https://www.meetup.com/outdoorsclubny'
                className='nav-links'
                onClick={toggleMenuNav}
                target='_blank'
                rel="noopener noreferrer">
                meetup link
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </>
  )
}

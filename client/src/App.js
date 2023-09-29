import './App.css'
import { useContext, useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbars/Navbar'
import { Footer } from './components/Footer/Footer'
import { Signup } from './pages/Signup/Signup'
import { LoginMobile } from './components/Login/LoginMobile'
import { EditUser } from './pages/EditUser/EditUser'
import { Admin } from './pages/Admin/Admin'
import { Leader } from './pages/Leader/Leader'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { UserAccount } from './components/UserAccount/UserAccount'
import { UserAccountMobile } from './components/UserAccount/UserAccountMobile'
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword/ResetPassword'
import { StripeSuccess } from './pages/Stripe/StripeSuccess'
import { Home } from './pages/Home/Home'

import { UserContext } from './context'
import ScrollToHashElement from './helpers/ScrollToHashElement'



const App = () => {
  const [state] = useContext(UserContext)

  const user = state.data

  const getIsMobile = () => window.innerWidth <= 768
  const [isMobile, setIsMobile] = useState(getIsMobile)

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(getIsMobile)
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])





  let routes
  routes = (
    <Routes>
      <Route path='/signup' element={<Signup isMobile={isMobile}  />} />
      <Route path='/signin' element={<LoginMobile  />}  />

      <Route path='/' element={<Home isMobile={isMobile} />} />

      {/* <Route path='/donate' element={<Donate />} /> */}
      <Route
        path='/forgot-password'
        element={
          <ForgotPassword
            modalLoginClose={function () {
              throw new Error('Function not implemented.')
            }}
          />
        }
      />
      <Route
        path='/reset/:token'
        element={<ResetPassword isMobile={isMobile} />}
      />

       <Route
        element={
          <ProtectedRoute isAllowed={!!user && user.role === 'admin'} />
        }>
        <Route path='/admin' element={<Admin />} />
      </Route>
      <Route
        element={
          <ProtectedRoute isAllowed={!!user && user.role === 'leader'} />
        }>
        <Route path='/leader' element={<Leader />} />
      </Route>
      <Route
        element={<ProtectedRoute isAllowed={!!user && user.role === 'user'} />}>
        <Route
          path='/account'
          element={
            isMobile ? (
              <UserAccountMobile />
      ) : (
     <UserAccount modalUserAcctClose={function () {
      throw new Error('Function not implemented.')
    }}/>
            )
          }
        />
      <Route path='/edit' element={<EditUser isMobile={isMobile} />} />
       <Route path='/success' element={<StripeSuccess />} />
    </Route>
    </Routes>
  )
  return (
    <>
      <main className='AppContainer'>
      <Navbar isMobile={isMobile } />
        <ScrollToHashElement />
        {routes}
        <Footer isMobile={isMobile}/>
      </main>
    </>
  )
}
export default App

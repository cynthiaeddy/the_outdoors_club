import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const UserContext = createContext([{ data: null, loading: true, error: null }, () => { }])


const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    data: null,
    loading: true,
    error: null,
  })

  const token = localStorage.getItem('token')

  if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`
  }

  const fetchUser = async () => {

    const { data: resp } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user/me`
    )

    if (resp.data && resp.data.user) {
      setUser({
        data: {
          firstName: resp.data.user.firstName,
          lastName: resp.data.user.lastName,
          id: resp.data.user.id,
          email: resp.data.user.email,
          role: resp.data.user.role,
          address: resp.data.user.address,
          city: resp.data.user.city,
          state: resp.data.user.state,
          zipcode: resp.data.user.zipcode,
          phoneNo: resp.data.user.phoneNo,
          plan: resp.data.user.plan,
          newsletter: resp.data.user.newsletter,
          volunteer: resp.data.user.volunteer,
          agreeToTerms: resp.data.user.agreeToTerms,
          notes: resp.data.user.notes,
        },
        loading: false,
        error: null,
      })
    } else if (resp.data && resp.data.errors.length) {

      setUser({
        data: null,
        loading: false,
        error: resp.data.errors[0].msg,
      })
    }
  }

  useEffect(() => {
    if (token) {
      fetchUser()
    } else {
      setUser({
        data: null,
        loading: false,
        error: null,
      })
    }
  }, [token, setUser])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }

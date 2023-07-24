import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import '../../pages/Signup/Signup.css'

import axios from 'axios'



export const ForgotPassword = ({
  modalLoginClose,
}) => {
  const navigate = useNavigate()
  const [showError, setshowError] = useState(false)
  const [showNullError, setshowNullError] = useState(false)
  const [messageFromServer, setmessageFromServer] = useState('')
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  const closeLoginModal = () => {
    modalLoginClose()
    navigate('/')
  }

  const sendEmail = async (data) => {
    const email = {
      email: data.email,
    }
    if (!email) {
      setshowNullError(true)
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/password/forgot-password`, email)
      // const response = await axios.post('/api/password/forgot-password', email)
      if (response.data === 'recovery email sent') {
        setshowError(false)
        setshowNullError(false)
        setmessageFromServer('recovery email sent')
      }
    } catch (error) {
      if (error.response.data === 'email not in db') {
        setshowError(true)
        setshowNullError(false)
        setmessageFromServer('')
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(sendEmail)} className='Login_form password'>
        <h5 className='Signup-question password open'>
          Please enter your email below, then check your email for a link.
        </h5>
        <aside className='wrap-input Login-forgotPassword password'>
          <div className='fifty password'>
            <label htmlFor='email'></label>
            <input
              type='email'
              {...register('email', {
                required: 'Please enter your email address',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Invalid email address',
                },
              })}
              name='email'
              className='Signup_input'
            />
            <h6 className='Signup-error'>{errors.email?.message}</h6>
            <span>
              <button type='submit' className='cta-button reset'>
                Send Reset Email
              </button>
            </span>
          </div>
        </aside>
        {messageFromServer === 'recovery email sent' && (
          <div>
            <h5 className='Signup-question password'>
              Password Reset Email Successfully Sent!{' '}
              <span>
                <button onClick={closeLoginModal} className='cta-button'>
                  close
                </button>
              </span>
            </h5>
          </div>
        )}
      </form>
    </>
  )
}

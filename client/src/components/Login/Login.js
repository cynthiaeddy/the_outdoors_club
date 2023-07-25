import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../context'
import '../../pages/Signup/Signup.css'
import { GrClose } from 'react-icons/gr'
import { useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { ForgotPassword } from '../ForgotPassword/ForgotPassword'

export const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate()

  const [user, setUser] = useContext(UserContext)
  const [errorMsg, setErrorMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const toggleShow = () => {
    setShowPassword(!showPassword)
  }
  const toggleShowForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword)
  }

  const onSubmit = async (data) => {
    const userLogin = {
      email: data.email,
      password: data.password,
    }

    const { data: resp } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/user/login`,
      userLogin,

      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (resp.errors.length) {
      setErrorMsg(resp.errors[0].msg)
    }

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
    localStorage.setItem('token', resp.data.token)
    axios.defaults.headers.common['authorization'] = `Bearer ${resp.data.token}`
    props.modalLoginClose()
    navigate('/')
  }
  // console.log(user,'in login, user')

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='Login_form'>
        <button
          type='button'
          onClick={props.modalLoginClose}
          className='ModalContainer-button'>
          <GrClose />
        </button>
        <div className='wrap-input'>
          <div className='fifty left'>
            <h5>
              <label htmlFor='email'>Email</label>
            </h5>
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
          </div>
          <div className='fifty left'>
            <h5>
              <label htmlFor='password'>Password</label>
            </h5>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password length minimum is 6',
                },
              })}
              name='password'
              className='Signup_input'
              type={showPassword ? 'text' : 'password'}
            />
            {errors.password && (
              <h6 className='Signup-error'>{errors.password?.message}</h6>
            )}
            <button
              type='button'
              className='Signup_input-button'
              onClick={toggleShow}>
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
        </div>
        <div className='fifty login-button'>
          <button type='submit' className='Login_submit-button'>
            <h4 className='cta-button'>log In</h4>
          </button>

          <h6 className='Signup-error'>{errorMsg}</h6>
        </div>
        <button
          type='button'
          className='cta-button forgot'
          onClick={toggleShowForgotPassword}>
          forgot password?
        </button>
      </form>
      {showForgotPassword ? (
        <ForgotPassword modalLoginClose={props.modalLoginClose} />
      ) : null}
    </>
  )
}

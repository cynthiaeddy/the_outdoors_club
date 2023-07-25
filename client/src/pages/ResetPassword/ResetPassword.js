import { useState, useEffect } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { ModalLogin } from '../../components/Modals/ModalLogin'
import TestimonialDataEdit from '../../components/Testimonials/TestimonialDataEdit'
import { Carousel } from 'react-responsive-carousel'
import { TestimonialItem } from '../../components/Testimonials/TestimonialItem'
import '../Signup/Signup.css'
import '../../components/Testimonials/Testimonials.css'

import axios from 'axios'
import { useParams } from 'react-router-dom'


export const ResetPassword = ({
  isMobile = true,
}) => {
  const [showTestimonials, setshowTestimonials] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(-1)
  const btnOnClick = (idx) => {
    setCurrentIdx(currentValue => (currentValue !== idx ? idx : -1))
    setshowTestimonials(!showTestimonials)
  }
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  let { token } = useParams()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const modalLoginOpen = () => {
    setIsModalLoginOpen(true)
  }

  const modalLoginClose = () => {
    setIsModalLoginOpen(false)
  }

  useEffect(() => {
    const getToken = async () => {
      try {
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/password/reset`, {
          params: {
            resetPasswordToken: token,
          },
        })
        if (resp.data.message === 'password reset link a-ok') {
          setEmail(resp.data.email)
          setError(false)
        }
      } catch (error) {
        setError(true)
      }
    }
    getToken()
  }, [token])

  const updatePassword = async (data) => {
    try {
      const resp = await axios.put(`${process.env.REACT_APP_API_URL}/api/password/updatePasswordViaEmail`, {
        email,
        password: data.password,
        resetPasswordToken: token,
      })

      if (resp.data.message === 'password updated') {
        setError(false)
        modalLoginOpen()
      } else {
        setError(true)
      }
    } catch (error) {
      setErrorMsg(error.response.data)
    }
  }

  const toggleShow = () => {
    setShowPassword(!showPassword)
  }
  return (
    <section className='SignupWrapper reset'>
      <div className='ComponentContainer signup'>
        <section className='TestimonialContainer'>
          <h3 className='Main_hed'>Testimonials</h3>
          <h5 className='Testimonial_instruction'>
            Click on circle arrow to read
          </h5>
          <div
            className={`carousel-wrapper edit-user ${
              !isMobile ? '' : ' mobile'
            }`}>
            {isMobile ? (
              <Carousel
                className='carousel-style edit'
                showThumbs={false}
                infiniteLoop={true}
                autoPlay
                interval={3000}
                transitionTime={1000}
                showIndicators={true}
                showStatus={false}
                showArrows={false}>
                {TestimonialDataEdit.map((foto, idx) => (
                  <TestimonialItem
                    key={idx}
                    data={foto}
                    isOpen={idx === currentIdx}
                    btnOnClick={() => btnOnClick(idx)}
                  />
                ))}
              </Carousel>
            ) : (
              <Carousel
                className='carousel-style edit'
                showThumbs={false}
                infiniteLoop
                autoPlay
                interval={4000}
                transitionTime={1000}
                showIndicators={false}
                centerMode
                centerSlidePercentage={50}
                showStatus={false}
                showArrows={true}>
                {TestimonialDataEdit.map((foto, idx) => (
                  <TestimonialItem
                    key={idx}
                    data={foto}
                    isOpen={idx === currentIdx}
                    btnOnClick={() => btnOnClick(idx)}
                  />
                ))}
              </Carousel>
            )}
          </div>
        </section>
      </div>
      <div className='ComponentContainer signup too'>
        <div className='SignupContainer'>
          <h3 className='Main_hed signup'>Reset Password</h3>
          <form className='Signup_form' onSubmit={handleSubmit(updatePassword)}>
            <div className='wrap-input'>
              <div className='fifty left'>
                <h5>
                  <label htmlFor='password'>Password</label>
                </h5>
                <input
                  {...register('password', {
                    required: 'Minimum length is 6',
                    minLength: 6,
                  })}
                  name='password'
                  className='Signup_input'
                  type={showPassword ? 'text' : 'password'}
                />
                <h6 className='Signup-error'>{errors.password?.message}</h6>
                <button
                  type='button'
                  className='Signup_input-button'
                  onClick={toggleShow}>
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>
              <div className='fifty left'>
                <h5>
                  <label htmlFor='confirm Password'>Confirm Password</label>
                </h5>
                <input
                  {...register('confirmPassword', {
                    required: true,
                    validate: (val) => {
                      if (watch('password') !== val) {
                        return 'Your passwords do no match'
                      }
                    },
                  })}
                  name='confirmPassword'
                  className='Signup_input'
                  type={showPassword ? 'text' : 'password'}
                />
                <h6 className='Signup-error'>
                  {errors.confirmPassword?.message}
                </h6>
              </div>
            </div>
            <button type='submit' className='cta-button reset'>
              reset password
            </button>
            <h6 className='Signup-error'>{errorMsg}</h6>
          </form>
        </div>
      </div>
      <ModalLogin isOpen={isModalLoginOpen} modalLoginClose={modalLoginClose} />
    </section>
  )
}

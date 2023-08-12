import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { UserContext } from '../../context'
import { states } from '../../constants/states'
import { Carousel } from 'react-responsive-carousel'

import { TestimonialItem } from '../../components/Testimonials/TestimonialItem'

import '../Signup/Signup.css'
import '../../components/Testimonials/Testimonials.css'

import TestimonialDataEdit from '../../components/Testimonials/TestimonialDataEdit'
import { useForm } from 'react-hook-form'
import { MemberExtend } from '../../components/MemberExtend/MemberExtend'


export const EditUser = ({ isMobile = true }) => {
  const [showTestimonials, setshowTestimonials] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(-1)
  const btnOnClick = (idx) => {
    setCurrentIdx(currentValue => (currentValue !== idx ? idx : -1))
    setshowTestimonials(!showTestimonials)
  }

  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)
  const [showPassword, setShowPassword] = useState(false)
  const [state, setState] = useState(user.data?.state)

  const userId = user.data?.id
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: user.data?.firstName,
      lastName: user.data?.lastName,
      email: user.data?.email,
      password: '',
      confirmPassword: '',
      address: user.data?.address,
      city: user.data?.city,
      zipcode: user.data?.zipcode,
      phoneNo: user.data?.phoneNo,
      volunteer: user.data?.volunteer,
      newsletter: user.data?.newsletter,
      notes: user.data?.notes,
      role: user.data?.role,
    },
  })

  const handleRegion = (e) => {
    setState(e.target.value)
  }

  const onSubmit = async (data) => {
    const userEdit = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      phoneNo: data.phoneNo,
      city: data.city,
      address: data.address,
      zipcode: data.zipcode,
      volunteer: data.volunteer,
      newsletter: data.newsletter,
      state,
      notes: data.notes,
      role: data.role,

    }
    console.log(userEdit, 'userEdit in edit user')
    const { data: resp } = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
      userEdit,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
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
    navigate('/')
  }

  const toggleShow = () => {
    setShowPassword(!showPassword)
  }
  return (
    // <section className='SignupWrapper'>
          <>

      <div className='ComponentContainer signup edit-user'>
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
      <div className='ComponentContainer edit'>
        <div className='SignupContainer edit' id='edit-sign'>
          <h3 className='Main_hed'>Edit Profile</h3>
          <form className='Signup_form' onSubmit={handleSubmit(onSubmit)}>
            <div className='wrap-input'>
              <div className='fifty left'>
                <h5>
                  <label htmlFor='first Name'>First Name</label>
                </h5>
                <input
                  type='firstName'
                  {...register('firstName', { required: 'This is required' })}
                  name='firstName'
                  className='Signup_input '
                  autoComplete="new-password"
                />

                <h6 className='Signup-error'>{errors.firstName?.message}</h6>
              </div>
              <div className='fifty'>
                <h5>
                  <label htmlFor='last Name'>Last Name</label>
                </h5>
                <input
                  type='lastName'
                  {...register('lastName', { required: 'This is required' })}
                  name='lastName'
                  className='Signup_input '
                  autoComplete="new-password"
                />
                <h6 className='Signup-error'>{errors.lastName?.message}</h6>
              </div>
            </div>
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
                  autoComplete="new-password"
                />
                <h6 className='Signup-error'>{errors.email?.message}</h6>
              </div>
              <div className='fifty '>
                <h5>
                  <label htmlFor='phone No'>Phone No</label>
                </h5>
                <input
                  type='phoneNo'
                  {...register('phoneNo', {
                    required: 'Please enter your phone number',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Phone number length is 10',
                    },
                  })}
                  name='phoneNo'
                  className='Signup_input'
                  autoComplete="new-password"
                />
                <h6 className='Signup-error'>{errors.phoneNo?.message}</h6>
              </div>
            </div>
            <div className='Signup_password-wrapper wrap-input'>
              <div className='fifty left'>
                <h5>
                  <label htmlFor='password'>Password</label>
                </h5>
                <input
                  {...register('password', {
                    required: false,
                    minLength: 6,
                  })}
                  name='password'
                  className='Signup_input'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"

                />

                <h6 className='Signup-error'>
                  {errors.password && errors.password.type === 'minLength' && (
                    <span className='Signup-error'>Min length is 6</span>
                  )}
                </h6>
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
                    required: false,
                    validate: (val) => {
                      if (watch('password') !== val) {
                        return 'Your passwords do no match'
                      }
                    },
                  })}
                  name='confirmPassword'
                  className='Signup_input'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"

                />
                <h6 className='Signup-error'>
                  {errors.confirmPassword?.message}
                </h6>
              </div>
            </div>

            <div className='Signup_radioButtons'>
              <h5 className='Signup_newletter'>
                Newsletter schedule delivery:
              </h5>
              <h5 className='Signup_radio'>
                <label htmlFor='newsletter email'></label>
                <input {...register('newsletter')} type='radio' value='email' />
                Email
              </h5>
              <h5 className='Signup_radio'>
                <label htmlFor='newsletter post'></label>
                <input {...register('newsletter')} type='radio' value='post' />
                Post
              </h5>
            </div>

            <h5>
              <label htmlFor='address'>Address</label>
            </h5>
            <input
              {...register('address', {
                required: false,
              })}
              name='address'
              className='Signup_input'
              autoComplete="new-password"

            />
            <div className='wrap-input'>
              <div className='fifty left'>
                <h5>
                  <label htmlFor=''>City</label>
                </h5>
                <input
                  {...register('city', {
                    required: false,
                  })}
                  name='city'
                  className='Signup_input'
                  autoComplete="new-password"

                />
              </div>
              <div className='fifty '>
                <h5>
                  <label htmlFor='state'>State</label>
                </h5>

                <select
                  onChange={handleRegion}
                  className='Signup_input'
                  name='state'
                  value={state}>
                  {states.map(state => (
                    <option key={`${state}_${state.value}`} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='wrap-input'>
              <div className='fifty left'>
                <h5>
                  <label htmlFor='zip code'>Zip Code</label>
                </h5>
                <input
                  {...register('zipcode', {
                    required: false,
                    pattern: {
                      value: /^\d{5,10}(?:[-\s]\d{4})?$/,
                      message: 'Zipcode length is 5',
                    },
                  })}
                  name='zipcode'
                  className='Signup_input'
                  autoComplete="new-password"

                />
                <h6 className='Signup-error'>{errors.zipcode?.message}</h6>
              </div>
            </div>
            <h5 className='Signup_newletter'>
              <div className='Signup_checkbox'>
                <input
                  type='checkbox'
                  {...register('volunteer')}
                  className='checkbox custom'
                />
                I am interested in helping to run the Outdoors Club: Member
                service, social media, newsletter, website, finance, planning,
                etc.
              </div>
            </h5>
            <button type='submit' className='Signup_submit-button'>
              <h4 className='cta-button'>Submit</h4>
            </button>
          </form>
        </div>
      </div>
      {user.data?.plan.length === 0 ? null : <MemberExtend />}
    </>
  )
}

import { useState, useContext } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form'
import { GrClose } from 'react-icons/gr'
import axios from 'axios'
import { UserContext } from '../../context'

import '../../pages/Signup/Signup.css'

export const ContactUs = props => {
  const [user, setUser] = useContext(UserContext)
  const [message, setMessage] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: user.data?.firstName ||'',
      lastName: user.data?.lastName ||'',
      email: user.data?.email || '',
      subject: '',

    },
  })

  const onSubmit = async (data) => {
    const contactInfo = { firstName: data.firstName, lastName: data.lastName, email: data.email, subject: data.subject, message }

    try {
      const { data: resp } = await axios.post(`${process.env.REACT_APP_API_URL}/api/contact/send`, contactInfo)
      console.log(resp, 'resp')
      props.modalContactUsClose()
    } catch (err) {
      console.log(err)
    }
}


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='Login_form'>
        <button
          type='button'
          onClick={props.modalContactUsClose}
          className='ModalContainer-button'>
          <GrClose />
        </button>
        <h3 className='Main_hed modal'>contact us</h3>
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
                  className='Signup_input'
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
              {...register('email', {
                required: "Your email is required",
              })}
              name='email'
              className='Signup_input'
            />
              <h6 className='Signup-error'>{errors.email?.message}</h6>

            </div>
            <div className='fifty '>
            <h5>
              <label htmlFor='subject'>Subject</label>
            </h5>
            <input
              {...register('subject', {
                required: false,
              })}
              name='subject'
              className='Signup_input' />
            </div>
        </div>
        <div>
          <h5 className='message'><label htmlFor="message">Message</label></h5>
      <TextareaAutosize
          cacheMeasurements
            className='Signup_input message'
            minRows={2}
        value={message}
        onChange={ev => setMessage(ev.target.value)}
          />
        </div>
        <div className='fifty login-button'>
          <button type='submit' className='Login_submit-button'>
            <h4 className='cta-button'>Submit</h4>
          </button>
        </div>
        </form>
    </div>
  )
}

import { useContext } from 'react'
import { UserContext } from '../../context'
import './StripeSuccess.css'

export const StripeSuccess = () => {
  const [user] = useContext(UserContext)
  return (
    <section className='ComponentContainer  stripe'>
      <div className='SuccessContainer'>
        <h3 className='Main_hed '>hi {user.data?.firstName}!</h3>
        <h4 className='Success-body'>
          You have successfully joined OutDoors Club as a paying member!
        </h4>
      </div>
    </section>
  )
}

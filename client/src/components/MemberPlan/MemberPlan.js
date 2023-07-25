import { useState, useEffect, useContext, Fragment } from 'react'
import axios from 'axios'
import './MemberPlan.css'
import { UserContext } from '../../context'
import { useNavigate } from 'react-router-dom'
// import { ModalLogin } from '../Modals/ModalLogin'

export const MemberPlan = () => {
  const navigate = useNavigate()
  const [plans, setPlans]  = useState([])
  const [loading, setLoading] = useState(true)
  const [state, setState] = useContext(UserContext)
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false)

  const user = localStorage.getItem('token')


  useEffect(() => {
    setLoading(true)
    const fetchPlans = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/membership`
      )
      setPlans(data)
      setLoading(false)
    }
    fetchPlans()
  }, [])

  const navigateSignUp = () => {
    navigate('/signup')
  }
  const modalLoginOpen = ()=> {
    setIsModalLoginOpen(true)
  }
  const modalLoginClose = () => {
    setIsModalLoginOpen(false)
  }

  // console.log(
  //   state.data?.plan,
  //   state.data?.plan.length,
  //   'state.data?.plan, in memberplan'
  // )

  // console.log(plans,typeof plans,'plans, typeof plans,')

  const createSession = async (plan) => {
    if (state && user) {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/membership/membership_create`,
        {
          plan,
          userId: state.data?.id,
          email: state.data?.email,
        }
      )
      window.location.href = data.url
    } else {
      navigate('/signup')
    }
  }
  return (
    <section className='MemberPlanContainer'>
      <h3 className='Main_hed'>Memberships</h3>

      {!user ? (
          <h5>
            Please{' '}
            <button className='cta-button' onClick={modalLoginOpen}>
              {' '}
              log in
            </button>{' '}
            or{' '}
            <button className='cta-button' onClick={navigateSignUp}>
              {' '}
              sign up
            </button>
          </h5>
      ) : null}
      <div className='MemberPlan-cardContainer'>
        {!loading && !state.data?.plan.length
          ? plans.map((plan) => {
              return (
                <Fragment key={plan._id}>
                  <div className='MemberPlan-card'>
                    <button
                      className='cta-button'
                      onClick={() => createSession(plan)}>
                      <h3>
                        <br />
                        {plan.title}
                        <br />
                        {plan.duration}
                      </h3>
                      <div className='MemberPlan-price'>${plan.amount}</div>
                    </button>
                  </div>
                </Fragment>
              )
            })
          : !loading && plans.map((plan) => {
              return (
                <Fragment key={plan._id}>
                  <div className='MemberPlan-card'>
                    <button className='cta-button disabled' disabled>
                      <h3>
                        <br />
                        {plan.title}
                        <br />
                        {plan.duration}
                      </h3>
                      <div className='MemberPlan-price'>${plan.amount}</div>
                    </button>
                  </div>
                </Fragment>
              )
            })}
      </div>
      {/* <ModalLogin isOpen={isModalLoginOpen} modalLoginClose={modalLoginClose} /> */}
    </section>
  )
}

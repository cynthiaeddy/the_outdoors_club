import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../context'

import '../../pages/Signup/Signup.css'
import './MemberExtend.css'
import '../MemberPlan/MemberPlan.css'

import axios from 'axios'

export const MemberExtend = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1))
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }, [location])

  const [plans, setPlans] = useState([])
  const [, setUserPlan] = useState([])
  const [state] = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [, setTitle] = useState('')
  const [, setEndDate] = useState('')
  const [, setStripeId] = useState('')

  useEffect(() => {
    const getUserPlan = async () => {
      try {
        setLoading(true)

        const resp = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/plan/${state.data?.plan[0]}`,
        )
        setUserPlan(resp.data.plan)
        setTitle(resp.data.plan[0].title)
        setEndDate(resp.data.plan[0].endDate)
        setStripeId(resp.data.stripeCustomerId)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    getUserPlan()
  }, [state.data?.plan])

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/extend`,
        )
        setPlans(data)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPlans()
  }, [])

  return (
    <div className='ComponentContainer edit' id='edit-extend'>
      <div className='MemberPlanExtensionContainer' id='MemberPlanExtension'>
        <h3 className='Main_hed extension'>Extend Membership</h3>
        <h5 className='finePrint'>
          Please allow 2 weeks after payment for your account to be updated
        </h5>

        <div className='MemberPlan-cardContainer extension'>
          {!loading &&
            plans.map((pl) => {
              return (
                <div className='MemberPlan-card extension' key={pl._id}>
                  <button
                    className='cta-button'
                    onClick={(e) => {
                      e.preventDefault()
                      window.location.href = pl.url
                    }}
                  >
                    <div className='MemberPlan-price extension'>
                      ${pl.amount}
                    </div>
                    <h3>
                      {pl.title}
                      <br />
                      {pl.duration}
                    </h3>
                  </button>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

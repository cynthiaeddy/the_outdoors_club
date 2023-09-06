import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GrClose } from 'react-icons/gr'

import { UserContext } from '../../context'
import './UserAccount.css'


export const UserAccount = ({ modalUserAcctClose }) => {
  const navigate = useNavigate()

  const [state, setState] = useContext(UserContext)
  const userId = state.data?.id
  const [plan, setPlan] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/${userId}`
      )
      setPlan(data.plan)
      setLoading(false)
    }
    getUser()
  }, [])


  const handleUpdateMembership = () => {
    modalUserAcctClose()
    navigate('/edit/#MemberPlanExtension')
  }

  const getCorrectDate = (date) => {
    const initialDate = new Date(date)

    const startDate = initialDate.toDateString()
    return startDate
  }

  const getCorrectEndDate = (date, number) => {
    let endDate
    if (number === 'One Year') {
      const aYearFromNow = new Date(date)
      aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1)

      endDate = aYearFromNow.toDateString()
    } else {
      updateUserEndDate(date)
      const twoYearsFromNow = new Date(date)
      twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2)
      endDate = twoYearsFromNow.toDateString()
    }
    return endDate
  }


  const updateUserEndDate = async (date) => {
    const twoYearsFromNow = new Date(date)
    const endDate = twoYearsFromNow.setFullYear(
      twoYearsFromNow.getFullYear() + 2
    )
    try {
      const fieldsToUpdate = {
        _id: plan[0].plan[0]._id,
        title: plan[0].plan[0].title,
        amount: plan[0].plan[0].amount,
        duration: plan[0].plan[0].duration,
        startDate: plan[0].plan[0].startDate,
        type: plan[0].plan[0].type,
        source: plan[0].plan[0].source,
        endDate: endDate,
      }
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/plan/date/${plan[0]._id}`,
        fieldsToUpdate
      )
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditUser = () => {
    modalUserAcctClose()
    navigate('/edit')
  }

  const handleMemberUser = () => {
    modalUserAcctClose()
    navigate('/#membership')
  }
  return (
    <section className='UserAcctContainer'>
      <button
        type='button'
        onClick={modalUserAcctClose}
        className='UserAcct-button '>
        <GrClose />
      </button>
      <h3 className='Main_hed modal'>hi {state.data?.firstName}!</h3>
      {!loading &&
        plan.map((pl) => {
          return (
            <div key={pl._id} className='UserAcct-info'>
              {pl.plan.map((p) => {
                return (
                  <div key={p._id}>
                    <>
                      <h4>
                        plan: <span>{p.title}</span>
                      </h4>
                      <h4>
                        duration: <span>{p.duration}</span>
                      </h4>
                    </>
                  </div>
                )
              })}
              <h4>
                start Date: <span>{getCorrectDate(pl.createdAt)}</span>
              </h4>
              <h4>
                end date:{' '}
                <span>
                  {getCorrectEndDate(pl.createdAt, pl.plan[0].duration)}
                </span>
              </h4>
            </div>
          )
        })}
      <div className='UserAcct-edit'>
        <h5>
          Edit your profile?{' '}
          <button onClick={() => handleEditUser()} className='cta-button'>
            click here
          </button>{' '}
        </h5>
      </div>
      {plan.length ? (
        <div className='UserAcct-edit'>
          <h5>
            Extend your membership?{' '}
            <button
              onClick={() => handleUpdateMembership()}
              className='cta-button'>
              click here
            </button>{' '}
          </h5>
          <h5 className='finePrint account'>
            Please allow 2 weeks after payment for your account to be updated
          </h5>
        </div>
      ) : <h5>
      Become a member!{' '}
      <button onClick={() => handleMemberUser()} className='cta-button'>
        click here
      </button>{' '}
    </h5> }
    </section>
  )
}

import { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import '../Admin/Admin.css'
import membership from '../../assets/OC_membership.pdf'
import sign_in_waiver from '../../assets/OC_sign_in_with_waiver.pdf'
import { LeaderReadOnlyRow } from './LeaderReadOnlyRow'

export const Leader = () => {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  const userActive = (endDate) => {
    const d1 = new Date(endDate)
    const date = new Date()
    const ans = d1 > date ? 'active' : 'not active'
    return ans
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user`,
        )
        setUsers(result.data)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  const requestSearchFirst = (searchValue) => {
    const filteredRows = users.filter((row) => {
      return row.firstName
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    })
    if (searchValue.length < 1) {
      setUsers(users)
    } else {
      setUsers(filteredRows)
    }
  }
  const requestSearch = (searchValue) => {
    const filteredRows = users.filter((row) => {
      return row.lastName
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    })
    if (searchValue.length < 1) {
      setUsers(users)
    } else {
      setUsers(filteredRows)
    }
  }
  const fetchDataAgain = async () => {
    try {
      setLoading(true)
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user`,
      )
      setUsers(result.data)
      setLoading(false)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    } catch (err) {
      console.log(err)
    }
  }
  const getCorrectDate = (date) => {
    const initialDate = new Date(date)
    const startDate = initialDate.toDateString()
    return startDate
  }

  return (
    <section className='ComponentContainer leader'>
      <div className='forms'>
        <a href={sign_in_waiver} download>
          <h5> download sign in sheet with waiver</h5>
        </a>
        <a href={membership} download>
          <h5> download membership form</h5>
        </a>
      </div>
      <div className='Admin-search '>
        <label htmlFor='search-form' className='search-form'>
          <input
            type='search'
            name='search-form'
            id='search-form'
            className='search-input'
            placeholder='Search for first name'
            onChange={(e) => requestSearchFirst(e.target.value)}
          />

          <button className='search-only' onClick={fetchDataAgain}>
            Reset{' '}
          </button>
        </label>
        <label htmlFor='search-form' className='search-form'>
          <input
            type='search'
            name='search-form'
            id='search-form'
            className='search-input'
            placeholder='Search for last name'
            onChange={(e) => requestSearch(e.target.value)}
          />

          <button className='search-only' onClick={fetchDataAgain}>
            Reset{' '}
          </button>
        </label>
      </div>
      <div className='AdminContainer leader '>
        <form className='Admin_form'>
          <table className='Admin_table leader'>
            <colgroup span={4}></colgroup>
            <thead>
              <tr>
                <th rowSpan={2}>First Name</th>
                <th rowSpan={2}>Last Name</th>
                <th rowSpan={2}>Phone</th>
                <th rowSpan={2}>Email</th>
                <th colSpan={2}>Membership</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                users
                  .filter((u) => u.role === 'user')
                  .sort((a, b) => a.lastName.localeCompare(b.lastName))
                  .map((user, idx) => (
                    <Fragment key={idx}>
                      <LeaderReadOnlyRow
                        user={user}
                        idx={idx}
                        getCorrectDate={getCorrectDate}
                        userActive={userActive}
                      />
                    </Fragment>
                  ))}
            </tbody>
          </table>
        </form>
      </div>
    </section>
  )
}

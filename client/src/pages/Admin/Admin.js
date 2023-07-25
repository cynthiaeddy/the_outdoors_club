import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

import './Admin.css'
import membership from '../../assets/OC_membership.pdf'
import sign_in_waiver from '../../assets/OC_sign_in_with_waiver.pdf'
import { AdminReadOnlyRow } from './AdminReadOnlyRow'
import { AdminEditableRow } from './AdminEditableRow'
import { ModalDelete } from '../../components/Modals/ModalDelete'
import moment from 'moment'

export const Admin = () => {
  const [userPlan, setUserPlan] = useState([])
  const [users, setUsers] = useState([])
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState({
    isOpen: false,
    userId: '',
  })



  const [loading, setLoading] = useState(false)
  const [newPlan, setNewPlan] = useState({
    title: '',
    amount: 0,
    duration: '',
    startDate: '',
    endDate: '',
    type: '',
    source: '',
    active: '',
  })

  const [editUserId, setEditUserId] = useState(null)
  const [planFormData, setPlanFormData] = useState({
    _id: '',
    title: '',
    amount: 0,
    duration: '',
    startDate: '',
    endDate: '',
    type: '',
    source: '',
    active: '',
  })

  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    phoneNo: '',
    email: '',
    newsletter: '',
    role: '',
    volunteer: Boolean,
    notes: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user`
        )
        setUsers(result.data)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const getPlanAndHandleEditClick = async (
    e,
    user,
    planId
  ) => {
    try {
      if (planId === undefined) {
        handleEditClickOnly(e, user)
      } else {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/plan/${planId}`)

        setUserPlan(data)
        handleEditClick(e, user, userPlan)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditClick = (e, user, userPlan) => {
    e.preventDefault()
    setEditUserId(user._id)
    const formValues = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      state: user.state,
      zipcode: user.zipcode,
      phoneNo: user.phoneNo,
      email: user.email,
      newsletter: user.newsletter,
      role: user.role,
      volunteer: user.volunteer,
      notes: user.notes,
    }
    setEditFormData(formValues)
    const planValues = {
      amount: userPlan.plan[0].amount,
      duration: userPlan.plan[0].duration,
      endDate: userPlan.plan[0].endDate,
      source: userPlan.plan[0].source,
      startDate: userPlan.plan[0].startDate,
      title: userPlan.plan[0].title,
      type: userPlan.plan[0].type,
      _id: userPlan._id,
      active: userPlan.plan[0].active,
    }
    setPlanFormData(planValues)
  }
  const handleEditClickOnly = (e, user) => {
    e.preventDefault()
    setEditUserId(user._id)
    const formValues = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      state: user.state,
      zipcode: user.zipcode,
      phoneNo: user.phoneNo,
      email: user.email,
      newsletter: user.newsletter,
      role: user.role,
      volunteer: user.volunteer,
      notes: user.notes,
    }
    setEditFormData(formValues)
  }

  const handleEditFormChange = (e) => {
    e.preventDefault()
    const newFormData = { ...editFormData, [e.target.name]: e.target.value }
    setEditFormData(newFormData)
  }

  const handlePlanFormChange = (e) => {
    e.preventDefault()
    const newPlanFormData = {
      ...planFormData,
      [e.target.name]: e.target.value,
    }
    setPlanFormData(newPlanFormData)
  }

  const handleNewPlanChange = (e) => {
    e.preventDefault()
    const newPlanFormData = {
      ...newPlan,
      [e.target.name]: e.target.value,
    }
    setNewPlan(newPlanFormData)
  }

  const handleCancelClick = () => {
    setEditUserId(null)
  }

  const handleEditFormSubmit = (e) => {
    e.preventDefault()

    const editedUser = {
      id: editUserId,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      address: editFormData.address,
      city: editFormData.city,
      state: editFormData.state,
      zipcode: editFormData.zipcode,
      phoneNo: editFormData.phoneNo,
      email: editFormData.email,
      newsletter: editFormData.newsletter,
      role: editFormData.role,
      volunteer: editFormData.volunteer,
      notes: editFormData.notes,
    }
    const editedPlan = {
      _id: planFormData._id,
      title: planFormData.title,
      duration: planFormData.duration,
      startDate: planFormData.startDate,
      endDate: planFormData.endDate,
      amount: planFormData.amount,
      type: planFormData.type,
      source: planFormData.source,
      active: planFormData.active,
    }

    const planId = editedPlan._id
    const user = users.find(user => user._id === editUserId)
    const userId = user._id

    addNewPlan(userId)
    updateUser(e, userId, editedUser)
    updatePlan(e, planId, editedPlan)
    setEditUserId(null)
  }
  const updateUser = async (e, userId, editedUser) => {
    e.preventDefault()
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, editedUser)
      fetchDataAgain()
    } catch (err) {
      console.log(err)
    }
  }
  const updatePlan = async (e, planId, editedPlan) => {
    e.preventDefault()
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/plan/${planId}`, editedPlan)
    } catch (err) {
      console.log(err)
    }
  }
  const addNewPlan = async (userId) => {
    try {
      const fieldsToAdd = {
        title: newPlan.title.replace('\t', ''),
        duration: newPlan.duration.replace('\t', ''),
        startDate: new Date(newPlan.startDate.replace('\t', '')),
        endDate: new Date(newPlan.endDate.replace('\t', '')),
        amount: newPlan.amount * 1,
        type: newPlan.type,
        source: newPlan.source,
        active: newPlan.active.replace('\t', ''),
        userId,
      }

      await axios.post(`${process.env.REACT_APP_API_URL}/api/plan/add`, fieldsToAdd)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchDataAgain = async () => {
    try {
      setLoading(true)
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user`
      )
      setUsers(result.data)
      setLoading(false)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    } catch (err) {
      console.log(err)
    }
  }
  const handleDelete = (userId) => {
    setIsModalDeleteOpen({
      isOpen: true,
      userId,
    })
  }
  const handleDeleteTrue = async () => {
    if (isModalDeleteOpen.isOpen && isModalDeleteOpen.userId)
      console.log('true')
    const newUsers = [...users]
    const index = users.findIndex(user => user._id === isModalDeleteOpen.userId)
    newUsers.splice(index, 1)
    setUsers(newUsers)
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/${isModalDeleteOpen.userId}`)
    } catch (err) {
      console.log(err)
    }
    setIsModalDeleteOpen({
      isOpen: false,
      userId: '',
    })
  }

  const handleDeleteFalse = () => {
    setIsModalDeleteOpen({
      isOpen: false,
      userId: '',
    })
  }

  const requestSearch = (searchValue) => {
    const filteredRows = users.filter(row => {
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
  const getCorrectDate = (date) => {
    const startDate = moment(date).format('MMMM D YYYY')
    return startDate
  }
  const userActive = (endDate) => {
    const d1 = new Date(endDate)
    const date = new Date()
    const ans = d1 > date ? 'active' : 'not active'
    return ans
  }

  return (
    <section className='ComponentContainer admin'>
      <div className='forms'>
        <a href={sign_in_waiver} download>
          <h5> download sign in sheet with waiver</h5>
        </a>
        <a href={membership} download>
          <h5> download membership form</h5>
        </a>
      </div>
      <div className='Admin-search'>
        <label htmlFor='search-form' className='search-form'>
          <input
            type='search'
            name='search-form'
            id='search-form'
            className='search-input'
            placeholder='Search for...'
            onChange={e => requestSearch(e.target.value)}
          />

          <button className='search-only' onClick={fetchDataAgain}>
            Reset{' '}
          </button>
        </label>
      </div>
      <div className='AdminContainer'>
        <form onSubmit={handleEditFormSubmit} className='Admin_form'>
          <table className='Admin_table' id='Admin_table'>
            <colgroup span={4}></colgroup>
            <thead className='Admin_table-hed'>
              <tr>
                <th rowSpan={2}>First Name</th>
                <th rowSpan={2}>Last Name</th>
                <th rowSpan={2}>Address</th>
                <th rowSpan={2}>City</th>
                <th rowSpan={2}>State</th>
                <th rowSpan={2}>Zipcode</th>
                <th rowSpan={2}>Phone</th>
                <th rowSpan={2}>Email</th>
                <th rowSpan={2}>Newsletter</th>
                <th rowSpan={2}>Role</th>
                <th rowSpan={2}>Volunteer</th>
                <th rowSpan={2}>Notes</th>
                <th colSpan={8} scope='colgroup'>
                  Membership
                </th>
                <th rowSpan={2}>Actions</th>
              </tr>
              <tr>
                <th scope='col' className='col-second'>Plan</th>
                <th scope='col' className='col-second'>Duration</th>
                <th scope='col'>Start Date</th>
                <th scope='col'>End Date</th>
                <th scope='col'>Active</th>
                <th scope='col'>Paid</th>
                <th scope='col'>Type</th>
                <th scope='col'>Source</th>
              </tr>
            </thead>

            <tbody className='Admin_table-body'>
              {!loading &&
                users
                  // .filter(u => u.role === 'user')
                  .sort(
                    (a, b) =>
                      a.role.localeCompare(b.role) ||
                      a.lastName.localeCompare(b.lastName)
                  )

                  .map((user, idx) => (
                    <Fragment key={idx}>
                      {editUserId === user._id ? (
                        <AdminEditableRow
                          handlePlanFormChange={handlePlanFormChange}
                          handleEditFormChange={handleEditFormChange}
                          handleNewPlanChange={handleNewPlanChange}
                          editFormData={editFormData}
                          planFormData={planFormData}
                          newPlan={newPlan}
                          handleCancelClick={handleCancelClick}
                          getCorrectDate={getCorrectDate}
                          planId={user.plan[0]?._id}
                          userId={user._id}
                          userActive={userActive}
                        />
                      ) : (
                        <AdminReadOnlyRow
                          user={user}
                          idx={idx}
                          getCorrectDate={getCorrectDate}
                          handleEditClick={handleEditClick}
                          planId={user.plan[0]?._id}
                          getPlanAndHandleEditClick={getPlanAndHandleEditClick}
                          handleDelete={handleDelete}
                          userActive={userActive}
                        />
                      )}
                    </Fragment>
                  ))}
            </tbody>
          </table>
        </form>
      </div>
      {isModalDeleteOpen.isOpen && (
        <ModalDelete
          handleDeleteTrue={handleDeleteTrue}
          handleDeleteFalse={handleDeleteFalse}
        />
      )}
    </section>
  )
}

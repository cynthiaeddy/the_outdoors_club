import './Admin.css'

export const AdminEditableRow = (props) => {
  return (
    <tr className='Admin-tr'>
      <td className='Admin-td'>
        <input
          type='firstName'
          name='firstName'
          placeholder='First Name'
          className='Admin-input edit'
          value={props.editFormData.firstName}
          onChange={props.handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='lastName'
          name='lastName'
          placeholder='Last Name'
          className='Admin-input edit'
          value={props.editFormData.lastName}
          onChange={props.handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='address'
          name='address'
          placeholder='Address'
          className='Admin-input edit'
          value={props.editFormData.address}
          onChange={props.handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='city'
          name='city'
          placeholder='City'
          className='Admin-input edit'
          value={props.editFormData.city}
          onChange={props.handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='state'
          name='state'
          placeholder='State '
          className='Admin-input edit'
          value={props.editFormData.state}
          onChange={props.handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='zipcode'
          name='zipcode'
          placeholder='Zipcode '
          className='Admin-input edit'
          value={props.editFormData.zipcode}
          onChange={props.handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='phoneNo'
          name='phoneNo'
          placeholder='Phone'
          className='Admin-input edit'
          value={props.editFormData.phoneNo}
          onChange={props.handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='email'
          name='email'
          placeholder='Email'
          className='Admin-input edit'
          value={props.editFormData.email}
          onChange={props.handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='newsletter'
          name='newsletter'
          placeholder='Newsletter '
          className='Admin-input edit'
          value={props.editFormData.newsletter}
          onChange={props.handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='role'
          name='role'
          placeholder='Role '
          className='Admin-input edit'
          value={props.editFormData.role}
          onChange={props.handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='volunteer'
          name='volunteer'
          placeholder='Volunteer'
          className='Admin-input edit'
          value={props.editFormData.volunteer}
          onChange={props.handleEditFormChange}
        />
      </td>
      <td>
        <input
          type='notes'
          name='notes'
          placeholder='Notes'
          className='Admin-input edit notes'
          value={props.editFormData.notes}
          onChange={props.handleEditFormChange}
        />
      </td>
      {!props.planId ? (
        <>
          <td>
            <input
              type='title'
              name='title'
              placeholder='Plan'
              className='Admin-input edit'
              value={props.newPlan.title}
              onChange={props.handleNewPlanChange}
            />
          </td>
          <td>
            <input
              type='duration'
              name='duration'
              placeholder='Duration'
              className='Admin-input edit'
              value={props.newPlan.duration}
              onChange={props.handleNewPlanChange}
            />
          </td>
          <td>
            <input
              type='startDate'
              name='startDate'
              placeholder='Start Date'
              className='Admin-input edit'
              value={props.getCorrectDate(props.newPlan.startDate)}
              onChange={props.handleNewPlanChange}
            />
          </td>
          <td>
            <input
              type='endDate'
              name='endDate'
              placeholder='End Date'
              className='Admin-input edit'
              value={props.getCorrectDate(props.newPlan.endDate)}
              onChange={props.handleNewPlanChange}
            />
          </td>
          <td>
            <input
              type='active'
              name='active'
              placeholder='Active'
              className='Admin-input edit'
              value={props.newPlan.active}
              onChange={props.handleNewPlanChange}
            />
          </td>
          <td>
            <input
              type='amount'
              name='amount'
              placeholder='Paid'
              className='Admin-input edit'
              value={props.newPlan.amount}
              onChange={props.handleNewPlanChange}
            />
          </td>
          <td>
            <input
              type='type'
              name='type'
              placeholder='Type'
              className='Admin-input edit'
              value={props.newPlan.type}
              onChange={props.handleNewPlanChange}
            />
          </td>
          <td>
            <input
              type='source'
              name='source'
              placeholder='Source'
              className='Admin-input edit'
              value={props.newPlan.source}
              onChange={props.handleNewPlanChange}
            />
          </td>
        </>
      ) : (
        <>
          <td>
            <input
              type='title'
              name='title'
              placeholder='Plan'
              className='Admin-input edit'
              value={props.planFormData.title}
              onChange={props.handlePlanFormChange}
            />
          </td>
          <td>
            <input
              type='duration'
              name='duration'
              placeholder='Duration'
              className='Admin-input edit'
              value={props.planFormData.duration}
              onChange={props.handlePlanFormChange}
            />
          </td>
          <td>
            <input
              type='startDate'
              name='startDate'
              placeholder='Start Date'
              className='Admin-input edit'
              value={props.getCorrectDate(props.planFormData.startDate)}
              onChange={props.handlePlanFormChange}
            />
          </td>
          <td>
            <input
              type='endDate'
              name='endDate'
              placeholder='End Date'
              className='Admin-input edit'
              value={props.getCorrectDate(props.planFormData.endDate)}
              onChange={props.handlePlanFormChange}
            />
          </td>
          <td>
            <input
              type='active'
              name='active'
              placeholder='Active'
              className='Admin-input edit'
              value={props.planFormData.active}
              onChange={props.handlePlanFormChange}
            />
          </td>
          <td>
            <input
              type='amount'
              name='amount'
              placeholder='Paid'
              className='Admin-input edit'
              value={props.planFormData.amount}
              onChange={props.handlePlanFormChange}
            />
          </td>
          <td>
            <input
              type='type'
              name='type'
              placeholder='Type'
              className='Admin-input edit'
              value={props.planFormData.type}
              onChange={props.handlePlanFormChange}
            />
          </td>
          <td>
            <input
              type='source'
              name='source'
              placeholder='Source'
              className='Admin-input edit'
              value={props.planFormData.source}
              onChange={props.handlePlanFormChange}
            />
          </td>
        </>
      )}
      <td>
        <button type='submit' className='cta-button Admin'>
          save
        </button>{' '}
        <button
          type='button'
          className='cta-button Admin'
          onClick={props.handleCancelClick}>
          cancel
        </button>
      </td>
    </tr>
  )
}

import { Fragment } from 'react'

export const AdminReadOnlyRow = (props) => {
  return (
    <tr key={props.idx}>
      <td>{props.user.firstName}</td>
      <td>{props.user.lastName}</td>
      <td>{props.user.address}</td>
      <td>{props.user.city}</td>
      <td>{props.user.state}</td>
      <td>{props.user.zipcode}</td>
      <td>{props.user.phoneNo}</td>
      <td>{props.user.email}</td>
      <td>{props.user.newsletter}</td>
      <td>{props.user.role}</td>
      <td>{props.user.volunteer === true ? 'yes' : 'no'}</td>
      <td>{props.user.notes}</td>

      {props.user.plan && props.user.plan.length ? (
        props.user.plan.map((pl, idx) => (
          <Fragment key={idx}>
            <td>{pl.plan[0].title}</td>
            <td>{pl.plan[0].duration}</td>
            <td>
              <span>{props.getCorrectDate(pl.plan[0].startDate)}</span>
            </td>
            <td>
              <span>{props.getCorrectDate(pl.plan[0].endDate)}</span>
            </td>
            <td>{props.userActive(pl.plan[0].endDate)}</td>
            <td>{pl.plan[0].amount}</td>
            <td>{pl.plan[0].type}</td>
            <td>{pl.plan[0].source}</td>
          </Fragment>
        ))
      ) : (
        <Fragment>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </Fragment>
      )}
      <td>
        <button
          type='button'
          className='cta-button Admin'
          onClick={e =>
            props.getPlanAndHandleEditClick(e, props.user, props.planId)
          }>
          edit
        </button>{' '}
        <button
          type='button'
          className='cta-button Admin'
          onClick={() => props.handleDelete(props.user._id)}>
          delete
        </button>
      </td>
    </tr>
  )
}

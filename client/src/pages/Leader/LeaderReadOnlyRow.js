import { Fragment } from 'react'

export const LeaderReadOnlyRow = (props) => {
  return (
    <tr key={props.idx}>
      <td>{props.user.firstName}</td>
      <td>{props.user.lastName}</td>
      <td>{props.user.phoneNo}</td>
      <td>{props.user.email}</td>

      {props.user.plan && props.user.plan.length ? (
        props.user.plan.map((pl, idx) => (
          <Fragment key={idx}>
            <td>{props.userActive(pl.plan[0].endDate)}</td>
          </Fragment>
        ))
      ) : (
        <Fragment>
          <td></td>
        </Fragment>
      )}
    </tr>
  )
}

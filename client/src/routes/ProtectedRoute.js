import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserContext } from '../context'

export const ProtectedRoute = (props) => {
  const [state] = useContext(UserContext)

  if (state.loading) return <div>Spinner...</div>

  if (!props.isAllowed) {
    return <Navigate to='/' replace />
  }

  return state.data ? <Outlet /> : <Navigate to='/' />
}

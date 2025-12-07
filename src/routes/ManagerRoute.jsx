import { Navigate } from 'react-router'
import useRole from '../hooks/useRole'
import Loading from '../shared/Loading'

const ManagerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return <Loading />
  if (role === 'manager') return children
  return <Navigate to='/' replace='true' />
}

export default ManagerRoute;
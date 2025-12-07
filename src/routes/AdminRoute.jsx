import { Navigate, useRouteLoaderData } from 'react-router'
import Loading from '../shared/Loading'

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRouteLoaderData()

  if (isRoleLoading) return <Loading />
  if (role === 'admin') return children
  return <Navigate to='/' replace='true' />
}

export default AdminRoute
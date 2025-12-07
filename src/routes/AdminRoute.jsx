import { Navigate } from 'react-router'
import Loading from '../shared/Loading'
import useRole from '../hooks/useRole'

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return <div className='flex justify-between items-center min-h-screen'><Loading/></div>
  if (role === 'admin') return children
  return <Navigate to='/' replace='true' />
}

export default AdminRoute
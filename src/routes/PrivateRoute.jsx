import { Navigate, useLocation } from 'react-router'
import useAuth from '../hooks/useAuth'
import Loading from '../shared/Loading'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className='flex justify-between items-center min-h-screen'><Loading/></div>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute
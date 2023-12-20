import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.id) {
    return <Navigate to='/login' replace />;
  }

  return children;
};
export { RequireAuth };

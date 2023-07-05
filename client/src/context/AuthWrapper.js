import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const AuthWrapper = ({ children, nonAuthenticated }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (nonAuthenticated && currentUser) {
    navigate('/account');
    return null;
  }

  if (!nonAuthenticated && !currentUser) {
    navigate('/login');
    return null;
  }

  return children;
};

export default AuthWrapper;

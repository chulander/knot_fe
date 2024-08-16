import React, { useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
    navigate('/');
  }, []);
  return null;
};

export default Logout;

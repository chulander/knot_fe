import { useContext } from 'react';

import { AuthContext } from '../../AuthContext';

// Custom hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('No Auth Provider');
  }
  return context;
};

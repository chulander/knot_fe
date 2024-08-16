import { type FC, type ReactNode, createContext, useCallback, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from './types';
import { AuthContextType } from './types';
import axios from './shared/axios';

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => Promise.resolve(null),
  logout: () => Promise.resolve()
});

interface AuthProviderProps {
  children: ReactNode;
  initialUser: User | null;
  loggedIn: boolean;
}

const AuthProvider: FC<AuthProviderProps> = ({ children, initialUser, loggedIn }): ReactElement => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(loggedIn);
  const [user, setUser] = useState<User | null>(initialUser);

  const logout = useCallback(async () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user'); // Clear the user from localStorage
    navigate('/login'); // Navigate to login page after logout
  }, [navigate]);

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await axios.post('/users/login', {
          email: username,
          password
        });
        const { user } = response.data;

        setUser(user);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
        navigate('/'); // Navigate to home page after successful login
        return user;
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
        console.error('Login failed:', error);
        return null;
      }
    },
    [navigate]
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

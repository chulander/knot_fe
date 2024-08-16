export interface User  {
  id: string;

  first_name: string;
  last_name:string;
  email:string;
}

export interface Contact extends User {
  phone_number: string;
}


export type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<User | null>;
  logout: (redirect?: boolean) => Promise<void>;
  setAccessToken: (accessToken: string) => void;
  setIdentityToken: (idToken: string) => void;
};

interface AuthProviderProps {
  children: ReactNode;
  initialUser: User | null;
  loggedIn: boolean;
}

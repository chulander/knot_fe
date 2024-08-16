export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Contact extends User {
  phone_number: string;
}

export type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<User | null>;
  logout: (redirect?: boolean) => Promise<void>;
};

interface AuthProviderProps {
  children: ReactNode;
  initialUser: User | null;
  loggedIn: boolean;
}

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

interface AuditEntry {
  id: string;
  table_name: string;
  field: string;
  old_value: string | null;
  new_value: string | null;
  changed_at: string;
}

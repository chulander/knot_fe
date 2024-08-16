import { User } from '../types';

export async function initApp(): Promise<{ user: User | null; loggedIn: boolean }> {
  try {
    const userData = localStorage.getItem('user');

    if (userData) {
      const user: User = JSON.parse(userData);
      return { user, loggedIn: true };
    } else {
      return { user: null, loggedIn: false };
    }
  } catch (error) {
    console.error('Failed to initialize app:', error);
    return { user: null, loggedIn: false };
  }
}

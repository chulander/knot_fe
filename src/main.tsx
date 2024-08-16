import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import AuthProvider from './AuthContext.tsx';
import { initApp } from './shared/initApp.ts';
import './index.css';

const bootstrap = () => {
  initApp().then(({ user, loggedIn }) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <BrowserRouter>
          <AuthProvider initialUser={user} loggedIn={loggedIn}>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </StrictMode>
    );
  });
};

bootstrap();

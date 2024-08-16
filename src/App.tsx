import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import Layout from './shared/components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Contact from './pages/Contact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

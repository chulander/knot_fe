import './App.css';
import { Routes, Route } from 'react-router';
import Layout from './shared/components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Route>
    </Routes>
  );
}

export default App;

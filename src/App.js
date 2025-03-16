import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Doctors from './pages/Doctors/Doctors';
import Login from './pages/Login/Login';
import DoctorLogin from './pages/DoctorLogin/DoctorLogin';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import DoctorProfile from './pages/DoctorProfile/DoctorProfile';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

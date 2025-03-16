import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DoctorLogin.module.css';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];

    const doctor = doctors.find((d) => {
      if (!d.email || !d.password) {
        return false;
      }
      return d.email === email && d.password === password;
    });

    if (doctor) {
      localStorage.setItem('currentDoctor', JSON.stringify(doctor));
      navigate('/doctor-profile');
    } else {
      setError('Неверный email или пароль.');
    }
  };

  return (
    <div className={styles.doctorLogin}>
      <h2>Вход для врачей</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};


export default DoctorLogin;
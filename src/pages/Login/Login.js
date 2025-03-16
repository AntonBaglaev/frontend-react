import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/profile');
      return;
    }

    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    const doctor = doctors.find((d) => d.email === email && d.password === password);

    if (doctor) {
      localStorage.setItem('currentDoctor', JSON.stringify(doctor));
      navigate('/doctor-profile');
      return;
    }

    setError('Неверный email или пароль. Зарегистрируйтесь, если у вас нет аккаунта.');
  };

  return (
    <div className={styles.login}>
      <h2>Вход</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
      <p>
        Нет аккаунта?{' '}
        <button
          className={styles.registerLink}
          onClick={() => navigate('/register')}
        >
          Зарегистрируйтесь
        </button>
      </p>
    </div>
  );
};

export default Login;
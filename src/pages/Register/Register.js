import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];


    const userExists = users.some((u) => u.email === email);
    if (userExists) {
      setError('Пользователь с таким email уже зарегистрирован.');
      return;
    }

    const newUser = { id: Date.now(), name, email, password, appointments: [] };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    navigate('/login');
  };

  return (
    <div className={styles.register}>
      <h2>Регистрация</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>
        Уже есть аккаунт?{' '}
        <button
          className={styles.loginLink}
          onClick={() => navigate('/login')}
        >
          Войдите
        </button>
      </p>
    </div>
  );
};

export default Register;
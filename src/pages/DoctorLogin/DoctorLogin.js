import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorLogin.css';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showTestData, setShowTestData] = useState(false);
  const navigate = useNavigate();

  const isDevelopment = process.env.NODE_ENV === 'development';
  const testDoctors = isDevelopment ? JSON.parse(localStorage.getItem('doctors')) || [] : [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isDevelopment && password.length < 8) {
      setError('Пароль должен содержать минимум 8 символов');
      return;
    }

    try {
      const doctor = testDoctors.find(d =>
        d.email && d.password &&
        d.email.trim() === email.trim() &&
        d.password === password
      );

      if (isDevelopment) {
        if (doctor) {
          localStorage.setItem('currentDoctor', JSON.stringify(doctor));
          navigate('/doctor-profile');
        } else {
          setError('Неверный email или пароль. Проверьте введенные данные.');
        }
      } else {

        setError('');
        localStorage.setItem('currentDoctor', JSON.stringify({
          name: 'Доктор (тестовый режим)',
          email: email,
          specialization: 'Терапевт'
        }));
        setTimeout(() => {
          navigate('/doctor-profile');
        }, 500);
      }
    } catch (err) {
      setError('Ошибка при обработке данных. Попробуйте еще раз.');
      console.error('Login error:', err);
    }
  };

  const fillTestCredentials = (doctor) => {
    setEmail(doctor.email);
    setPassword(doctor.password);
    setError('');
  };

  return (
    <div className="doctor-login">
      <div className="doctor-login__container">
        <h2 className="doctor-login__title">Вход для врачей</h2>

        {error && <div className="doctor-login__error">{error}</div>}

        <form onSubmit={handleSubmit} className="doctor-login__form">
          <div className="doctor-login__form-group">
            <label htmlFor="email" className="doctor-login__label">Email:</label>
            <input
              id="email"
              type="email"
              className="doctor-login__input"
              placeholder="Введите ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="doctor-login__form-group">
            <label htmlFor="password" className="doctor-login__label">Пароль:</label>
            <input
              id="password"
              type="password"
              className="doctor-login__input"
              placeholder={`Введите ваш пароль${!isDevelopment ? ' (мин. 8 символов)' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={!isDevelopment ? 8 : undefined}
            />
          </div>

          <button type="submit" className="doctor-login__submit">
            Войти
          </button>
        </form>

        {isDevelopment && (
          <div className="doctor-login__test-data">
            <button
              onClick={() => setShowTestData(!showTestData)}
              className="doctor-login__toggle-btn"
            >
              {showTestData ? 'Скрыть тестовые данные' : 'Показать тестовые данные'}
            </button>

            {showTestData && (
              <div className="doctor-login__test-container">
                <h3 className="doctor-login__test-title">Тестовые данные для входа (только development):</h3>
                <p className="doctor-login__test-description">Выберите врача для автозаполнения формы:</p>

                <div className="doctor-login__test-list">
                  {testDoctors.map(doctor => (
                    <div
                      key={doctor.id}
                      className="doctor-login__test-card"
                      onClick={() => fillTestCredentials(doctor)}
                    >
                      <div className="doctor-login__test-info">
                        <strong className="doctor-login__test-name">{doctor.name}</strong>
                        <div className="doctor-login__test-department">Отделение: {doctor.department}</div>
                        <div className="doctor-login__test-specialization">Специализация: {doctor.specialization}</div>
                      </div>
                      <div className="doctor-login__test-credentials">
                        <div className="doctor-login__test-email"><span>Email:</span> {doctor.email}</div>
                        <div className="doctor-login__test-password"><span>Пароль:</span> {doctor.password}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!isDevelopment && (
          <div className="doctor-login__production-notice">
            <p>В production-режиме для входа используйте ваши учетные данные.</p>
            <p>Для демонстрации можно ввести любой email и пароль (минимум 8 символов).</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorLogin;
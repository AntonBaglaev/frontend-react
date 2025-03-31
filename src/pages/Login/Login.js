import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'patient@medclinic.ru',
    password: 'patient123'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Проверяем инициализацию данных при загрузке
  useEffect(() => {
    if (!localStorage.getItem('doctors') || !localStorage.getItem('patients')) {
      setError('Данные не инициализированы. Перезагрузите страницу.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Проверяем пациентов
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const patient = patients.find(p => 
      p.email === formData.email && 
      p.password === formData.password
    );

    if (patient) {
      localStorage.setItem('currentUser', JSON.stringify(patient));
      navigate('/profile');
      return;
    }

    // Проверяем докторов
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    const doctor = doctors.find(d => 
      d.email === formData.email && 
      d.password === formData.password
    );

    if (doctor) {
      localStorage.setItem('currentDoctor', JSON.stringify(doctor));
      navigate('/doctor-profile');
      return;
    }

    setError('Неверные учетные данные. Попробуйте: patient@medclinic.ru / patient123');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>Вход в систему</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
        </form>

        <div className={styles.testCredentials}>
          <h4>Тестовые данные:</h4>
          <p><strong>Пациент:</strong> patient@medclinic.ru / patient123</p>
          <p><strong>Доктор:</strong> therapist@medclinic.ru / doctor123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
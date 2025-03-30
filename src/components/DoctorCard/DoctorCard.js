import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DoctorCard.module.css';

const DoctorCard = ({ doctor }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [imgSrc, setImgSrc] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!doctor) return;

    if (!doctor.photo) {
      setImgSrc(`${process.env.PUBLIC_URL}/images/doctor-placeholder.jpg`);
      return;
    }

    const imagePath = `${process.env.PUBLIC_URL}/images/doctors/${doctor.photo}`;
    const img = new Image();
    img.src = imagePath;

    img.onload = () => setImgSrc(imagePath);
    img.onerror = () => setImgSrc(`${process.env.PUBLIC_URL}/images/doctor-placeholder.jpg`);
  }, [doctor]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `${process.env.PUBLIC_URL}/images/doctor-placeholder.jpg`;
  };

  const handleBookAppointment = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setShowAppointmentModal(true);
  };

  const handleLogin = () => navigate('/login');
  const handleRegister = () => {
    setShowAuthModal(false);
    setShowRegisterModal(true);
  };

  const handleConfirmRegister = () => {
    const { name, email, password } = registerData;
    if (!name || !email || !password) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      appointments: [],
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    setShowRegisterModal(false);
    setShowAppointmentModal(true);
  };

  const handleConfirmAppointment = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      alert('Пожалуйста, войдите в систему, чтобы записаться.');
      return;
    }

    if (!date || !time) {
      alert('Пожалуйста, выберите дату и время.');
      return;
    }

    const appointment = {
      id: Date.now(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientId: currentUser.id,
      patientName: currentUser.name,
      date,
      time,
      status: 'Ожидание',
    };

    const updatedUser = {
      ...currentUser,
      appointments: [...currentUser.appointments, appointment],
    };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('users'));
    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    localStorage.setItem('appointments', JSON.stringify([...appointments, appointment]));

    setShowAppointmentModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!doctor) return null;

  return (
    <article className={styles.card}>

      <div className={styles.card__imageContainer}>
        <img
          src={imgSrc || `${process.env.PUBLIC_URL}/images/doctor-placeholder.jpg`}
          alt={`Доктор ${doctor.name}`}
          className={styles.card__image}
          onError={handleImageError}
        />
      </div>


      <div className={styles.card__content}>
        <h3 className={styles.card__name}>{doctor.name}</h3>
        <p className={styles.card__specialty}>{doctor.specialization}</p>
        <p className={styles.card__department}>{doctor.department}</p>

        <div className={styles.card__meta}>
          <span className={styles.card__experience}>Стаж: {doctor.experience}</span>
          <span className={styles.card__rating}>★ {doctor.rating}</span>
        </div>

        <button
          className={styles.card__button}
          onClick={handleBookAppointment}
        >
          Записаться на прием
        </button>
      </div>


      {showAuthModal && (
        <div className={styles.modal}>
          <div className={styles.modal__content}>
            <h3 className={styles.modal__title}>Требуется авторизация</h3>
            <p className={styles.modal__text}>Для записи к врачу необходимо войти в систему</p>
            <div className={styles.modal__buttons}>
              <button
                className={`${styles.modal__button} ${styles.modal__button_primary}`}
                onClick={handleLogin}
              >
                Войти
              </button>
              <button
                className={`${styles.modal__button} ${styles.modal__button_secondary}`}
                onClick={handleRegister}
              >
                Регистрация
              </button>
              <button
                className={styles.modal__button}
                onClick={() => setShowAuthModal(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className={styles.modal}>
          <div className={styles.modal__content}>
            <h3 className={styles.modal__title}>Регистрация</h3>
            <input
              type="text"
              placeholder="Имя"
              className={styles.modal__input}
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className={styles.modal__input}
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              className={styles.modal__input}
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              required
            />
            <div className={styles.modal__buttons}>
              <button
                className={`${styles.modal__button} ${styles.modal__button_primary}`}
                onClick={handleConfirmRegister}
              >
                Зарегистрироваться
              </button>
              <button
                className={styles.modal__button}
                onClick={() => setShowRegisterModal(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {showAppointmentModal && (
        <div className={styles.modal}>
          <div className={styles.modal__content}>
            <h3 className={styles.modal__title}>Запись к {doctor.name}</h3>
            <div className={styles.modal__formGroup}>
              <label className={styles.modal__label}>Дата:</label>
              <input
                type="date"
                className={styles.modal__input}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className={styles.modal__formGroup}>
              <label className={styles.modal__label}>Время:</label>
              <input
                type="time"
                className={styles.modal__input}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div className={styles.modal__buttons}>
              <button
                className={`${styles.modal__button} ${styles.modal__button_primary}`}
                onClick={handleConfirmAppointment}
              >
                Подтвердить запись
              </button>
              <button
                className={styles.modal__button}
                onClick={() => setShowAppointmentModal(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className={styles.notification}>
          <p className={styles.notification__text}>Запись успешно создана!</p>
        </div>
      )}
    </article>
  );
};

export default DoctorCard;
import React, { useState } from 'react';
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
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));


    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }


    setShowAppointmentModal(true);
  };

  const handleLogin = () => {

    navigate('/login');
  };

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

  return (
    <div className={styles.card}>
      <img src={doctor.photo} alt={doctor.name} className={styles.photo} />
      <p className={styles.name}>{doctor.name}</p>
      <p className={styles.department}>{doctor.department}</p>
      <p className={styles.specialization}>{doctor.specialization}</p>
      <p className={styles.experience}>Стаж: {doctor.experience}</p>
      <p className={styles.rating}>Рейтинг: {doctor.rating}</p>
      <button onClick={handleBookAppointment}>Записаться</button>


      {showAuthModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Войдите или зарегистрируйтесь</h3>
            <button onClick={handleLogin}>Войти</button>
            <button onClick={handleRegister}>Создать учётную запись</button>
            <button onClick={() => setShowAuthModal(false)}>Отмена</button>
          </div>
        </div>
      )}


      {showRegisterModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Регистрация</h3>
            <input
              type="text"
              placeholder="Имя"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              required
            />
            <button onClick={handleConfirmRegister}>Зарегистрироваться</button>
            <button onClick={() => setShowRegisterModal(false)}>Отмена</button>
          </div>
        </div>
      )}


      {showAppointmentModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Запись к {doctor.name}</h3>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <button onClick={handleConfirmAppointment}>Подтвердить</button>
            <button onClick={() => setShowAppointmentModal(false)}>Отмена</button>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className={styles.successModal}>
          <p>Запись успешно создана!</p>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
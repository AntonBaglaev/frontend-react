import React, { useState } from 'react';
import styles from './DoctorCard.module.css';

const DoctorCard = ({ doctor }) => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBookAppointment = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      alert('Пожалуйста, войдите в систему, чтобы записаться.');
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

    const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    localStorage.setItem('appointments', JSON.stringify([...allAppointments, appointment]));

    setShowModal(false);
    alert('Запись успешно создана!');
  };

  return (
    <div className={styles.card}>
      <img src={doctor.photo} alt={doctor.name} className={styles.photo} />
      <h3>{doctor.name}</h3>
      <p>{doctor.specialization}</p>
      <p>Рейтинг: {doctor.rating}</p>
      <button onClick={() => setShowModal(true)}>Записаться</button>

      {showModal && (
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
            <button onClick={handleBookAppointment}>Подтвердить</button>
            <button onClick={() => setShowModal(false)}>Отмена</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
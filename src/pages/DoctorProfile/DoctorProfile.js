import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DoctorProfile.module.css';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentDoctor = JSON.parse(localStorage.getItem('currentDoctor'));
    if (!currentDoctor) {
      navigate('/login');
    } else {
      setDoctor(currentDoctor);
      const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      const doctorAppointments = allAppointments.filter(
        (appointment) => appointment.doctorId === currentDoctor.id
      );
      setAppointments(doctorAppointments);
    }
  }, [navigate]);

  const handleConfirmAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === appointmentId
        ? { ...appointment, status: 'Подтверждено' }
        : appointment
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
  };

  const handleCancelAppointment = (appointmentId) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentDoctor');
    navigate('/login');
  };

  if (!doctor) return null;

  return (
    <div className={styles.doctorProfile}>
      <h2>Личный кабинет врача</h2>
      <div className={styles.doctorInfo}>
        <p>Имя: {doctor.name}</p>
        <p>Специализация: {doctor.specialization}</p>
      </div>
      <div className={styles.appointments}>
        <h3>Записи пациентов:</h3>
        <table className={styles.appointmentsTable}>
          <thead>
            <tr>
              <th>Пациент</th>
              <th>Дата</th>
              <th>Время</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.status || 'Ожидание'}</td>
                <td>
                  <button
                    className={styles.confirmButton}
                    onClick={() => handleConfirmAppointment(appointment.id)}
                  >
                    Подтвердить
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={() => handleCancelAppointment(appointment.id)}
                  >
                    Отменить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Выйти
      </button>
    </div>
  );
};

export default DoctorProfile;
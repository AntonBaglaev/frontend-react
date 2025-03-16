import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className={styles.profile}>
      <h2>Личный кабинет</h2>
      <div className={styles.profileInfo}>
        <p>Имя: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <div className={styles.appointments}>
        <h3>Мои записи:</h3>
        {user.appointments.length > 0 ? (
          <ul className={styles.appointmentsList}>
            {user.appointments.map((appointment, index) => (
              <li key={index} className={styles.appointmentItem}>
                <div className={styles.appointmentDetails}>
                  <p>
                    <strong>Врач:</strong> {appointment.doctorName}
                  </p>
                  <p>
                    <strong>Дата:</strong> {appointment.date}
                  </p>
                  <p>
                    <strong>Время:</strong> {appointment.time}
                  </p>
                </div>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    const updatedAppointments = user.appointments.filter(
                      (_, i) => i !== index
                    );
                    const updatedUser = { ...user, appointments: updatedAppointments };
                    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

                    const users = JSON.parse(localStorage.getItem('users'));
                    const updatedUsers = users.map((u) =>
                      u.id === user.id ? updatedUser : u
                    );
                    localStorage.setItem('users', JSON.stringify(updatedUsers));

                    setUser(updatedUser);
                  }}
                >
                  Отменить запись
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>У вас нет записей.</p>
        )}
      </div>
      <button
        className={styles.navButton}
        onClick={() => navigate('/doctors')}
      >
        Записаться к врачу
      </button>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Выйти
      </button>
    </div>
  );
};

export default Profile;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPhoneAlt,
  faTint,
  faCamera,
  faEdit,
  faCalendarAlt,
  faUserMd,
  faClock,
  faTimesCircle,
  faSignOutAlt,
  faArrowRight,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import styles from './Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('appointments');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodType: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone || '',
        bloodType: currentUser.bloodType || ''
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleCancelAppointment = (index) => {
    const updatedAppointments = user.appointments.filter((_, i) => i !== index);
    const updatedUser = { ...user, appointments: updatedAppointments };

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('users'));
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setUser(updatedUser);
  };

  const formatPhoneNumber = (value) => {
    if (!value) return '';

    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 11);

    const match = limited.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);

    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
    }

    if (cleaned.length > 1) {
      return `+${cleaned[0]} ${cleaned.substring(1, 4)} ${cleaned.substring(4, 7)} ${cleaned.substring(7, 9)} ${cleaned.substring(9, 11)}`.trim();
    }

    return `+${cleaned}`;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length > 0 && cleaned.length !== 11) {
      setPhoneError('Номер должен содержать 11 цифр');
    } else {
      setPhoneError('');
    }

    setFormData(prev => ({
      ...prev,
      phone: cleaned
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    if (formData.phone && formData.phone.length !== 11) {
      setPhoneError('Номер должен содержать 11 цифр');
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bloodType: formData.bloodType
    };

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('users'));
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setUser(updatedUser);
    setEditMode(false);
  };

  if (!user) return <div className={styles.profile__loading}>Загрузка...</div>;

  return (
    <div className={styles.profile}>
      <header className={styles.profile__header}>
        <h1 className={styles.profile__title}>Личный кабинет пациента</h1>
        <button
          className={styles.profile__logout}
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className={styles.profile__buttonIcon} />
          Выйти
        </button>
      </header>

      <div className={styles.profile__content}>
        <aside className={styles.profile__sidebar}>
          <nav className={styles.profile__nav}>
            <button
              className={`${styles.profile__navButton} ${activeTab === 'info' ? styles.profile__navButton_active : ''}`}
              onClick={() => setActiveTab('info')}
            >
              <FontAwesomeIcon icon={faUser} className={styles.profile__navIcon} />
              Личная информация
            </button>
            <button
              className={`${styles.profile__navButton} ${activeTab === 'appointments' ? styles.profile__navButton_active : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className={styles.profile__navIcon} />
              Мои записи
            </button>
            <button
              className={`${styles.profile__navButton} ${activeTab === 'medical' ? styles.profile__navButton_active : ''}`}
              onClick={() => setActiveTab('medical')}
            >
              <FontAwesomeIcon icon={faTint} className={styles.profile__navIcon} />
              Медкарта
            </button>
            <button
              className={`${styles.profile__navButton} ${activeTab === 'documents' ? styles.profile__navButton_active : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <FontAwesomeIcon icon={faUserMd} className={styles.profile__navIcon} />
              Документы
            </button>
          </nav>
        </aside>

        <main className={styles.profile__main}>
          {activeTab === 'info' && (
            <section className={styles.profile__section}>
              <h2 className={styles.profile__sectionTitle}>Личная информация</h2>
              <div className={styles.profile__infoContainer}>
                <div className={styles.profile__photoContainer}>
                  <div className={styles.profile__photoPlaceholder}>
                    <FontAwesomeIcon
                      icon={faCamera}
                      className={styles.profile__photoIcon}
                    />
                  </div>
                  <button className={styles.profile__uploadButton}>
                    <FontAwesomeIcon icon={faCamera} className={styles.profile__buttonIcon} />
                    Загрузить фото
                  </button>
                </div>

                <div className={styles.profile__dataContainer}>
                  {!editMode ? (
                    <>
                      <div className={styles.profile__dataItem}>
                        <FontAwesomeIcon
                          icon={faUser}
                          className={styles.profile__dataIcon}
                        />
                        <div>
                          <div className={styles.profile__dataLabel}>ФИО</div>
                          <div className={styles.profile__dataValue}>{user.name}</div>
                        </div>
                      </div>

                      <div className={styles.profile__dataItem}>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className={styles.profile__dataIcon}
                        />
                        <div>
                          <div className={styles.profile__dataLabel}>Email</div>
                          <div className={styles.profile__dataValue}>{user.email}</div>
                        </div>
                      </div>

                      <div className={styles.profile__dataItem}>
                        <FontAwesomeIcon
                          icon={faPhoneAlt}
                          className={styles.profile__dataIcon}
                        />
                        <div>
                          <div className={styles.profile__dataLabel}>Телефон</div>
                          <div className={styles.profile__dataValue}>
                            {user.phone ? formatPhoneNumber(user.phone) : 'Не указан'}
                          </div>
                        </div>
                      </div>

                      <div className={styles.profile__dataItem}>
                        <FontAwesomeIcon
                          icon={faTint}
                          className={styles.profile__dataIcon}
                        />
                        <div>
                          <div className={styles.profile__dataLabel}>Группа крови</div>
                          <div className={styles.profile__dataValue}>
                            {user.bloodType || 'Не указана'}
                          </div>
                        </div>
                      </div>

                      <button
                        className={styles.profile__editButton}
                        onClick={() => setEditMode(true)}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className={styles.profile__buttonIcon}
                        />
                        Редактировать
                      </button>
                    </>
                  ) : (
                    <form className={styles.profile__form}>
                      <div className={styles.profile__formGroup}>
                        <FontAwesomeIcon
                          icon={faUser}
                          className={styles.profile__formIcon}
                        />
                        <input
                          className={styles.profile__formInput}
                          type="text"
                          name="name"
                          placeholder="ФИО"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className={styles.profile__formGroup}>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className={styles.profile__formIcon}
                        />
                        <input
                          className={styles.profile__formInput}
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className={`${styles.profile__formGroup} ${phoneError ? styles.profile__formGroup_invalid : ''}`}>
                        <FontAwesomeIcon
                          icon={faPhoneAlt}
                          className={styles.profile__formIcon}
                        />
                        <input
                          className={styles.profile__formInput}
                          type="tel"
                          name="phone"
                          placeholder="+7 999 123 45 67"
                          value={formatPhoneNumber(formData.phone)}
                          onChange={handlePhoneChange}
                          maxLength={19}
                        />
                        {phoneError && (
                          <div className={styles.profile__error}>
                            <FontAwesomeIcon icon={faExclamationCircle} className={styles.profile__errorIcon} />
                            {phoneError}
                          </div>
                        )}
                      </div>

                      <div className={styles.profile__formGroup}>
                        <FontAwesomeIcon
                          icon={faTint}
                          className={styles.profile__formIcon}
                        />
                        <select
                          className={styles.profile__formInput}
                          name="bloodType"
                          value={formData.bloodType}
                          onChange={handleInputChange}
                        >
                          <option value="">Выберите группу крови</option>
                          <option value="I (0)">I (0)</option>
                          <option value="II (A)">II (A)</option>
                          <option value="III (B)">III (B)</option>
                          <option value="IV (AB)">IV (AB)</option>
                        </select>
                      </div>

                      <div className={styles.profile__formActions}>
                        <button
                          className={`${styles.profile__button} ${styles.profile__button_primary}`}
                          type="button"
                          onClick={handleSaveProfile}
                          disabled={!!phoneError}
                        >
                          Сохранить
                        </button>
                        <button
                          className={`${styles.profile__button} ${styles.profile__button_secondary}`}
                          type="button"
                          onClick={() => setEditMode(false)}
                        >
                          Отмена
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </section>
          )}

          {activeTab === 'appointments' && (
            <section className={styles.profile__section}>
              <h2 className={styles.profile__sectionTitle}>Мои записи</h2>
              {user.appointments && user.appointments.length > 0 ? (
                <ul className={styles.profile__appointmentsList}>
                  {user.appointments.map((appointment, index) => (
                    <li key={index} className={styles.profile__appointmentItem}>
                      <div className={styles.profile__appointmentDetails}>
                        <div className={styles.profile__appointmentField}>
                          <FontAwesomeIcon
                            icon={faUserMd}
                            className={styles.profile__appointmentIcon}
                          />
                          <div>
                            <div className={styles.profile__appointmentLabel}>Врач</div>
                            <div className={styles.profile__appointmentValue}>
                              {appointment.doctorName} ({appointment.specialty})
                            </div>
                          </div>
                        </div>
                        <div className={styles.profile__appointmentField}>
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className={styles.profile__appointmentIcon}
                          />
                          <div>
                            <div className={styles.profile__appointmentLabel}>Дата</div>
                            <div className={styles.profile__appointmentValue}>{appointment.date}</div>
                          </div>
                        </div>
                        <div className={styles.profile__appointmentField}>
                          <FontAwesomeIcon
                            icon={faClock}
                            className={styles.profile__appointmentIcon}
                          />
                          <div>
                            <div className={styles.profile__appointmentLabel}>Время</div>
                            <div className={styles.profile__appointmentValue}>{appointment.time}</div>
                          </div>
                        </div>
                      </div>
                      <button
                        className={`${styles.profile__button} ${styles.profile__button_danger}`}
                        onClick={() => handleCancelAppointment(index)}
                      >
                        <FontAwesomeIcon icon={faTimesCircle} className={styles.profile__buttonIcon} />
                        Отменить
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.profile__emptyState}>
                  <p className={styles.profile__emptyText}>У вас нет записей</p>
                  <button
                    className={`${styles.profile__button} ${styles.profile__button_primary}`}
                    onClick={() => navigate('/doctors')}
                  >
                    <FontAwesomeIcon icon={faArrowRight} className={styles.profile__buttonIcon} />
                    Записаться к врачу
                  </button>
                </div>
              )}
            </section>
          )}

          {activeTab === 'medical' && (
            <section className={styles.profile__section}>
              <h2 className={styles.profile__sectionTitle}>Медицинская карта</h2>
              <div className={styles.profile__emptyState}>
                <p className={styles.profile__emptyText}>Раздел в разработке</p>
              </div>
            </section>
          )}

          {activeTab === 'documents' && (
            <section className={styles.profile__section}>
              <h2 className={styles.profile__sectionTitle}>Мои документы</h2>
              <div className={styles.profile__emptyState}>
                <p className={styles.profile__emptyText}>Раздел в разработке</p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
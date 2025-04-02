import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faCalendarAlt, faNotesMedical, 
  faChartLine, faFilePrescription, faSignOutAlt,
  faEdit, faClock, faEnvelope, faStethoscope,
  faBars, faTimes, faStar
} from '@fortawesome/free-solid-svg-icons';
import styles from './DoctorProfile.module.css';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentDoctor = JSON.parse(localStorage.getItem('currentDoctor'));
    if (!currentDoctor) {
      navigate('/login');
    } else {
      // Добавляем значения по умолчанию для отсутствующих полей
      const doctorWithDefaults = {
        rating: 'Не указан',
        education: 'Не указано',
        experience: 'Не указан',
        department: 'Не указано',
        ...currentDoctor
      };
      
      setDoctor(doctorWithDefaults);
      setEditForm({
        name: doctorWithDefaults.name,
        email: doctorWithDefaults.email,
        department: doctorWithDefaults.department,
        specialization: doctorWithDefaults.specialization,
        experience: doctorWithDefaults.experience,
        education: doctorWithDefaults.education
      });
      
      const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      const doctorAppointments = allAppointments.filter(
        (appointment) => appointment.doctorId === doctorWithDefaults.id
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
    updateAppointments(updatedAppointments);
  };

  const handleCancelAppointment = (appointmentId) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    updateAppointments(updatedAppointments);
  };

  const updateAppointments = (updatedAppointments) => {
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentDoctor');
    navigate('/login');
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const saveProfileChanges = () => {
    const updatedDoctor = { ...doctor, ...editForm };
    setDoctor(updatedDoctor);
    
    localStorage.setItem('currentDoctor', JSON.stringify(updatedDoctor));
    
    const doctors = JSON.parse(localStorage.getItem('doctors'));
    const updatedDoctors = doctors.map(d => 
      d.id === updatedDoctor.id ? updatedDoctor : d
    );
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    
    setIsEditing(false);
  };

  const getDayName = (day) => {
    const days = {
      monday: 'Понедельник',
      tuesday: 'Вторник',
      wednesday: 'Среда',
      thursday: 'Четверг',
      friday: 'Пятница',
      saturday: 'Суббота',
      sunday: 'Воскресенье'
    };
    return days[day] || day;
  };

  if (!doctor) return null;

  return (
    <div className={styles['doctor-profile']}>
      {/* Мобильное меню */}
      <button 
        className={styles['doctor-profile__mobile-menu-button']}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Меню"
      >
        <FontAwesomeIcon 
          icon={isMobileMenuOpen ? faTimes : faBars} 
          size="lg" 
        />
      </button>

      {/* Боковая панель */}
      <div className={`${styles['doctor-profile__sidebar']} ${isMobileMenuOpen ? styles['doctor-profile__sidebar--open'] : ''}`}>
        <div className={styles['doctor-card']}>
          <div className={styles['doctor-card__avatar']}>
            <FontAwesomeIcon icon={faUser} size="4x" />
          </div>
          
          {isEditing ? (
            <div className={styles['doctor-card__form']}>
              <div className={styles['doctor-card__form-group']}>
                <label className={styles['doctor-card__label']}>ФИО:</label>
                <input
                  className={styles['doctor-card__input']}
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                />
              </div>
              <div className={styles['doctor-card__form-group']}>
                <label className={styles['doctor-card__label']}>Email:</label>
                <input
                  className={styles['doctor-card__input']}
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                />
              </div>
              <div className={styles['doctor-card__form-group']}>
                <label className={styles['doctor-card__label']}>Отделение:</label>
                <input
                  className={styles['doctor-card__input']}
                  type="text"
                  name="department"
                  value={editForm.department}
                  onChange={handleEditChange}
                />
              </div>
              <div className={styles['doctor-card__form-group']}>
                <label className={styles['doctor-card__label']}>Специализация:</label>
                <input
                  className={styles['doctor-card__input']}
                  type="text"
                  name="specialization"
                  value={editForm.specialization}
                  onChange={handleEditChange}
                />
              </div>
              <div className={styles['doctor-card__form-group']}>
                <label className={styles['doctor-card__label']}>Опыт работы:</label>
                <input
                  className={styles['doctor-card__input']}
                  type="text"
                  name="experience"
                  value={editForm.experience}
                  onChange={handleEditChange}
                />
              </div>
              <div className={styles['doctor-card__form-group']}>
                <label className={styles['doctor-card__label']}>Образование:</label>
                <input
                  className={styles['doctor-card__input']}
                  type="text"
                  name="education"
                  value={editForm.education}
                  onChange={handleEditChange}
                />
              </div>
              <div className={styles['doctor-card__form-actions']}>
                <button 
                  className={`${styles['doctor-card__button']} ${styles['doctor-card__button--save']}`}
                  onClick={saveProfileChanges}
                >
                  Сохранить
                </button>
                <button 
                  className={`${styles['doctor-card__button']} ${styles['doctor-card__button--cancel']}`}
                  onClick={() => setIsEditing(false)}
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className={styles['doctor-card__name']}>{doctor.name}</h2>
              <p className={styles['doctor-card__specialty']}>
                <FontAwesomeIcon icon={faStethoscope} /> {doctor.specialization}
              </p>
              <p className={styles['doctor-card__department']}>{doctor.department}</p>
              
              <div className={styles['doctor-card__details']}>
                <p className={styles['doctor-card__detail']}>
                  <span className={styles['doctor-card__detail-label']}>Опыт:</span> 
                  {doctor.experience}
                </p>
                <p className={styles['doctor-card__detail']}>
                  <span className={styles['doctor-card__detail-label']}>Образование:</span> 
                  {doctor.education}
                </p>
                <p className={styles['doctor-card__detail']}>
                  <span className={styles['doctor-card__detail-label']}>Email:</span> 
                  {doctor.email}
                </p>
                {doctor.rating && (
                  <p className={styles['doctor-card__detail']}>
                    <span className={styles['doctor-card__detail-label']}>
                      <FontAwesomeIcon icon={faStar} color="#f39c12" /> Рейтинг:
                    </span> 
                    {typeof doctor.rating === 'number' ? `${doctor.rating}/5` : doctor.rating}
                  </p>
                )}
              </div>
              
              <button 
                className={`${styles['doctor-card__button']} ${styles['doctor-card__button--edit']}`}
                onClick={() => setIsEditing(true)}
              >
                <FontAwesomeIcon icon={faEdit} /> Редактировать профиль
              </button>
            </>
          )}
        </div>
        
        <nav className={styles['doctor-nav']}>
          <ul className={styles['doctor-nav__list']}>
            <li className={`${styles['doctor-nav__item']} ${activeTab === 'appointments' ? styles['doctor-nav__item--active'] : ''}`}>
              <button 
                className={styles['doctor-nav__button']}
                onClick={() => {
                  setActiveTab('appointments');
                  setIsMobileMenuOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faCalendarAlt} /> Записи пациентов
              </button>
            </li>
            <li className={`${styles['doctor-nav__item']} ${activeTab === 'schedule' ? styles['doctor-nav__item--active'] : ''}`}>
              <button 
                className={styles['doctor-nav__button']}
                onClick={() => {
                  setActiveTab('schedule');
                  setIsMobileMenuOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faClock} /> Расписание
              </button>
            </li>
            <li className={styles['doctor-nav__item']}>
              <button className={styles['doctor-nav__button']}>
                <FontAwesomeIcon icon={faNotesMedical} /> Медкарты
              </button>
            </li>
            <li className={styles['doctor-nav__item']}>
              <button className={styles['doctor-nav__button']}>
                <FontAwesomeIcon icon={faFilePrescription} /> Рецепты
              </button>
            </li>
            <li className={styles['doctor-nav__item']}>
              <button className={styles['doctor-nav__button']}>
                <FontAwesomeIcon icon={faChartLine} /> Статистика
              </button>
            </li>
            <li className={styles['doctor-nav__item']}>
              <button className={styles['doctor-nav__button']}>
                <FontAwesomeIcon icon={faEnvelope} /> Сообщения
              </button>
            </li>
          </ul>
          
          <button 
            className={`${styles['doctor-nav__button']} ${styles['doctor-nav__button--logout']}`}
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Выйти
          </button>
        </nav>
      </div>
      
      <div className={styles['doctor-profile__content']}>
        {activeTab === 'appointments' && (
          <div className={styles['appointments']}>
            <h2 className={styles['appointments__title']}>
              <FontAwesomeIcon icon={faCalendarAlt} /> Предстоящие записи
            </h2>
            
            {appointments.length === 0 ? (
              <p className={styles['appointments__empty']}>Нет предстоящих записей</p>
            ) : (
              <div className={styles['appointments__grid']}>
                {appointments.map((appointment) => (
                  <div 
                    className={`${styles['appointment']} ${styles[`appointment--${appointment.status === 'Подтверждено' ? 'confirmed' : appointment.status === 'Отменено' ? 'cancelled' : 'pending'}`]}`}
                    key={appointment.id}
                  >
                    <div className={styles['appointment__header']}>
                      <h3 className={styles['appointment__patient']}>{appointment.patientName || 'Пациент'}</h3>
                      <span className={styles['appointment__status']}>
                        {appointment.status || 'Ожидание'}
                      </span>
                    </div>
                    
                    <div className={styles['appointment__details']}>
                      <p className={styles['appointment__detail']}>
                        <span className={styles['appointment__detail-label']}>Дата:</span> {appointment.date}
                      </p>
                      <p className={styles['appointment__detail']}>
                        <span className={styles['appointment__detail-label']}>Время:</span> {appointment.time}
                      </p>
                      <p className={styles['appointment__detail']}>
                        <span className={styles['appointment__detail-label']}>Причина:</span> {appointment.reason || 'Не указана'}
                      </p>
                    </div>
                    
                    <div className={styles['appointment__actions']}>
                      <button
                        className={`${styles['appointment__button']} ${styles['appointment__button--confirm']}`}
                        onClick={() => handleConfirmAppointment(appointment.id)}
                      >
                        Подтвердить
                      </button>
                      <button
                        className={`${styles['appointment__button']} ${styles['appointment__button--cancel']}`}
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        Отменить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'schedule' && (
          <div className={styles['schedule']}>
            <h2 className={styles['schedule__title']}>
              <FontAwesomeIcon icon={faClock} /> Мое расписание
            </h2>
            
            {doctor.schedule && Object.keys(doctor.schedule).length > 0 ? (
              <>
                <div className={styles['schedule__grid']}>
                  {Object.entries(doctor.schedule).map(([day, time]) => (
                    <div className={styles['schedule__day']} key={day}>
                      <h3 className={styles['schedule__day-title']}>{getDayName(day)}</h3>
                      <p className={styles['schedule__time']}>
                        <span className={styles['schedule__time-label']}>С:</span> {time.start}
                        <span className={styles['schedule__time-label']}> До:</span> {time.end}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className={styles['schedule__notice']}>
                  <p className={styles['schedule__notice-text']}>Чтобы изменить расписание, обратитесь в администрацию клиники.</p>
                </div>
              </>
            ) : (
              <p className={styles['schedule__empty']}>Расписание не указано</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faCalendarAlt, faNotesMedical, 
  faChartLine, faFilePrescription, faSignOutAlt,
  faEdit, faClock, faEnvelope, faStethoscope,
  faBars, faTimes, faStar, faAward, faInfoCircle,
  faFlask, faHeartbeat, faPills, faPhone, faHome,
  faBirthdayCake, faIdCard, faHistory, faAllergies,
  faSyringe, faWeight, faRuler, faFileMedical,
  faProcedures, faLaptopMedical, faCommentMedical
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

  // Полная загрузка данных из localStorage
  useEffect(() => {
    const loadData = () => {
      const currentDoctor = JSON.parse(localStorage.getItem('currentDoctor'));
      if (!currentDoctor) {
        navigate('/login');
        return;
      }

      const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
      const patients = JSON.parse(localStorage.getItem('patients')) || [];
      const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

      const fullDoctorData = doctors.find(d => d.id === currentDoctor.id) || currentDoctor;

      // Формируем полные данные врача
      const doctorWithData = {
        ...fullDoctorData,
        rating: fullDoctorData.rating || 4.5,
        education: fullDoctorData.education || 'Первый МГМУ им. И.М. Сеченова',
        experience: fullDoctorData.experience || '12 лет',
        department: fullDoctorData.department || 'Терапевтическое отделение',
        bio: fullDoctorData.bio || 'Специалист высшей категории. Основные направления работы: диагностика и лечение заболеваний внутренних органов.',
        awards: fullDoctorData.awards || [
          'Лучший врач года - 2020',
          'Премия за excellence в медицине - 2019'
        ],
        schedule: fullDoctorData.schedule || {
          monday: { start: '08:00', end: '16:00' },
          wednesday: { start: '08:00', end: '16:00' },
          friday: { start: '08:00', end: '16:00' }
        },
        stats: {
          patients: patients.filter(p => 
            p.appointments?.some(a => a.doctorId === fullDoctorData.id)).length,
          experienceYears: parseInt(fullDoctorData.experience) || 12,
          successRate: '98%'
        }
      };

      setDoctor(doctorWithData);
      setEditForm({
        name: doctorWithData.name,
        email: doctorWithData.email,
        department: doctorWithData.department,
        specialization: doctorWithData.specialization,
        experience: doctorWithData.experience,
        education: doctorWithData.education,
        bio: doctorWithData.bio
      });

      // Обогащаем записи данными пациентов
      const enrichedAppointments = allAppointments
        .filter(app => app.doctorId === doctorWithData.id)
        .map(app => {
          const patient = patients.find(p => p.id === app.patientId) || {};
          const age = patient.birthDate ? 
            new Date().getFullYear() - new Date(patient.birthDate).getFullYear() : null;
          
          // Получаем все записи этого пациента к текущему врачу
          const doctorVisits = patient.appointments?.filter(a => a.doctorId === doctorWithData.id) || [];
          
          return {
            ...app,
            patientName: patient.name || 'Неизвестный пациент',
            patientData: {
              ...patient,
              age,
              lastVisit: doctorVisits[0]?.date || 'Не указан',
              doctorVisits,
              // Медицинские параметры
              height: patient.height || 'Не указан',
              weight: patient.weight || 'Не указан',
              allergies: patient.allergies || 'Не указаны',
              chronicDiseases: patient.chronicDiseases || 'Не указаны',
              medications: patient.medications || 'Не указаны',
              lastProcedures: patient.procedures || [],
              notes: patient.notes || []
            }
          };
        });

      setAppointments(enrichedAppointments.length > 0 ? enrichedAppointments : getDefaultAppointments(doctorWithData.id, patients));
    };

    loadData();
  }, [navigate]);

  const getDefaultAppointments = (doctorId, patients) => {
    const defaultPatient = patients[0] || {
      id: 1,
      name: 'Смирнова Анна Игоревна',
      email: 'patient@medclinic.ru',
      phone: '+7 (916) 123-45-67',
      birthDate: '1985-05-15',
      address: 'г. Москва, ул. Примерная, д. 10, кв. 25',
      bloodType: 'II (A) Rh+',
      insurancePolicy: '1234567890123456',
      height: '165 см',
      weight: '62 кг',
      allergies: 'Пенициллин',
      medicalHistory: [
        {
          date: '2023-01-10',
          doctor: 'Иванов А.П.',
          diagnosis: 'ОРВИ',
          treatment: 'Постельный режим, обильное питье'
        }
      ],
      appointments: [
        {
          id: 1,
          doctorId: 1,
          date: '2023-12-15',
          time: '10:00',
          reason: 'Плановый осмотр',
          status: 'Подтверждена'
        }
      ]
    };

    return [
      {
        id: 1,
        doctorId,
        patientName: defaultPatient.name,
        patientId: defaultPatient.id,
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: '10:00',
        status: 'Подтверждена',
        reason: 'Плановый осмотр',
        diagnosis: '',
        prescription: '',
        patientData: {
          ...defaultPatient,
          age: defaultPatient.birthDate ? 
            new Date().getFullYear() - new Date(defaultPatient.birthDate).getFullYear() : null,
          lastVisit: defaultPatient.appointments?.[0]?.date || 'Не указан',
          doctorVisits: defaultPatient.appointments || []
        }
      }
    ];
  };

  const handleConfirmAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === appointmentId
        ? { ...appointment, status: 'Подтверждена' }
        : appointment
    );
    updateAppointments(updatedAppointments);
  };

  const handleCancelAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === appointmentId
        ? { ...appointment, status: 'Отменена' }
        : appointment
    );
    updateAppointments(updatedAppointments);
  };

  const updateAppointments = (updatedAppointments) => {
    // Обновляем глобальный список записей
    const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const updatedAllAppointments = allAppointments.map(app => {
      const updatedApp = updatedAppointments.find(a => a.id === app.id);
      return updatedApp || app;
    });
    localStorage.setItem('appointments', JSON.stringify(updatedAllAppointments));

    // Обновляем записи у пациентов
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const updatedPatients = patients.map(patient => {
      if (!patient.appointments) return patient;
      
      const updatedPatientAppointments = patient.appointments.map(app => {
        const updatedApp = updatedAppointments.find(a => a.id === app.id);
        return updatedApp || app;
      });
      
      return { ...patient, appointments: updatedPatientAppointments };
    });
    localStorage.setItem('patients', JSON.stringify(updatedPatients));

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
    
    // Обновляем данные врача во всех хранилищах
    localStorage.setItem('currentDoctor', JSON.stringify(updatedDoctor));
    
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Подтверждена':
        return <FontAwesomeIcon icon={faHeartbeat} className={styles['appointment__status-icon']} />;
      case 'Ожидает подтверждения':
        return <FontAwesomeIcon icon={faClock} className={styles['appointment__status-icon']} />;
      case 'Отменена':
        return <FontAwesomeIcon icon={faTimes} className={styles['appointment__status-icon']} />;
      default:
        return <FontAwesomeIcon icon={faInfoCircle} className={styles['appointment__status-icon']} />;
    }
  };

  if (!doctor) return null;

  return (
    <div className={styles['doctor-profile']}>
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
              <div className={styles['doctor-card__form-group']}>
                <label className={styles['doctor-card__label']}>О себе:</label>
                <textarea
                  className={`${styles['doctor-card__input']} ${styles['doctor-card__textarea']}`}
                  name="bio"
                  value={editForm.bio}
                  onChange={handleEditChange}
                  rows="4"
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
              
              <div className={styles['doctor-card__stats']}>
                <div className={styles['doctor-card__stat']}>
                  <div className={styles['doctor-card__stat-value']}>{doctor.stats?.patients}+</div>
                  <div className={styles['doctor-card__stat-label']}>Пациентов</div>
                </div>
                <div className={styles['doctor-card__stat']}>
                  <div className={styles['doctor-card__stat-value']}>{doctor.stats?.experienceYears}</div>
                  <div className={styles['doctor-card__stat-label']}>Лет опыта</div>
                </div>
                <div className={styles['doctor-card__stat']}>
                  <div className={styles['doctor-card__stat-value']}>{doctor.stats?.successRate}</div>
                  <div className={styles['doctor-card__stat-label']}>Успешности</div>
                </div>
              </div>
              
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
                <p className={styles['doctor-card__detail']}>
                  <span className={styles['doctor-card__detail-label']}>
                    <FontAwesomeIcon icon={faStar} color="#f39c12" /> Рейтинг:
                  </span> 
                  {typeof doctor.rating === 'number' ? `${doctor.rating}/5` : doctor.rating}
                </p>
              </div>
              
              <div className={styles['doctor-card__bio']}>
                <h4 className={styles['doctor-card__bio-title']}>О себе:</h4>
                <p>{doctor.bio}</p>
              </div>
              
              {doctor.awards && doctor.awards.length > 0 && (
                <div className={styles['doctor-card__awards']}>
                  <h4 className={styles['doctor-card__awards-title']}>
                    <FontAwesomeIcon icon={faAward} /> Награды:
                  </h4>
                  <ul className={styles['doctor-card__awards-list']}>
                    {doctor.awards.map((award, index) => (
                      <li key={index} className={styles['doctor-card__award']}>
                        {award}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
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
                    className={`${styles['appointment']} ${styles[`appointment--${appointment.status === 'Подтверждена' ? 'confirmed' : appointment.status === 'Отменена' ? 'cancelled' : 'pending'}`]}`}
                    key={appointment.id}
                  >
                    <div className={styles['appointment__header']}>
                      <h3 className={styles['appointment__patient']}>{appointment.patientName}</h3>
                      <span className={styles['appointment__status']}>
                        {getStatusIcon(appointment.status)}
                        {appointment.status}
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
                        <span className={styles['appointment__detail-label']}>Причина:</span> {appointment.reason}
                      </p>
                    </div>
                    
                    <div className={styles['appointment__patient-info']}>
                      <h4 className={styles['appointment__patient-info-title']}>
                        <FontAwesomeIcon icon={faUser} /> Полная информация о пациенте
                      </h4>
                      
                      <div className={styles['appointment__patient-info-grid']}>
                        {/* Контактная информация */}
                        <div className={styles['appointment__patient-info-item']}>
                          <FontAwesomeIcon icon={faEnvelope} className={styles['appointment__patient-info-icon']} />
                          <span className={styles['appointment__patient-info-label']}>Email:</span>
                          <span>{appointment.patientData?.email || 'Не указан'}</span>
                        </div>
                        
                        <div className={styles['appointment__patient-info-item']}>
                          <FontAwesomeIcon icon={faPhone} className={styles['appointment__patient-info-icon']} />
                          <span className={styles['appointment__patient-info-label']}>Телефон:</span>
                          <span>{appointment.patientData?.phone || 'Не указан'}</span>
                        </div>
                        
                        <div className={styles['appointment__patient-info-item']}>
                          <FontAwesomeIcon icon={faBirthdayCake} className={styles['appointment__patient-info-icon']} />
                          <span className={styles['appointment__patient-info-label']}>Дата рождения:</span>
                          <span>{appointment.patientData?.birthDate || 'Не указана'}</span>
                        </div>
                        
                        <div className={styles['appointment__patient-info-item']}>
                          <FontAwesomeIcon icon={faUser} className={styles['appointment__patient-info-icon']} />
                          <span className={styles['appointment__patient-info-label']}>Возраст:</span>
                          <span>{appointment.patientData?.age || 'Не указан'}</span>
                        </div>
                        
                        <div className={styles['appointment__patient-info-item']}>
                          <FontAwesomeIcon icon={faHome} className={styles['appointment__patient-info-icon']} />
                          <span className={styles['appointment__patient-info-label']}>Адрес:</span>
                          <span>{appointment.patientData?.address || 'Не указан'}</span>
                        </div>
                        
                        {/* Медицинская информация */}
                        <div className={styles['appointment__patient-info-item']}>
                          <FontAwesomeIcon icon={faFlask} className={styles['appointment__patient-info-icon']} />
                          <span className={styles['appointment__patient-info-label']}>Группа крови:</span>
                          <span>{appointment.patientData?.bloodType || 'Не указана'}</span>
                        </div>
                        
                        <div className={styles['appointment__patient-info-item']}>
                          <FontAwesomeIcon icon={faIdCard} className={styles['appointment__patient-info-icon']} />
                          <span className={styles['appointment__patient-info-label']}>Страховой полис:</span>
                          <span>{appointment.patientData?.insurancePolicy || 'Не указан'}</span>
                        </div>
                        
                        <div className={styles['appointment__patient-info-item']}>
                          <FontAwesomeIcon icon={faRuler} className={styles['appointment__patient-info-icon']} />
                          <span className={styles['appointment__patient-info-label']}>Рост:</span>
                          <span>{appointment.patientData?.height || 'Не указан'}</span>
                        </div>
                        
                        <div className={styles['appointment__patient-info-item']}>
                          <FontAwesomeIcon icon={faWeight} className={styles['appointment__patient-info-icon']} />
                          <span className={styles['appointment__patient-info-label']}>Вес:</span>
                          <span>{appointment.patientData?.weight || 'Не указан'}</span>
                        </div>
                        
                        <div className={styles['appointment__patient-info-item']}>
                          <FontAwesomeIcon icon={faAllergies} className={styles['appointment__patient-info-icon']} />
                          <span className={styles['appointment__patient-info-label']}>Аллергии:</span>
                          <span>{appointment.patientData?.allergies || 'Не указаны'}</span>
                        </div>
                        
                        <div className={styles['appointment__patient-info-item']}>
                          <FontAwesomeIcon icon={faFileMedical} className={styles['appointment__patient-info-icon']} />
                          <span className={styles['appointment__patient-info-label']}>Хронические заболевания:</span>
                          <span>{appointment.patientData?.chronicDiseases || 'Не указаны'}</span>
                        </div>
                        
                        <div className={styles['appointment__patient-info-item']}>
                          <FontAwesomeIcon icon={faPills} className={styles['appointment__patient-info-icon']} />
                          <span className={styles['appointment__patient-info-label']}>Принимаемые препараты:</span>
                          <span>{appointment.patientData?.medications || 'Не указаны'}</span>
                        </div>
                      </div>
                      
                      {/* История болезней */}
                      {appointment.patientData?.medicalHistory?.length > 0 && (
                        <div className={styles['appointment__patient-history']}>
                          <h5 className={styles['appointment__patient-history-title']}>
                            <FontAwesomeIcon icon={faHistory} /> История болезней:
                          </h5>
                          <ul className={styles['appointment__patient-history-list']}>
                            {appointment.patientData.medicalHistory.map((record, index) => (
                              <li key={index} className={styles['appointment__patient-history-item']}>
                                <strong>{record.date}</strong> - {record.diagnosis} 
                                {record.treatment && ` (Лечение: ${record.treatment})`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Процедуры */}
                      {appointment.patientData?.lastProcedures?.length > 0 && (
                        <div className={styles['appointment__patient-history']}>
                          <h5 className={styles['appointment__patient-history-title']}>
                            <FontAwesomeIcon icon={faProcedures} /> Последние процедуры:
                          </h5>
                          <ul className={styles['appointment__patient-history-list']}>
                            {appointment.patientData.lastProcedures.map((proc, index) => (
                              <li key={index} className={styles['appointment__patient-history-item']}>
                                <strong>{proc.date}</strong> - {proc.name} ({proc.result})
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* История посещений */}
                      {appointment.patientData?.doctorVisits?.length > 0 && (
                        <div className={styles['appointment__patient-history']}>
                          <h5 className={styles['appointment__patient-history-title']}>
                            <FontAwesomeIcon icon={faLaptopMedical} /> История посещений:
                          </h5>
                          <ul className={styles['appointment__patient-history-list']}>
                            {appointment.patientData.doctorVisits.map((visit, index) => (
                              <li key={index} className={styles['appointment__patient-history-item']}>
                                <strong>{visit.date} {visit.time && `в ${visit.time}`}</strong> - {visit.reason}
                                {visit.diagnosis && ` (Диагноз: ${visit.diagnosis})`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Заметки */}
                      {appointment.patientData?.notes?.length > 0 && (
                        <div className={styles['appointment__patient-history']}>
                          <h5 className={styles['appointment__patient-history-title']}>
                            <FontAwesomeIcon icon={faCommentMedical} /> Заметки:
                          </h5>
                          <ul className={styles['appointment__patient-history-list']}>
                            {appointment.patientData.notes.map((note, index) => (
                              <li key={index} className={styles['appointment__patient-history-item']}>
                                <strong>{note.date}</strong> - {note.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className={styles['appointment__actions']}>
                      {appointment.status !== 'Подтверждена' && (
                        <button
                          className={`${styles['appointment__button']} ${styles['appointment__button--confirm']}`}
                          onClick={() => handleConfirmAppointment(appointment.id)}
                        >
                          <FontAwesomeIcon icon={faHeartbeat} /> Подтвердить
                        </button>
                      )}
                      {appointment.status !== 'Отменена' && (
                        <button
                          className={`${styles['appointment__button']} ${styles['appointment__button--cancel']}`}
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          <FontAwesomeIcon icon={faTimes} /> Отменить
                        </button>
                      )}
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
                      <div className={styles['schedule__slots']}>
                        {generateTimeSlots(time.start, time.end).map((slot, index) => (
                          <div key={index} className={styles['schedule__slot']}>
                            {slot}
                          </div>
                        ))}
                      </div>
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

  function generateTimeSlots(start, end) {
    const slots = [];
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    
    let currentHour = startHour;
    let currentMinute = startMinute;
    
    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const nextHour = currentMinute + 30 >= 60 ? currentHour + 1 : currentHour;
      const nextMinute = currentMinute + 30 >= 60 ? currentMinute + 30 - 60 : currentMinute + 30;
      
      const slotEndHour = nextHour;
      const slotEndMinute = nextMinute;
      
      if (slotEndHour > endHour || (slotEndHour === endHour && slotEndMinute > endMinute)) {
        break;
      }
      
      const formatTime = (hour, minute) => 
        `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      slots.push(
        `${formatTime(currentHour, currentMinute)} - ${formatTime(slotEndHour, slotEndMinute)}`
      );
      
      currentHour = nextHour;
      currentMinute = nextMinute;
    }
    
    return slots;
  }
};

export default DoctorProfile;
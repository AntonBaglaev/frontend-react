import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

const initialDoctors = [
  {
    id: 1,
    name: 'Иванов Алексей Петрович',
    department: 'Терапевтическое отделение',
    specialization: 'Терапевт',
    experience: '12 лет',
    rating: 4.5,
    education: 'Первый МГМУ им. И.М. Сеченова',
    photo: 'doctor1.jpg',
    email: "therapist1@medclinic.ru",
    password: "doctor123",
    schedule: {
      monday: { start: '08:00', end: '16:00' },
      wednesday: { start: '08:00', end: '16:00' },
      friday: { start: '08:00', end: '16:00' }
    }
  },
  {
    id: 2,
    name: 'Ковалева Светлана Владимировна',
    department: 'Терапевтическое отделение',
    specialization: 'Терапевт',
    experience: '10 лет',
    rating: 4.7,
    education: 'РНИМУ им. Н.И. Пирогова',
    photo: 'doctor2.jpg',
    email: "therapist2@medclinic.ru",
    password: "doctor123",
    schedule: {
      tuesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      saturday: { start: '10:00', end: '14:00' }
    }
  },
  {
    id: 3,
    name: 'Гусев Артем Сергеевич',
    department: 'Терапевтическое отделение',
    specialization: 'Терапевт',
    experience: '9 лет',
    rating: 4.6,
    education: 'МГМСУ им. А.И. Евдокимова',
    photo: 'doctor3.jpg',
    email: "therapist3@medclinic.ru",
    password: "doctor123",
    schedule: {
      monday: { start: '14:00', end: '20:00' },
      wednesday: { start: '14:00', end: '20:00' },
      friday: { start: '14:00', end: '20:00' }
    }
  },
  {
    id: 4,
    name: 'Петрова Елена Викторовна',
    department: 'Кардиологическое отделение',
    specialization: 'Кардиолог',
    experience: '15 лет',
    rating: 4.9,
    education: 'Первый МГМУ им. И.М. Сеченова',
    photo: 'doctor4.jpg',
    email: "cardiologist1@medclinic.ru",
    password: "doctor123",
    schedule: {
      monday: { start: '08:00', end: '15:00' },
      tuesday: { start: '08:00', end: '15:00' },
      thursday: { start: '08:00', end: '15:00' }
    }
  },
  {
    id: 5,
    name: 'Семенов Игорь Дмитриевич',
    department: 'Кардиологическое отделение',
    specialization: 'Кардиолог',
    experience: '13 лет',
    rating: 4.8,
    education: 'РНИМУ им. Н.И. Пирогова',
    photo: 'doctor5.jpg',
    email: "cardiologist2@medclinic.ru",
    password: "doctor123",
    schedule: {
      wednesday: { start: '10:00', end: '18:00' },
      friday: { start: '10:00', end: '18:00' },
      saturday: { start: '10:00', end: '14:00' }
    }
  },
  {
    id: 6,
    name: 'Михайлова Анна Олеговна',
    department: 'Кардиологическое отделение',
    specialization: 'Кардиолог',
    experience: '11 лет',
    rating: 4.7,
    education: 'МГМСУ им. А.И. Евдокимова',
    photo: 'doctor6.jpg',
    email: "cardiologist3@medclinic.ru",
    password: "doctor123",
    schedule: {
      tuesday: { start: '12:00', end: '20:00' },
      thursday: { start: '12:00', end: '20:00' },
      saturday: { start: '09:00', end: '13:00' }
    }
  },
  {
    id: 7,
    name: 'Сидоров Дмитрий Александрович',
    department: 'Хирургическое отделение',
    specialization: 'Хирург',
    experience: '10 лет',
    rating: 4.7,
    education: 'Первый МГМУ им. И.М. Сеченова',
    photo: 'doctor7.jpg',
    email: "surgeon1@medclinic.ru",
    password: "doctor123",
    schedule: {
      monday: { start: '08:00', end: '16:00' },
      wednesday: { start: '08:00', end: '16:00' },
      friday: { start: '08:00', end: '16:00' }
    }
  },
  {
    id: 8,
    name: 'Крылов Виктор Николаевич',
    department: 'Хирургическое отделение',
    specialization: 'Хирург',
    experience: '12 лет',
    rating: 4.8,
    education: 'РНИМУ им. Н.И. Пирогова',
    photo: 'doctor8.jpg',
    email: "surgeon2@medclinic.ru",
    password: "doctor123",
    schedule: {
      tuesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      saturday: { start: '10:00', end: '14:00' }
    }
  },
  {
    id: 9,
    name: 'Белякова Ольга Сергеевна',
    department: 'Хирургическое отделение',
    specialization: 'Хирург',
    experience: '8 лет',
    rating: 4.6,
    education: 'МГМСУ им. А.И. Евдокимова',
    photo: 'doctor9.jpg',
    email: "surgeon3@medclinic.ru",
    password: "doctor123",
    schedule: {
      monday: { start: '14:00', end: '20:00' },
      wednesday: { start: '14:00', end: '20:00' },
      friday: { start: '14:00', end: '20:00' }
    }
  },
  {
    id: 10,
    name: 'Козлова Анна Михайловна',
    department: 'Гинекологическое отделение',
    specialization: 'Гинеколог',
    experience: '8 лет',
    rating: 4.6,
    education: 'Первый МГМУ им. И.М. Сеченова',
    photo: 'doctor10.jpg',
    email: "gynecologist@medclinic.ru",
    password: "doctor123",
    schedule: {
      tuesday: { start: '10:00', end: '18:00' },
      thursday: { start: '10:00', end: '18:00' },
      friday: { start: '10:00', end: '15:00' }
    }
  }
];

const initialPatients = [
  {
    id: 1,
    name: 'Смирнова Анна Игоревна',
    email: 'patient@medclinic.ru',
    password: 'patient123',
    phone: '+7 (916) 123-45-67',
    birthDate: '1985-05-15',
    address: 'г. Москва, ул. Примерная, д. 10, кв. 25',
    bloodType: 'II (A) Rh+',
    insurancePolicy: '1234567890123456',
    appointments: [
      {
        id: 1,
        doctorId: 1,
        doctorName: 'Иванов Алексей Петрович',
        specialization: 'Терапевт',
        date: '2023-12-15',
        time: '10:00',
        status: 'Подтверждена',
        reason: 'Плановый осмотр',
        diagnosis: '',
        prescription: ''
      },
      {
        id: 2,
        doctorId: 4,
        doctorName: 'Петрова Елена Викторовна',
        specialization: 'Кардиолог',
        date: '2023-12-20',
        time: '14:30',
        status: 'Ожидает подтверждения',
        reason: 'Консультация по результатам анализов',
        diagnosis: '',
        prescription: ''
      }
    ],
    medicalHistory: [
      {
        date: '2023-01-10',
        doctor: 'Иванов А.П.',
        diagnosis: 'ОРВИ',
        treatment: 'Постельный режим, обильное питье'
      }
    ]
  }
];

const initializeStorage = () => {
  // Очищаем только необходимые данные
  ['doctors', 'patients', 'users', 'appointments'].forEach(key => {
    localStorage.removeItem(key);
  });

  // Инициализируем данные
  localStorage.setItem('doctors', JSON.stringify(initialDoctors));
  localStorage.setItem('patients', JSON.stringify(initialPatients));
  localStorage.setItem('users', JSON.stringify(initialPatients)); // Для совместимости
  
  // Создаем отдельную коллекцию записей
  const allAppointments = initialPatients.flatMap(p => p.appointments);
  localStorage.setItem('appointments', JSON.stringify(allAppointments));

  if (process.env.NODE_ENV === 'development') {
    console.log('Медицинский центр: данные успешно инициализированы');
    console.log('Доступные врачи:', initialDoctors.map(d => ({
      id: d.id,
      name: d.name,
      specialization: d.specialization,
      email: d.email,
      password: d.password
    })));
    console.log('Тестовый пациент:', {
      email: initialPatients[0].email,
      password: initialPatients[0].password
    });
  }
};

initializeStorage();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
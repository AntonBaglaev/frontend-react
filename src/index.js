import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

const initialDoctors = [
  {
    id: 1,
    name: 'Иван Иванов',
    department: 'Терапевтическое отделение',
    specialization: 'Терапевт',
    experience: '10 лет',
    rating: 4.5,
    photo: '/images/doctors/doctor1.jpg',
    email: "test1@test.ru",
    password: "doctor123",
  },
  {
    id: 2,
    name: 'Мария Петрова',
    department: 'Кардиологическое отделение',
    specialization: 'Кардиолог',
    experience: '8 лет',
    rating: 4.8,
    photo: '/images/doctors/doctor2.jpg',
    email: 'doctor2@example.com',
    password: '456789',
  },
];

const initialUsers = [
  {
    id: 1,
    name: 'Тестовый Пользователь',
    email: 'test@example.com',
    password: '123456',
    appointments: [],
  },
];

const initialAppointments = [
  {
    id: 1,
    doctorId: 1,
    doctorName: 'Иван Иванов',
    patientId: 1,
    patientName: 'Тестовый Пользователь',
    date: '2023-10-15',
    time: '10:00',
    status: 'Ожидание',
  },
];


const initializeLocalStorage = () => {
  if (!localStorage.getItem('doctors')) {
    localStorage.setItem('doctors', JSON.stringify(initialDoctors));
  }

  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(initialUsers));
  }

  if (!localStorage.getItem('appointments')) {
    localStorage.setItem('appointments', JSON.stringify(initialAppointments));
  }


  if (process.env.NODE_ENV === 'development') {
    console.log('Для работы приложения необходимо разместить изображения врачей в public/images/doctors/');
    console.log('Нужны файлы: doctor1.jpg и doctor2.jpg');
  }
};

initializeLocalStorage();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
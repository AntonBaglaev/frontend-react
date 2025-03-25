import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import styles from './Doctors.module.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchParams] = useSearchParams();
  const specialtyFilter = searchParams.get('specialty');

  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];


    const filteredDoctors = specialtyFilter
      ? storedDoctors.filter(doctor => doctor.specialty === specialtyFilter)
      : storedDoctors;

    setDoctors(filteredDoctors);
  }, [specialtyFilter]);

  return (
    <main className={styles.doctors} role="main">
      <div className={styles.doctors__container}>

        <header className={styles.doctors__header}>
          <h1 className={styles.doctors__title}>Наши специалисты</h1>

          <div className={styles.doctors__filters}>
            <Link
              to="/doctors"
              className={`${styles.doctors__filter} ${!specialtyFilter ? styles.doctors__filter_active : ''}`}
            >
              Все врачи
            </Link>
            <Link
              to="/doctors?specialty=therapist"
              className={`${styles.doctors__filter} ${specialtyFilter === 'therapist' ? styles.doctors__filter_active : ''}`}
            >
              Терапевты
            </Link>
            <Link
              to="/doctors?specialty=cardiologist"
              className={`${styles.doctors__filter} ${specialtyFilter === 'cardiologist' ? styles.doctors__filter_active : ''}`}
            >
              Кардиологи
            </Link>
            <Link
              to="/doctors?specialty=neurologist"
              className={`${styles.doctors__filter} ${specialtyFilter === 'neurologist' ? styles.doctors__filter_active : ''}`}
            >
              Неврологи
            </Link>
          </div>
        </header>

        {doctors.length > 0 ? (
          <div className={styles.doctors__grid}>
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className={styles.doctors__empty}>
            <p className={styles.doctors__emptyText}>Врачи по выбранной специализации не найдены</p>
            <Link to="/doctors" className={styles.doctors__emptyLink}>Сбросить фильтры</Link>
          </div>
        )}

        <footer className={styles.doctors__footer}>
          <p className={styles.doctors__footerText}>
            Не нашли нужного специалиста? <Link to="/contacts" className={styles.doctors__footerLink}>Свяжитесь с нами</Link>,
            мы постараемся вам помочь.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Doctors;
import React, { useEffect, useState } from 'react';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import styles from './Doctors.module.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    setDoctors(storedDoctors);
  }, []);

  return (
    <div className={styles.doctors}>
      <h2>Наши врачи</h2>
      <div className={styles.list}>
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default Doctors;
import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <h2>Добро пожаловать в нашу клинику!</h2>
      <p>
        Мы предлагаем качественные медицинские услуги. Запишитесь на прием к
        лучшим врачам.
      </p>
    </div>
  );
};

export default Home;
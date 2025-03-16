import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentDoctor = JSON.parse(localStorage.getItem('currentDoctor'));

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Запись к врачу</h1>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Главная
          </Link>
          <Link to="/doctors" className={styles.navLink}>
            Врачи
          </Link>
          {currentUser ? (
            <Link to="/profile" className={styles.navLink}>
              Профиль
            </Link>
          ) : currentDoctor ? (
            <Link to="/doctor-profile" className={styles.navLink}>
              Кабинет врача
            </Link>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>
                Вход (пациент)
              </Link>
              <Link to="/doctor-login" className={styles.navLink}>
                Вход (врач)
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
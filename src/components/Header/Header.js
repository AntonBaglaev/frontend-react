import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentDoctor = JSON.parse(localStorage.getItem('currentDoctor'));

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header} role="banner">
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}>
          <h1>Запись к врачу</h1>
        </Link>
        
        <nav className={styles.header__nav} aria-label="Основная навигация">
          <ul className={styles.header__navList}>
            <li>
              <Link 
                to="/" 
                className={`${styles.header__navLink} ${isActive('/') ? styles.header__navLink_active : ''}`}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                Главная
              </Link>
            </li>
            <li>
              <Link 
                to="/doctors" 
                className={`${styles.header__navLink} ${isActive('/doctors') ? styles.header__navLink_active : ''}`}
                aria-current={isActive('/doctors') ? 'page' : undefined}
              >
                Врачи
              </Link>
            </li>
            {currentUser ? (
              <li>
                <Link 
                  to="/profile" 
                  className={`${styles.header__navLink} ${isActive('/profile') ? styles.header__navLink_active : ''}`}
                  aria-current={isActive('/profile') ? 'page' : undefined}
                >
                  Профиль
                </Link>
              </li>
            ) : currentDoctor ? (
              <li>
                <Link 
                  to="/doctor-profile" 
                  className={`${styles.header__navLink} ${isActive('/doctor-profile') ? styles.header__navLink_active : ''}`}
                  aria-current={isActive('/doctor-profile') ? 'page' : undefined}
                >
                  Кабинет врача
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className={`${styles.header__navLink} ${isActive('/login') ? styles.header__navLink_active : ''}`}
                    aria-current={isActive('/login') ? 'page' : undefined}
                  >
                    Вход (пациент)
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/doctor-login" 
                    className={`${styles.header__navLink} ${isActive('/doctor-login') ? styles.header__navLink_active : ''}`}
                    aria-current={isActive('/doctor-login') ? 'page' : undefined}
                  >
                    Вход (врач)
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
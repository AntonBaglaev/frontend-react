import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUserMd,
  faUser,
  faSignInAlt,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentDoctor = JSON.parse(localStorage.getItem('currentDoctor'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header} role="banner">
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}>
          <h1>Запись к врачу</h1>
        </Link>

        <div className={styles.header__contact}>
          <FontAwesomeIcon icon={faPhone} className={styles.header__phoneIcon} />
          <a href="tel:+78001234567" className={styles.header__phoneLink}>8 (800) 123-45-67</a>
        </div>

        <button
          className={styles.header__burger}
          onClick={toggleMenu}
          aria-label="Меню"
          aria-expanded={isMenuOpen}
        >
          <span className={styles.header__burgerLine}></span>
          <span className={styles.header__burgerLine}></span>
          <span className={styles.header__burgerLine}></span>
        </button>

        <nav
          className={`${styles.header__nav} ${isMenuOpen ? styles.header__nav_open : ''}`}
          aria-label="Основная навигация"
        >
          <ul className={styles.header__navList}>
            <li>
              <Link
                to="/"
                className={`${styles.header__navLink} ${isActive('/') ? styles.header__navLink_active : ''}`}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                <FontAwesomeIcon icon={faHome} className={styles.header__navIcon} />
                Главная
              </Link>
            </li>
            <li>
              <Link
                to="/doctors"
                className={`${styles.header__navLink} ${isActive('/doctors') ? styles.header__navLink_active : ''}`}
                aria-current={isActive('/doctors') ? 'page' : undefined}
              >
                <FontAwesomeIcon icon={faUserMd} className={styles.header__navIcon} />
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
                  <FontAwesomeIcon icon={faUser} className={styles.header__navIcon} />
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
                  <FontAwesomeIcon icon={faUserMd} className={styles.header__navIcon} />
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
                    <FontAwesomeIcon icon={faSignInAlt} className={styles.header__navIcon} />
                    Вход (пациент)
                  </Link>
                </li>
                <li>
                  <Link
                    to="/doctor-login"
                    className={`${styles.header__navLink} ${isActive('/doctor-login') ? styles.header__navLink_active : ''}`}
                    aria-current={isActive('/doctor-login') ? 'page' : undefined}
                  >
                    <FontAwesomeIcon icon={faSignInAlt} className={styles.header__navIcon} />
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
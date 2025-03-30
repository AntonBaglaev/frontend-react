import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footer__container}>
        <div className={styles.footer__copyright}>
          &copy; {currentYear} Запись к врачу. Все права защищены.
        </div>
        
        <nav className={styles.footer__nav} aria-label="Дополнительная навигация">
          <ul className={styles.footer__navList}>
            <li className={styles.footer__navItem}>
              <Link to="/privacy" className={styles.footer__navLink}>
                Политика конфиденциальности
              </Link>
            </li>
            <li className={styles.footer__navItem}>
              <Link to="/terms" className={styles.footer__navLink}>
                Условия использования
              </Link>
            </li>
            <li className={styles.footer__navItem}>
              <Link to="/contacts" className={styles.footer__navLink}>
                Контакты
              </Link>
            </li>
            <li className={styles.footer__navItem}>
              <Link to="https://a-baglaev.ru?forceClearStorage=1" className={styles.footer__navLink}>
                Очистить LocalStorage
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2023 Запись к врачу. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
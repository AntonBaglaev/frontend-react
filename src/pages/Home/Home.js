import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <main className={styles.home} role="main">

      <section className={styles.hero}>
        <div className={styles.hero__container}>
          <h1 className={styles.hero__title}>Медицинский центр "Здоровье+"</h1>
          <p className={styles.hero__subtitle}>Профессиональная забота о вашем здоровье с 2010 года</p>
          <Link to="/doctors" className={styles.hero__button}>Записаться на прием</Link>
        </div>
      </section>


      <section className={styles.about} aria-labelledby="about-heading">
        <div className={styles.about__container}>
          <h2 id="about-heading" className={styles.about__title}>О нашей клинике</h2>
          <div className={styles.about__content}>
            <p className={styles.about__text}>
              Наш медицинский центр предлагает комплексный подход к диагностике и лечению. 
              Мы объединяем более 50 специалистов различных направлений, использующих 
              современное оборудование и проверенные методики.
            </p>
            <ul className={styles.about__features}>
              <li className={styles.about__feature}>Более 12 лет успешной работы</li>
              <li className={styles.about__feature}>Современное диагностическое оборудование</li>
              <li className={styles.about__feature}>Комфортные условия и индивидуальный подход</li>
              <li className={styles.about__feature}>Доступные цены и прозрачная система скидок</li>
            </ul>
          </div>
        </div>
      </section>


      <section className={styles.services} aria-labelledby="services-heading">
        <div className={styles.services__container}>
          <h2 id="services-heading" className={styles.services__title}>Наши услуги</h2>
          <div className={styles.services__grid}>
            <article className={styles.service}>
              <h3 className={styles.service__title}>Терапия</h3>
              <p className={styles.service__description}>
                Комплексная диагностика и лечение заболеваний внутренних органов
              </p>
              <Link to="/doctors?specialty=therapist" className={styles.service__link}>Выбрать врача</Link>
            </article>
            
            <article className={styles.service}>
              <h3 className={styles.service__title}>Кардиология</h3>
              <p className={styles.service__description}>
                Диагностика и лечение сердечно-сосудистых заболеваний
              </p>
              <Link to="/doctors?specialty=cardiologist" className={styles.service__link}>Выбрать врача</Link>
            </article>
            
            <article className={styles.service}>
              <h3 className={styles.service__title}>Неврология</h3>
              <p className={styles.service__description}>
                Лечение заболеваний нервной системы и реабилитация
              </p>
              <Link to="/doctors?specialty=neurologist" className={styles.service__link}>Выбрать врача</Link>
            </article>
            
            <article className={styles.service}>
              <h3 className={styles.service__title}>Диагностика</h3>
              <p className={styles.service__description}>
                Полный спектр лабораторных и инструментальных исследований
              </p>
              <Link to="/diagnostics" className={styles.service__link}>Подробнее</Link>
            </article>
          </div>
        </div>
      </section>


      <section className={styles.advantages} aria-labelledby="advantages-heading">
        <div className={styles.advantages__container}>
          <h2 id="advantages-heading" className={styles.advantages__title}>Почему выбирают нас</h2>
          <div className={styles.advantages__grid}>
            <div className={styles.advantage}>
              <div className={styles.advantage__icon}>🏥</div>
              <h3 className={styles.advantage__title}>Современное оборудование</h3>
              <p className={styles.advantage__description}>
                Используем только новейшую технику от ведущих мировых производителей
              </p>
            </div>
            
            <div className={styles.advantage}>
              <div className={styles.advantage__icon}>👨‍⚕️</div>
              <h3 className={styles.advantage__title}>Опытные врачи</h3>
              <p className={styles.advantage__description}>
                В нашем центре работают специалисты с опытом от 10 лет
              </p>
            </div>
            
            <div className={styles.advantage}>
              <div className={styles.advantage__icon}>⏱️</div>
              <h3 className={styles.advantage__title}>Экономия времени</h3>
              <p className={styles.advantage__description}>
                Минимальное время ожидания приема благодаря продуманной записи
              </p>
            </div>
            
            <div className={styles.advantage}>
              <div className={styles.advantage__icon}>💰</div>
              <h3 className={styles.advantage__title}>Доступные цены</h3>
              <p className={styles.advantage__description}>
                Гибкая система скидок и специальные предложения для постоянных клиентов
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.cta__container}>
          <h2 className={styles.cta__title}>Готовы позаботиться о своем здоровье?</h2>
          <p className={styles.cta__text}>
            Запишитесь на прием прямо сейчас или задайте вопрос нашим специалистам
          </p>
          <div className={styles.cta__buttons}>
            <Link to="/doctors" className={styles.cta__button}>Записаться онлайн</Link>
            <Link to="/contacts" className={styles.cta__button_secondary}>Контакты</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
import React, { useEffect, useState, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import { DoctorsContext } from '../../context/DoctorsContext';
import styles from './Doctors.module.css';

const Doctors = () => {
    const { doctors, loading, error } = useContext(DoctorsContext);
    const [searchParams] = useSearchParams();
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 9;

    const specialtyFilter = searchParams.get('specialty');

    useEffect(() => {
        if (doctors.length > 0) {
            let result = doctors;

            if (specialtyFilter) {
                result = doctors.filter(doctor =>
                    doctor.specialization.toLowerCase() === specialtyFilter.toLowerCase()
                );
            }

            setFilteredDoctors(result);
            setCurrentPage(1);
        }
    }, [specialtyFilter, doctors]);

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
    const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

    if (loading) return <div className={styles.loading}>Загрузка данных...</div>;
    if (error) return <div className={styles.error}>Ошибка: {error}</div>;

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
                            to="/doctors?specialty=терапевт"
                            className={`${styles.doctors__filter} ${specialtyFilter === 'терапевт' ? styles.doctors__filter_active : ''}`}
                        >
                            Терапевты
                        </Link>
                        <Link
                            to="/doctors?specialty=кардиолог"
                            className={`${styles.doctors__filter} ${specialtyFilter === 'кардиолог' ? styles.doctors__filter_active : ''}`}
                        >
                            Кардиологи
                        </Link>
                    </div>
                </header>

                {currentDoctors.length > 0 ? (
                    <>
                        <div className={styles.doctors__grid}>
                            {currentDoctors.map((doctor) => (
                                <DoctorCard key={doctor.id} doctor={doctor} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className={styles.pagination}>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={styles.paginationButton}
                                >
                                    Назад
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`${styles.paginationButton} ${currentPage === page ? styles.activePage : ''}`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={styles.paginationButton}
                                >
                                    Вперед
                                </button>
                            </div>
                        )}
                    </>
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
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const DoctorsContext = createContext();

export const DoctorsProvider = ({ children }) => {
    const [allDoctors, setAllDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        specialty: '',
        searchQuery: ''
    });

    useEffect(() => {
        const loadDoctors = async () => {
            try {
                const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
                setAllDoctors(storedDoctors);
                setFilteredDoctors(storedDoctors);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadDoctors();
    }, []);

    const applyFilters = useCallback(() => {
        let result = [...allDoctors];

        if (filters.specialty) {
            result = result.filter(doctor =>
                doctor.specialization.toLowerCase() === filters.specialty.toLowerCase()
            );
        }

        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            result = result.filter(doctor =>
                doctor.name.toLowerCase().includes(query) ||
                doctor.specialization.toLowerCase().includes(query)
            );
        }

        setFilteredDoctors(result);
    }, [allDoctors, filters]);

    useEffect(() => {
        if (allDoctors.length > 0) {
            applyFilters();
        }
    }, [applyFilters, allDoctors]);

    const value = {
        doctors: filteredDoctors,
        allDoctors,
        loading,
        error,
        filters,
        setFilters,
        applyFilters
    };

    return (
        <DoctorsContext.Provider value={value}>
            {children}
        </DoctorsContext.Provider>
    );
};
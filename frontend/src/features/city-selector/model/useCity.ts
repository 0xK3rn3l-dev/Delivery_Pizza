'use client';

import { useState, useEffect } from 'react';
import { City, CITIES } from '@/shared/config/interfaces/cities';

interface UseCityProps {
    initialCity?: City;
    onCityChange?: (city: City) => void;
}

export const useCity = ({ initialCity = CITIES[0], onCityChange }: UseCityProps = {}) => {
    const [city, setCity] = useState<City>(initialCity);
    const [isOpen, setIsOpen] = useState(false);
    
    // Загрузка сохраненного города из localStorage
    useEffect(() => {
        const savedCityId = localStorage.getItem('selectedCityId');
        if (savedCityId) {
            const foundCity = CITIES.find(c => c.id === savedCityId);
            if (foundCity) {
                setCity(foundCity);
                onCityChange?.(foundCity);
            }
        }
    }, [onCityChange]);
    
    const handleCitySelect = (selectedCity: City) => {
        setCity(selectedCity);
        setIsOpen(false);
        localStorage.setItem('selectedCityId', selectedCity.id); // Сохраняем id
        onCityChange?.(selectedCity);
    };
    
    const toggleOpen = () => setIsOpen(prev => !prev);
    const closeDropdown = () => setIsOpen(false);
    
    return {
        city,
        isOpen,
        cities: CITIES,
        handleCitySelect,
        toggleOpen,
        closeDropdown,
    };
};
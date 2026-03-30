'use client';

import { useState, useEffect } from 'react';
import { City, CITIES } from './constants';

interface UseCityProps {
    initialCity?: City;
    onCityChange?: (city: City) => void;
}

export const useCity = ({ initialCity = 'Москва', onCityChange }: UseCityProps = {}) => {
    const [city, setCity] = useState<City>(initialCity);
    const [isOpen, setIsOpen] = useState(false);
    
    // Загрузка сохраненного города из localStorage
    useEffect(() => {
        const savedCity = localStorage.getItem('selectedCity') as City;
        if (savedCity && CITIES.includes(savedCity)) {
            setCity(savedCity);
            onCityChange?.(savedCity);
        }
    }, [onCityChange]);
    
    const handleCitySelect = (selectedCity: City) => {
        setCity(selectedCity);
        setIsOpen(false);
        localStorage.setItem('selectedCity', selectedCity);
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
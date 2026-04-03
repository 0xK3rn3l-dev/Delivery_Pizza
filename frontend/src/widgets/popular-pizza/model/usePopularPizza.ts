'use client';

import { useState, useEffect } from 'react';
import { Pizza } from './types';

// Временные данные, позже замените на API
const mockPizzas: Pizza[] = [
    {
        id: 1,
        name: 'Маргарита',
        description: 'Томатный соус, моцарелла, базилик, оливковое масло',
        price: 450,
        image: '/images/menu/pizzas/margherita.jpg',
        weight: 450,
        rating: 4.8,
    },
    {
        id: 2,
        name: 'Пепперони',
        description: 'Томатный соус, пепперони, моцарелла, орегано',
        price: 550,
        image: '/images/menu/pizzas/pepperoni.jpg',
        weight: 500,
        rating: 4.9,
    },
    {
        id: 3,
        name: 'Гавайская',
        description: 'Томатный соус, курица, ананас, моцарелла',
        price: 520,
        image: '/images/menu/pizzas/hawaiian.jpg',
        weight: 480,
        rating: 4.7,
    },
    {
        id: 4,
        name: 'Четыре сыра',
        description: 'Сливочный соус, моцарелла, пармезан, горгонзола, фета',
        price: 580,
        image: '/images/menu/pizzas/four-cheese.jpg',
        weight: 520,
        rating: 4.9,
    },
];

export const usePopularPizza = () => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Имитация загрузки с API
        const fetchPizzas = async () => {
            try {
                setIsLoading(true);
                // Здесь будет реальный API запрос
                // const response = await fetch('/api/pizzas/popular');
                // const data = await response.json();
                
                // Пока используем моковые данные
                setTimeout(() => {
                    setPizzas(mockPizzas);
                    setIsLoading(false);
                }, 500);
            } catch (err) {
                setError('Ошибка загрузки пицц');
                setIsLoading(false);
            }
        };

        fetchPizzas();
    }, []);

    return { pizzas, isLoading, error };
};
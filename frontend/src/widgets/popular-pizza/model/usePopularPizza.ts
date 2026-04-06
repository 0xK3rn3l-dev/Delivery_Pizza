'use client';

import { useState, useEffect } from 'react';
import { PopularPizza } from './interfaces';
import { PopularPizzas } from '@/shared/api/data-PopularPizza';


export const usePopularPizza = () => {
    const [pizzas, setPizzas] = useState<PopularPizza[]>([]);
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
                    setPizzas(PopularPizzas);
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
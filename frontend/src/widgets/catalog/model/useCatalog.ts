'use client';

import { useState, useMemo } from 'react';
import { ProductCardProps } from '@/widgets/product-card/model/types';
import { catalogData } from './catalogData';

export type CategoryType = 'all' | 'pizza' | 'drink' | 'snack' | 'sauce';

export const useCatalog = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Фильтрация товаров по категории и поиску
    const filteredProducts = useMemo(() => {
        let products = catalogData;
        
        // Фильтр по категории
        if (activeCategory !== 'all') {
            products = products.filter(product => product.category === activeCategory);
        }
        
        // Фильтр по поиску
        if (searchQuery.trim()) {
            products = products.filter(product => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        return products;
    }, [activeCategory, searchQuery]);

    // Получение количества товаров по категориям
    const categoryCounts = useMemo(() => {
        return {
            all: catalogData.length,
            pizza: catalogData.filter(p => p.category === 'pizza').length,
            drink: catalogData.filter(p => p.category === 'drink').length,
            snack: catalogData.filter(p => p.category === 'snack').length,
            sauce: catalogData.filter(p => p.category === 'sauce').length,
        };
    }, []);

    const setCategory = (category: CategoryType) => {
        setActiveCategory(category);
    };

    return {
        products: filteredProducts,
        activeCategory,
        setCategory,
        searchQuery,
        setSearchQuery,
        categoryCounts,
        isLoading: false,
        error: null,
    };
};
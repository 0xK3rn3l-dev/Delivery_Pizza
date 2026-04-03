'use client';

import { useState, useEffect } from 'react';
import { ProductCardProps } from '@/widgets/product-card/model/types';

export interface CartItem extends ProductCardProps {
    quantity: number;
}

export const useCartSidebar = () => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Загрузка корзины из localStorage при монтировании
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart:', e);
            }
        }
    }, []);

    // Сохранение корзины в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    // Управление прокруткой фона при открытии/закрытии корзины
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Добавление товара в корзину
    const addToCart = (product: ProductCardProps, quantity: number = 1) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    // Обновление количества товара
    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    // Удаление товара из корзины
    const removeItem = (id: number) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Очистка корзины
    const clearCart = () => {
        setItems([]);
    };

    // Открыть/закрыть корзину
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const toggleCart = () => setIsOpen(prev => !prev);

    // Подсчет общей суммы
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Подсчет общего количества товаров
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
        items,
        isOpen,
        totalPrice,
        totalItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
    };
};
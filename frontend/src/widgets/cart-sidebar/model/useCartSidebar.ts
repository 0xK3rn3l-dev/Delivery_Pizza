'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProductCardProps } from '@/widgets/product-card/model/types';

export interface CartItem extends ProductCardProps {
    quantity: number;
}

export const useCartSidebar = () => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);



    // ✅ Загружаем корзину один раз при монтировании
    useEffect(() => {
        const loadCart = () => {
            try {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart);
                    if (Array.isArray(parsedCart)) {
                        setItems(parsedCart);
                    }
                }
            } catch (error) {
                console.error('Failed to load cart:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCart();
    }, []); // Пустой массив - выполняется один раз


    // ✅ Сохраняем при каждом изменении (но не во время загрузки)
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('cart', JSON.stringify(items));
        }
    }, [items, isLoading]);



    // lock back scroll
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


    const addToCart = useCallback((product: ProductCardProps, quantity: number = 1) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
    }, []);


    const updateQuantity = useCallback((id: number, quantity: number) => {
        if (quantity <= 0) {
            setItems(prevItems => prevItems.filter(item => item.id !== id));
            return;
        }
        
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    }, []);


    const removeItem = useCallback((id: number) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    }, []);


    const clearCart = useCallback(() => {
        setItems([]);
        localStorage.removeItem('cart');
    }, []);



    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);
    const toggleCart = useCallback(() => setIsOpen(prev => !prev), []);

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
        items,
        isOpen,
        totalPrice,
        totalItems,
        isLoading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
    };
};
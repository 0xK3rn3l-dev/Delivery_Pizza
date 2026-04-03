'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCartSidebar, CartItem } from './useCartSidebar';

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    totalPrice: number;
    totalItems: number;
    addToCart: (product: any, quantity?: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const cart = useCartSidebar();
    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
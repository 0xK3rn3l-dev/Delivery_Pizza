'use client';

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from '../model/useCartSidebar';
import { useEffect } from 'react';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveItem: (id: number) => void;
}

export const CartSidebar = ({ 
    isOpen, 
    onClose, 
    items, 
    onUpdateQuantity,
    onRemoveItem 
}: CartSidebarProps) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);


    const handleCheckout = () => {
        window.location.href = '/checkout';
    };

    return (
        <>
            {/* Затемнение фона */}
            <div 
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 z-50 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={onClose}
            />
            
            {/* Боковая панель корзины */}
            <div 
                className={`fixed top-0 right-0 h-full w-full md:w-[450px] lg:w-[500px] bg-white shadow-2xl transition-transform duration-300 z-50 flex flex-col ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Заголовок */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-orange-500" />
                        <h2 className="text-xl font-bold text-gray-800">
                            Корзина
                        </h2>
                        <span className="text-sm text-gray-500">
                            ({totalItems} {totalItems === 1 ? 'товар' : totalItems >= 2 && totalItems <= 4 ? 'товара' : 'товаров'})
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Список товаров */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="text-6xl mb-4">🛒</div>
                            <p className="text-gray-500 text-lg font-medium">
                                Корзина пуста
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                Добавьте товары из меню
                            </p>
                            <Link href="/menu" onClick={onClose}>
                                <button
                                    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition"
                                >
                                    Перейти к меню
                                </button>
                            </Link>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div 
                                key={item.id}
                                className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                            >
                                {/* Изображение */}
                                <div className="relative w-20 h-20 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                                    {item.imageUrl ? (
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-2xl">
                                            🍕
                                        </div>
                                    )}
                                </div>

                                {/* Информация о товаре */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-orange-500 font-bold text-sm mt-1">
                                        {item.price} ₽
                                    </p>
                                    
                                    {/* Управление количеством */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 hover:bg-gray-200 rounded-full transition"
                                        >
                                            <Minus className="h-3.5 w-3.5 text-gray-600" />
                                        </button>
                                        <span className="text-sm font-medium text-gray-700 w-8 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:bg-gray-200 rounded-full transition"
                                        >
                                            <Plus className="h-3.5 w-3.5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Цена за все и удаление */}
                                <div className="flex flex-col items-end justify-between">
                                    <button
                                        onClick={() => onRemoveItem(item.id)}
                                        className="p-1.5 hover:bg-red-100 rounded-full transition group"
                                    >
                                        <Trash2 className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition" />
                                    </button>
                                    <p className="font-bold text-gray-800 text-sm">
                                        {item.price * item.quantity} ₽
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Нижняя часть с итогом и кнопкой */}
                {items.length > 0 && (
                    <div className="border-t border-gray-200 p-4 space-y-3">
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-600 text-sm">Итого:</span>
                            <span className="text-2xl font-bold text-orange-500">{totalPrice} ₽</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                        >
                            Оформить заказ • {totalPrice} ₽
                        </button>
                        
                        <p className="text-xs text-center text-gray-400">
                            Бесплатная доставка от 1000 ₽
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};
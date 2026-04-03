'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { CartIcon } from '@/shared/ui/icons/CartIcon';
import { CartSidebar } from '@/widgets/cart-sidebar/ui/CartSidebar';
import { useCart } from '@/widgets/cart-sidebar/model/CartContext';

export const Header = () => {
    const { items, totalItems, isOpen, openCart, closeCart, updateQuantity, removeItem } = useCart();

    return (
        <>
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-2 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <ThemeSwitcher />
                            <LanguageSwitcher />
                        </div>
                        
                        {/* Навигация */}
                        <nav className="hidden md:flex items-center gap-6">
                            <Link 
                                href="/" 
                                className="text-gray-700 hover:text-orange-500 transition font-semibold text-base"
                            >
                                Главная
                            </Link>

                            <Link 
                                href="/menu" 
                                className="text-gray-700 hover:text-orange-500 transition font-semibold text-base"
                            >
                                Наше Меню
                            </Link>

                            <Link 
                                href="/delivery" 
                                className="text-gray-700 hover:text-orange-500 transition font-semibold text-base"
                            >
                                Доставка
                            </Link>
                        </nav>
                        
                        {/* Кнопки */}
                        <div className="flex items-center gap-3">
                            {/* Круглая кнопка корзины */}
                            <div className="relative">
                                <Button
                                    variant="outline" 
                                    size="sm"
                                    className="rounded-full w-10 h-10 p-0 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
                                    onClick={openCart}
                                >
                                    <CartIcon className="h-5 w-5" />
                                </Button>
                                
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </span>
                                )}
                            </div>
                            
                        <Link href="/auth/login">
                            {/* Кнопка входа */}
                            <Button variant="primary" size="md">
                                Войти
                            </Button>
                        </Link>
                        
                        </div>
                    </div>
                </div>
            </header>

            <CartSidebar 
                isOpen={isOpen}
                onClose={closeCart}
                items={items}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
            />
        </>
    );
};
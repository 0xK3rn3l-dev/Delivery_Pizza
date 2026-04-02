'use client';

import { usePopularPizza } from '../model/usePopularPizza';
import { PizzaCard } from './PizzaCard';
import { PopularPizzaProps } from '../model/types';

export const PopularPizza = ({ title = 'Популярное', className = '' }: PopularPizzaProps) => {
    const { pizzas, isLoading, error } = usePopularPizza();

    const handleAddToCart = (pizza: any) => {
        console.log('Добавлено в корзину:', pizza);
        // Здесь будет логика добавления в корзину
    };
 
    if (isLoading) {
        return (
            <div className={`max-w-5xl mx-auto px-16 py-12 ${className}`}>
                <h2 className="text-2xl font-bold text-gray-800 mb-8">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`max-w-5xl mx-auto px-16 py-12 ${className}`}>
                <div className="text-center text-red-500">
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 text-orange-500 hover:text-orange-600"
                    >
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className={`max-w-5xl mx-auto px-16 py-12 ${className}`}>
        <div className="relative flex justify-center items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <a 
                href="/menu" 
                className="absolute right-0 text-orange-500 hover:text-orange-700 font-medium transition-all duration-300 px-3 py-1 rounded-full hover:bg-orange-50"
            >
                Смотреть всё →
            </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pizzas.map((pizza) => (
                <PizzaCard
                    key={pizza.id}
                    pizza={pizza}
                    onAddToCart={handleAddToCart}
                />
            ))}
        </div>
    </section>
);
};
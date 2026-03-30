'use client';

import Image from 'next/image';
import { Pizza } from '../model/types';

interface PizzaCardProps {
    pizza: Pizza;
    onAddToCart?: (pizza: Pizza) => void;
}

export const PizzaCard = ({ pizza, onAddToCart }: PizzaCardProps) => {
    return (
        <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={pizza.image}
                    alt={pizza.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {pizza.rating && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                        ★ {pizza.rating}
                    </div>
                )}
            </div>
            
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-4 duration-300">
                    {pizza.name}
                </h3>
                
                
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart?.(pizza);
                    }}
                    className="inline-flex items-center justify-center px-5 py-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold text-sm rounded-full transition-all duration-300 cursor-pointer"
                >
                    от {pizza.price} ₽
                </button>
            </div>
        </div>
    );
};
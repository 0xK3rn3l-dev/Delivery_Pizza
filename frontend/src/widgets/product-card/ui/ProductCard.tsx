'use client';

import { ProductCardProps } from '../model/types';
import Image from 'next/image';

interface ProductCardComponentProps {
    product: ProductCardProps;
    onAddToCart?: (product: ProductCardProps) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardComponentProps) => {
    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(product);
        } else {
            console.log('Добавлено в корзину:', product);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group flex flex-col h-full">
            {/* Изображение */}
            <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                        🍕
                    </div>
                )}
            </div>
            
            {/* Информация */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-4 mb-4">
                    {product.description}
                </p>
                
                {/* Отступ автоматически толкает кнопку вниз */}
                <div className="flex-grow"></div>
                
                <div className="pt-2 flex justify-end">
                    <button
                        onClick={handleAddToCart}
                        className="inline-flex items-center justify-center px-4 py-1.5 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold text-sm rounded-full transition-all duration-300 cursor-pointer"
                    >
                        от {product.price} ₽
                    </button>
                </div>
            </div>
        </div>
    );
};
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
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
            {/* Изображение */}
            <div className="relative h-48 bg-gray-100">
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                        🍕
                    </div>
                )}
            </div>
            
            {/* Информация */}
            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-orange-500">{product.price} ₽</span>
                    <button 
                        onClick={handleAddToCart}
                        className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition"
                    >
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    );
};
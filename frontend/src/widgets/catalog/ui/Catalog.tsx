'use client';

import { useCatalog } from '../model/useCatalog';
import { ProductCard } from '@/widgets/product-card/ui/ProductCard';

export const Catalog = () => {
    const { 
        products, 
        activeCategory, 
        setCategory, 
        searchQuery, 
        setSearchQuery,
        categoryCounts 
    } = useCatalog();

    const categories = [
        { id: 'all', name: 'Все'},
        { id: 'pizza', name: 'Пиццы'},
        { id: 'drink', name: 'Напитки'},
        { id: 'snack', name: 'Закуски'},
        { id: 'sauce', name: 'Соусы'},
    ] as const;

    return (
        <div>
            
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Поиск */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Поиск по меню..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md mx-auto block px-4 py-2 rounded-full border border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
                    />
                </div>

                {/* Категории */}
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`
                                px-4 py-2 rounded-full transition-all duration-200
                                ${activeCategory === cat.id 
                                    ? 'bg-orange-500 text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }
                            `}
                        >
                            {/* here was icons... :) */}
                            {/*<span className="mr-1">{cat.icon}</span>*/}
                            {cat.name}
                            <span className={`
                                ml-1 text-xs font-semibold
                                ${activeCategory === cat.id ? 'text-white' : 'text-orange-500'}
                                `}>
                                    ({categoryCounts[cat.id]})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Результаты поиска/фильтрации */}
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Ничего не найдено</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
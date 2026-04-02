export const WhyWe = () => {
    return (
        <div className="max-w-5xl mx-auto px-12 py-2 pb-20">
            {/* Заголовок с декоративной линией */}
            <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-3 mb-2">
                    <div className="w-10 h-0.5 bg-linear-to-r from-transparent to-orange-500"></div>
                    <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                        О нас
                    </span>
                    <div className="w-10 h-0.5 bg-linear-to-l from-transparent to-orange-500"></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Почему мы?</h2>
            </div>

            {/* Карточка */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Левая часть - эмодзи/иконка */}
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <span className="text-5xl md:text-6xl">🍕</span>
                            </div>
                        </div>

                        {/* Правая часть - текст */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                Доставляем вкус с 2015 года
                            </h3>
                            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-3">
                                Мы — команда настоящих профессионалов, которые любят пиццу так же сильно, как и вы. 
                                Готовим только из свежих продуктов, используем итальянские рецепты и авторские начинки.
                            </p>
                            <p className="text-white/80 text-xs md:text-sm">
                                ✦ Более 50 000 довольных клиентов<br />
                                ✦ Среднее время доставки — 30 минут<br />
                                ✦ Собственная служба доставки<br />
                                ✦ Гарантия качества каждого заказа
                            </p>
                        </div>
                    </div>

                    {/* Статистика */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-4 border-t border-white/20">
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-white">8+</div>
                            <div className="text-white/80 text-xs">лет на рынке</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-white">50k+</div>
                            <div className="text-white/80 text-xs">счастливых клиентов</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-white">30</div>
                            <div className="text-white/80 text-xs">минут доставка</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-white">20+</div>
                            <div className="text-white/80 text-xs">видов пиццы</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
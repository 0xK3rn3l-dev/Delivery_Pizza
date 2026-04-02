


export const LogoBanner = () => {
    return (
        <div className="w-full bg-orange-500 py-3 md:py-4 relative overflow-hidden">
            {/* Скошенные углы */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500"></div>
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-white/10 rotate-45"></div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-white/10 rotate-45"></div>
            </div>
            <div className="relative z-10 text-center">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wider">
                    МЕНЮ
                </h1>
            </div>
        </div>
    );
};
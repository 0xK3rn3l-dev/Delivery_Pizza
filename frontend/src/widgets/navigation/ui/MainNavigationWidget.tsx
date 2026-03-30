// widgets/navigation/ui/MainNavigationWidget.tsx
'use client';

import { NavigationWidget } from './NavigationWidget';

export const MainNavigationWidget = () => {
    return (
        <div className={`max-w-5xl mx-auto px-16 mt-8`}>
            <NavigationWidget 
                navItems={['Популярное', 'Отзывы', 'Почему мы']} 
            />
        </div>
    );
};
// widgets/navigation/ui/MainNavigationWidget.tsx
'use client';

import { NavigationWidget } from './NavigationWidget';

export const MainNavigationWidget = () => {
    const navItems = [
        { label: 'Популярное', sectionId: 'popular' },
        { label: 'Отзывы', sectionId: 'reviews' },
        { label: 'О нас', sectionId: 'about' },
    ];

    return (
        <div className={`max-w-5xl mx-auto px-16 mt-8`}>
            <NavigationWidget navItems={navItems} />
        </div>
    );
};
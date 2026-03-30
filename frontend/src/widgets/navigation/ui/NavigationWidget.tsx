'use client';

import { Navigation } from '@/features/navigation';

interface NavigationWidgetProps {
    navItems: string[];
    className?: string;
}

export const NavigationWidget = ({ navItems, className = '' }: NavigationWidgetProps) => {
    return (
            <Navigation navItems={navItems} />
    );
};
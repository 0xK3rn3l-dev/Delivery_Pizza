// widgets/navigation/ui/NavigationWidget.tsx
'use client';

interface NavItem {
    label: string;
    sectionId: string;
}

interface NavigationWidgetProps {
    navItems: NavItem[];
}

export const NavigationWidget = ({ navItems }: NavigationWidgetProps) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            
            // Опционально: обновить URL без перезагрузки
            window.history.pushState({}, '', `#${sectionId}`);
        }
    };

    return (
        <nav className="flex gap-8 justify-center">
            {navItems.map((item) => (
                <a
                    key={item.sectionId}
                    href={`#${item.sectionId}`}
                    onClick={(e) => handleClick(e, item.sectionId)}
                    className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium cursor-pointer"
                >
                    {item.label}
                </a>
            ))}
        </nav>
    );
};
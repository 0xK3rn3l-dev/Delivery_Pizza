'use client';

interface NavigationProps {
    navItems: string[];
    basePath?: string;
}
 
export const Navigation = ({ navItems, basePath = '/' }: NavigationProps) => {
    return (
        <nav className="flex justify-center gap-8 md:gap-6">
            {navItems.map((item) => (
                <a
                    key={item}
                    href={`${basePath}#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-orange-500 transition-all duration-300 ease-in-out font-semibold text-base"
                >
                    {item}
                </a>
            ))}
        </nav>
    );
};
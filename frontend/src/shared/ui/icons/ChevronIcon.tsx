import { SVGProps } from 'react';

interface ChevronIconProps extends SVGProps<SVGSVGElement> {
    isOpen?: boolean;
}

export const ChevronIcon = ({ isOpen, className = '', ...props }: ChevronIconProps) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${className}`}
        {...props}
    >
        <polyline points="6 9 12 15 18 9"/>
    </svg>
);
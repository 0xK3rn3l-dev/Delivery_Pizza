'use client';

import { Button } from '@/shared/ui/button';
import { useCity } from '../model/useCity';
import { City } from '../model/constants';

interface CitySelectorProps {
    onCityChange?: (city: City) => void;
    className?: string;
}

// Иконки лучше вынести в shared/ui/icons
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
    </svg>
);

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
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
        className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
    >
        <polyline points="6 9 12 15 18 9"/>
    </svg>
);

export const CitySelector = ({ onCityChange, className = '' }: CitySelectorProps) => {
    const {
        city,
        isOpen,
        cities,
        handleCitySelect,
        toggleOpen,
        closeDropdown,
    } = useCity({ onCityChange });
    
    return (
        <div className={`relative ${className}`}>
            <Button
                variant="outline"
                size="sm"
                onClick={toggleOpen}
                className="flex items-center gap-2 hover:bg-gray-50 transition-all duration-300"
            >
                <LocationIcon />
                <span>{city}</span>
                <ChevronIcon isOpen={isOpen} />
            </Button>
            
            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-40 bg-black/20 transition-all duration-300" 
                        onClick={closeDropdown} 
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        {cities.map((c) => (
                            <button
                                key={c}
                                onClick={() => handleCitySelect(c)}
                                className={`
                                    block w-full text-left px-4 py-2 text-sm 
                                    transition-all duration-200
                                    ${city === c 
                                        ? 'text-orange-500 bg-orange-50 font-medium' 
                                        : 'text-gray-700 hover:bg-gray-100 hover:pl-6'
                                    }
                                `}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
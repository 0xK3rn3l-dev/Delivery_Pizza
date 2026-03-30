'use client';

import { Button } from '@/shared/ui/button';
import { useCity } from '../model/useCity';
import { City } from '../model/constants';
import { LocationIcon, ChevronIcon } from '@/shared/ui/icons'; 

interface CitySelectorProps {
    onCityChange?: (city: City) => void;
    className?: string;
}

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
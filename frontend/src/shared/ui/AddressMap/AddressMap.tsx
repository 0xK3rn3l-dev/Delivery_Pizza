// shared/ui/AddressMap/AddressMap.tsx
'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { loadYmapsApi } from '@/shared/lib/ymaps-api';
import type { AddressMapProps, AddressMapRef } from './types';

/**
 * Чистый компонент карты без бизнес-логики
 * Может быть переиспользован где угодно
 */
export const AddressMap = forwardRef<AddressMapRef, AddressMapProps>(({
    onAddressSelect,
    onMapClick,
    initialCenter = [55.751574, 37.573856],
    initialZoom = 12,
    height = '400px',
    className = '',
}, ref) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const placemarkRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        setLocation: (coords: [number, number]) => {
            if (placemarkRef.current) {
                placemarkRef.current.geometry.setCoordinates(coords);
            }
            if (mapRef.current) {
                mapRef.current.setCenter(coords);
            }
        },
        getCenter: () => mapRef.current?.getCenter(),
    }));

    useEffect(() => {
        let isMounted = true;

        const initMap = async () => {
            try {
                await loadYmapsApi();
                
                if (!isMounted || !mapContainerRef.current) return;

                // @ts-ignore
                const map = new ymaps.Map(mapContainerRef.current, {
                    center: initialCenter,
                    zoom: initialZoom,
                    controls: ['zoomControl', 'fullscreenControl']
                });

                mapRef.current = map;

                map.events.add('click', async (e: any) => {
                    const coords = e.get('coords');
                    
                    if (onMapClick) {
                        onMapClick(coords);
                    }

                    // Обратное геокодирование
                    // @ts-ignore
                    const result = await ymaps.geocode(coords);
                    const geoObject = result.geoObjects.get(0);
                    const address = geoObject.getAddressLine();
                    const details = {
                        street: geoObject.getThoroughfare() || '',
                        house: geoObject.getPremiseNumber() || '',
                        locality: geoObject.getLocality() || '',
                    };

                    if (onAddressSelect) {
                        onAddressSelect({
                            full: address,
                            coordinates: coords,
                            ...details
                        });
                    }
                });

            } catch (error) {
                console.error('Failed to load map:', error);
            }
        };

        initMap();

        return () => {
            isMounted = false;
            if (mapRef.current) {
                // @ts-ignore
                mapRef.current.destroy();
            }
        };
    }, [initialCenter, initialZoom, onAddressSelect, onMapClick]);

    return (
        <div 
            ref={mapContainerRef} 
            style={{ height, width: '100%' }}
            className={`rounded-xl overflow-hidden ${className}`}
        />
    );
});

AddressMap.displayName = 'AddressMap';
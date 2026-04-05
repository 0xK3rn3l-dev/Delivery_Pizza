// shared/ui/AddressMap/types.ts
export interface AddressMapProps {
    onAddressSelect?: (address: AddressInfo) => void;
    onMapClick?: (coordinates: [number, number]) => void;
    initialCenter?: [number, number];
    initialZoom?: number;
    height?: string;
    className?: string;
}

export interface AddressInfo {
    full: string;
    coordinates: [number, number];
    street: string;
    house: string;
    locality: string;
}

export interface AddressMapRef {
    setLocation: (coords: [number, number]) => void;
    getCenter: () => [number, number];
}
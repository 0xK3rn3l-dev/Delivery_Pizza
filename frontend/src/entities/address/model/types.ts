export interface Address {
    id?: string;
    full: string;
    street: string;
    house: string;
    apartment?: string;
    entrance?: string;
    floor?: string;
    comment?: string;
    coordinates: [number, number];
    isDefault?: boolean;
}
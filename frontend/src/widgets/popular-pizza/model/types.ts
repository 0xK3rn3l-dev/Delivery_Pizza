export interface Pizza {
    id: number;
    name: string;
    description?: string;
    price: number;
    image: string;
    weight: number;
    rating?: number;
}

export interface PopularPizzaProps {
    title?: string;
    className?: string;
}
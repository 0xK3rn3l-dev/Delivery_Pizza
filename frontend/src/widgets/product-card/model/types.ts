export interface ProductCardProps {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category?: 'pizza' | 'drink' | 'snack' | 'sauce'; // добавляем категорию
}
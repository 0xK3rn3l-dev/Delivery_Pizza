export const CITIES = [
    'Москва',
    'Санкт-Петербург',
    'Казань',
    'Новосибирск',
    'Екатеринбург'
] as const;

export type City = typeof CITIES[number];
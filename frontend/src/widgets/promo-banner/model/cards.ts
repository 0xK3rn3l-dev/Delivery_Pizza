export interface PromoCard {
  id: number;
  title: string;
  subtitle: string;
  bgColor: string;
  buttonText: string;
  emoji: string;
  discount: string;
}

export const promoCards: PromoCard[] = [
{
    id: 1,
    title: 'Пицца с доставкой',
    subtitle: 'Свежая, горячая за 30 минут',
    bgColor: 'from-orange-500 to-red-500',
    buttonText: 'Заказать',
    emoji: '🍕',
    discount: '-20%',
  },
  {
    id: 2,
    title: 'Скидка 20%',
    subtitle: 'На первый заказ',
    bgColor: 'from-purple-500 to-pink-500',
    buttonText: 'Получить',
    emoji: '🎁',
    discount: '-20%',
  },
  {
    id: 3,
    title: 'Комбо-обед',
    subtitle: 'Пицца + напиток + закуска',
    bgColor: 'from-green-500 to-teal-500',
    buttonText: 'Выбрать',
    emoji: '🍽️',
    discount: '-30%',
  },
  {
    id: 4,
    title: 'Бесплатная доставка',
    subtitle: 'При заказе от 1000₽',
    bgColor: 'from-blue-500 to-cyan-500',
    buttonText: 'Подробнее',
    emoji: '🛵',
    discount: '🚚',
  },
  {
    id: 5,
    title: 'Подарок к заказу',
    subtitle: 'При заказе от 1000₽',
    bgColor: 'from-pink-500 to-rose-500',
    buttonText: 'Узнать',
    emoji: '🎁',
    discount: '🎁',
  },
];
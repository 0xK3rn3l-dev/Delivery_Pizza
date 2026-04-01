import { StoryCard } from './types';
import { createLinkAction, createButtonAction } from '@/features/story-actions';

export const storyCards: StoryCard[] = [
  {
    id: 1,
    title: 'Пицца с доставкой',
    subtitle: 'Доставляем за 30 минут',
    coverImage: '/images/Banner-cards/pizza_faster_30_min.jpg',
    coverBgColor: 'from-orange-500 to-red-500',
    pages: [
      {
        id: '1-1',
        type: 'image',
        title: 'Пицца с доставкой',
        subtitle: 'Свежая, горячая за 30 минут',
        content: 'Доставим горячую пиццу прямо к вашему столу за 30 минут или следующая бесплатно!',
        image: '/images/Banner-cards/pizza_faster_30_min.jpg',
        action: createLinkAction('/menu', 'Заказать сейчас'),
      },
      {
        id: '1-2',
        type: 'text',
        title: 'Акция',
        subtitle: 'Опоздаем?',
        content: 'Если курьер опоздает более чем на 10 минут — следующая пицца за наш счет!',
        bgColor: 'from-orange-600 to-red-600',
        action: createButtonAction(() => {
          console.log('Подробнее об акции');
          alert('Акция: следующая пицца бесплатно при опоздании более 10 минут!');
        }, 'Подробнее об акции'),
      },
    ],
  },
  {
    id: 2,
    title: 'Большая пицца',
    subtitle: 'За лайк и подписку',
    coverImage: '/images/Banner-cards/big-pizza-podarok.jpg',
    coverBgColor: 'from-purple-500 to-pink-500',
    pages: [
      {
        id: '2-1',
        type: 'image',
        title: 'Большая пицца в подарок!',
        subtitle: 'За лайк и подписку',
        content: 'Поставьте лайк и подпишитесь на наш Telegram-канал и получите большую пиццу 40см в подарок!',
        image: '/images/Banner-cards/big-pizza-podarok.jpg',
        action: createLinkAction('https://t.me/pizza_delivery', 'Перейти в Telegram', '_blank'),
      },
      {
        id: '2-2',
        type: 'text',
        title: 'Как получить',
        subtitle: '3 простых шага',
        content: '1. Подпишитесь на наш Telegram\n2. Поставьте лайк\n3. Покажите подписку курьеру',
        bgColor: 'from-purple-600 to-pink-600',
      },
      {
        id: '2-3',
        type: 'text',
        title: 'Как получить',
        subtitle: '3 простых шага',
        content: '1. Подпишитесь на наш Telegram\n2. Поставьте лайк\n3. Покажите подписку курьеру',
        bgColor: 'from-purple-600 to-pink-600',
      },
      {
        id: '2-4',
        type: 'text',
        title: 'Как получить',
        subtitle: '3 простых шага',
        content: '1. Подпишитесь на наш Telegram\n2. Поставьте лайк\n3. Покажите подписку курьеру',
        bgColor: 'from-purple-600 to-pink-600',
      },
    ],
  },
  {
    id: 3,
    title: 'Комбо-обед',
    subtitle: 'Пицца + напиток + закуска',
    coverImage: '/images/Banner-cards/combo-pizza-napitok-zakuska.jpg',
    coverBgColor: 'from-green-500 to-teal-500',
    pages: [
      {
        id: '3-1',
        type: 'image',
        title: 'Комбо-обед за 499₽',
        subtitle: 'Пицца 30см + напиток + закуска',
        content: 'Выберите один из трех вариантов комбо-обеда',
        image: '/images/Banner-cards/combo-pizza-napitok-zakuska.jpg',
        action: createLinkAction('/combo', 'Выбрать комбо'),
      },


    ],
  },
  {
    id: 4,
    title: 'Бесплатная доставка',
    subtitle: 'При заказе от 1000₽',
    coverImage: '/images/Banner-cards/free-delivery-from-1000-zakaz.jpg',
    coverBgColor: 'from-blue-500 to-cyan-500',
    pages: [
      {
        id: '4-1',
        type: 'image',
        title: 'Бесплатная доставка',
        subtitle: 'При заказе от 1000₽',
        content: 'Экономьте на доставке при каждом заказе от 1000 рублей',
        image: '/images/Banner-cards/free-delivery-from-1000-zakaz.jpg',
        action: createLinkAction('/menu', 'Собрать заказ'),
      },
      {
        id: '4-2',
        type: 'text',
        title: 'Условия акции',
        subtitle: 'Просто и выгодно',
        content: '✔️ Заказ от 1000₽\n✔️ Любая пицца в меню\n✔️ Радиус доставки 10 км\n✔️ Акция бессрочная',
        bgColor: 'from-blue-600 to-cyan-600',
      },
            {
        id: '4-3',
        type: 'text',
        title: 'Условия акции',
        subtitle: 'Просто и выгодно',
        content: '✔️ Заказ от 1000₽\n✔️ Любая пицца в меню\n✔️ Радиус доставки 10 км\n✔️ Акция бессрочная',
        bgColor: 'from-blue-600 to-cyan-600',
      },
    ],
  },
  {
    id: 5,
    title: 'Подарок',
    subtitle: 'При заказе от 3000',
    coverImage: '/images/Banner-cards/podarok-k-zakazu-ot-3000.jpg',
    coverBgColor: 'from-pink-500 to-rose-500',
    pages: [
      {
        id: '5-1',
        type: 'image',
        title: 'Подарок к заказу',
        subtitle: 'При заказе от 3000₽',
        content: 'Получите фирменный мерч или сладкий подарок к вашему заказу',
        image: '/images/Banner-cards/podarok-k-zakazu-ot-3000.jpg',
        action: createLinkAction('/menu', 'Сделать заказ'),
      },
      {
        id: '5-2',
        type: 'image',
        title: 'Что в подарке?',
        subtitle: 'Выбирайте сами',
        content: '🎽 Фирменная футболка\n🍫 Сладкий набор\n🧸 Плюшевая пицца\n🎴 Набор наклеек',
        image: '/images/Banner-cards/podarok-k-zakazu-ot-3000.jpg',
        action: createButtonAction(() => {
          console.log('Узнать о подарках');
          alert('Подарки: футболка, сладкий набор, плюшевая пицца, наклейки!');
        }, 'Узнать о подарках'),
      },
    ],
  },
];

// Для обратной совместимости с PromoCardItem
export const promoCards = storyCards.map(card => ({
  id: card.id,
  title: card.title,
  subtitle: card.subtitle,
  bgColor: card.coverBgColor,
  image: card.coverImage,
  buttonText: 'Подробнее',
  discount: card.discount,
}));
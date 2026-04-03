import { ProductCardProps } from "@/widgets/product-card/model/types";

export const catalogData: ProductCardProps[] = [
    // ПИЦЦЫ
    {
        id: 1,
        name: "Маргарита",
        description: "Томатный соус, моцарелла, базилик",
        price: 499,
        imageUrl: "/images/menu/pizzas/margherita.jpg",
        category: "pizza"
    },
    { 
        id: 2,
        name: "Пепперони",
        description: "Томатный соус, пепперони, моцарелла",
        price: 599,
        imageUrl: "/images/menu/pizzas/pepperoni.jpg",
        category: "pizza"
    },
    {
        id: 3,
        name: "Гавайская",
        description: "Томатный соус, курица, ананас, моцарелла",
        price: 649,
        imageUrl: "/images/menu/pizzas/hawaiian.jpg",
        category: "pizza"
    },
    {
        id: 4,
        name: "Четыре сыра",
        description: "Сливочный соус, моцарелла, пармезан, горгонзола, дорблю",
        price: 699,
        imageUrl: "/images/menu/pizzas/four-cheese.jpg",
        category: "pizza"
    },
    
    // НАПИТКИ
    {
        id: 5,
        name: "Кока-Кола",
        description: "0.5л",
        price: 120,
        imageUrl: "/images/menu/drinks/coca-cola.jpg",
        category: "drink"
    },
    {
        id: 6,
        name: "Сок апельсиновый",
        description: "0.5л",
        price: 150,
        imageUrl: "/images/menu/drinks/juice-orange.jpg",
        category: "drink"
    },
    {
        id: 7,
        name: "Морс клюквенный",
        description: "0.5л",
        price: 130,
        imageUrl: "/images/menu/drinks/cranberry-juice.jpg",
        category: "drink"
    },
    {
        id: 8,
        name: "Чай холодный",
        description: "Липтон, 0.5л",
        price: 100,
        imageUrl: "/images/menu/drinks/ice-tea.jpg",
        category: "drink"
    },
    
    // ЗАКУСКИ
    {
        id: 9,
        name: "Картофель фри",
        description: "Стандартная порция",
        price: 199,
        imageUrl: "/images/menu/snacks/fries.jpg",
        category: "snack"
    },
    {
        id: 10,
        name: "Крылышки BBQ",
        description: "6 шт",
        price: 349,
        imageUrl: "/images/menu/snacks/wings-bbq.jpg",
        category: "snack"
    },
    {
        id: 11,
        name: "Острый перец",
        description: "Маринованный",
        price: 99,
        imageUrl: "/images/menu/snacks/peppers.jpg",
        category: "snack"
    },
    {
        id: 12,
        name: "Сырные палочки",
        description: "4 шт",
        price: 249,
        imageUrl: "/images/menu/snacks/cheese-sticks.jpg",
        category: "snack"
    },
    
    // СОУСЫ
    {
        id: 13,
        name: "Чесночный соус",
        description: "30мл",
        price: 49,
        imageUrl: "/images/menu/sauces/garlic.jpg",
        category: "sauce"
    },
    {
        id: 14,
        name: "Томатный соус",
        description: "30мл",
        price: 49,
        imageUrl: "/images/menu/sauces/tomato-sauce.jpg",
        category: "sauce"
    },
    {
        id: 15,
        name: "Сырный соус",
        description: "30мл",
        price: 59,
        imageUrl: "/images/menu/sauces/cheese-sauce.jpg",
        category: "sauce"
    },
    {
        id: 16,
        name: "BBQ соус",
        description: "30мл",
        price: 59,
        imageUrl: "/images/menu/sauces/bbq-sauce.jpg",
        category: "sauce"
    }
];
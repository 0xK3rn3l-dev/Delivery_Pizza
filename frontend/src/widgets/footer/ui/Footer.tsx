export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-2">Delivery Pizza</h3>
            <p className="text-sm text-gray-400">Доставка вкусной пиццы за 30 минут</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Контакты</h3>
            <p className="text-sm text-gray-400">+7 (999) 123-45-67</p>
            <p className="text-sm text-gray-400">info@pizza-delivery.ru</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Режим работы</h3>
            <p className="text-sm text-gray-400">Ежедневно: 10:00 - 23:00</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          © 2026 Pizza Delivery. Все права защищены.
        </div>
      </div>
    </footer>
  );
};
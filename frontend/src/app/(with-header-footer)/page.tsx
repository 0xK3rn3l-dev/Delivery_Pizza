import { PromoBanner } from '@/widgets/promo-banner';
import { PromoLogo } from '@/widgets/logo';
import { MainNavigationWidget } from '@/widgets/navigation';

function HomePage() {
    return (
        <div>
                <PromoLogo />
                <MainNavigationWidget />
                <PromoBanner />

                <div className="py-12 text-center text-gray-400">
                    <p>Здесь будут популярные пиццы</p>
                    <p>Отзывы</p>
                    <p>Почему мы</p>
                </div>
        </div>
    )
}

export default HomePage
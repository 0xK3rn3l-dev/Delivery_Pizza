import { PromoBanner } from '@/widgets/promo-banner';
import { PromoLogo } from '@/widgets/logo';
import { MainNavigationWidget } from '@/widgets/navigation';
import { PopularPizza } from '@/widgets/popular-pizza';

function HomePage() {
    return (
        <div>
                <PromoLogo />
                <MainNavigationWidget />
                <PromoBanner />
                <PopularPizza />

                <div className="py-12 text-center text-gray-400">
                    <p>Отзывы</p>
                    <p>Почему мы</p>
                </div>
        </div>
    )
}
 
export default HomePage
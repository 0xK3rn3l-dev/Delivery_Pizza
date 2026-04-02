import { PromoBanner } from '@/widgets/promo-banner';
import { PromoLogo } from '@/widgets/logo';
import { MainNavigationWidget } from '@/widgets/navigation';
import { PopularPizza } from '@/widgets/popular-pizza';
import { Reviews } from '@/widgets/reviews';
import { WhyWe } from '@/widgets/why-we';

function HomePage() {
    return (
        <div>
                <PromoLogo />
                <MainNavigationWidget />
                <PromoBanner />
                <PopularPizza />
                <Reviews />
                <WhyWe />
        </div>
    )
}
 
export default HomePage
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

                <section id="popular" className="scroll-mt-20">
                    <PopularPizza />
                </section>
                
                <section id="reviews" className="scroll-mt-20">
                    <Reviews />
                </section>
                
                <section id="about" className="scroll-mt-20">
                    <WhyWe />
                </section>

        </div>
    )
}
 
export default HomePage
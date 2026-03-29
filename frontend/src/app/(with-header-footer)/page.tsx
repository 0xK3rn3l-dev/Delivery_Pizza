import { PromoBanner } from '@/widgets/promo-banner';

function HomePage() {
    return (
        <div>
            <PromoBanner />
            <div className="py-12 text-center text-gray-400">
                <p>Здесь будут популярные пиццы</p>
                <p>Отзывы</p>

            </div>
        </div>
    )
}

export default HomePage
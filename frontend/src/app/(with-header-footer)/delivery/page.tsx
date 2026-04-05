import dynamic from 'next/dynamic';

const DynamicDeliveryWidget = dynamic(
  () => import('@/widgets/delivery-widget/ui/DeliveryWidget').then(mod => mod.DeliveryWidget),
  { 
    ssr: false,
    loading: () => <div className="flex justify-center p-8">Загрузка карты...</div>
  }
);

function DeliveryPage() {
  return (
    <div>
      <DynamicDeliveryWidget />
    </div>
  );
}

export default DeliveryPage;
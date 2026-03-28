// app/(with-header-footer)/layout.tsx
//import { Header } from '@/widgets/header';
//import { Footer } from '@/widgets/footer';

export default function WithHeaderFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </>
  );
}
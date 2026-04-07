export default function WithoutHeaderFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

        <main>
          {children}
        </main>

  );
}
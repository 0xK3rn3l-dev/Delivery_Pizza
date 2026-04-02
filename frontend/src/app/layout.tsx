import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Delivery Pizza",
  description: "Доставка вкусной пиццы",
};


export default function RootLayout({children, }: {children: React.ReactNode;}) {
    return (
        <html lang="ru">
        <body>{children}</body>
        </html>
    );
}
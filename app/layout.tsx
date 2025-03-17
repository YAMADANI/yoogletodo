import type { Metadata } from "next";
import { Noto_Sans_JP , Krona_One } from "next/font/google";
import "./globals.css";

const NotoSans = Noto_Sans_JP({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-noto-sans",
});

const KronaOne = Krona_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-krona',
});

export const metadata: Metadata = {
  title: "YoogleToDo",
  description: "革命的なToDoリスト",
  icons: {
    icon: "/yoogletodo/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`antialiase font-noto-sans`}>
        {children}
      </body>
    </html>
  );
}

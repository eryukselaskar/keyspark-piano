import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'KeySpark - Learn Piano',
  description: 'Learn piano one key at a time with KeySpark.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={clsx(inter.variable, outfit.variable, "font-sans bg-background text-foreground min-h-screen flex flex-col antialiased")}>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

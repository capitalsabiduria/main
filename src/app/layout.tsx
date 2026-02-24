import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Sabiduria Capital | Boutique Wealth Management India',
  description: 'Private wealth advisory, portfolio strategy, and market insights for discerning Indian investors.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <Navbar />
        <main className="mx-auto min-h-[70vh] w-full max-w-6xl px-6 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

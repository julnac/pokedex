import './globals.css';
import { Suspense } from 'react';
import Navigation from '@/app/components/Navigation';

export const metadata = {
  title: 'Pokédex — Discover & Compare Pokémon',
  description: 'Explore, filter, and compare Pokémon with a beautiful interactive Pokédex.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <Navigation />
        </Suspense>
        <main>{children}</main>
      </body>
    </html>
  );
}

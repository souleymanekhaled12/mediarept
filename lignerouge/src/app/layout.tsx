import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'LIGNEROUGE — Média Numérique d\'Élite', template: '%s | LIGNEROUGE' },
  description: 'Plateforme d\'information indépendante. Actualité, Politique, Sport, Société, International, Culture.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'LIGNEROUGE',
    images: [{ url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&h=630&fit=crop' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

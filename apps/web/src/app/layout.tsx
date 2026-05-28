import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Breakout Arcade',
  description: 'Classic brick-breaking arcade game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

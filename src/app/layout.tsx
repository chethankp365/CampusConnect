import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers/Providers';

export const metadata: Metadata = {
  title: 'Campus Connect® // Inter-College Neural Platform',
  description:
    'A retro-futurist 3D student platform connecting 15+ engineering campuses for notes, hackathons, team matching, attendance defense, and AI navigation.',
  keywords: ['Campus Connect', 'College Collaboration', 'Hackathon Teams', 'Study Materials', 'Attendance Tracker', 'N.O.V.A AI'],
  authors: [{ name: 'Campus Connect Team' }],
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Campus Connect® // Inter-College Neural Grid',
    description: 'One student ecosystem operating across colleges. Notes, hackathons, teammates, and attendance.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://db.onlinewebfonts.com/c/5ac3fe7c6abd2f62067f266d89671492?family=HelveticaNowDisplay-Medium"
        />
        <link
          rel="stylesheet"
          href="https://db.onlinewebfonts.com/c/1aa3377e489837a26d019bba501e779d?family=HelveticaNowDisplayW01-Rg"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen antialiased bg-background text-foreground transition-colors selection:bg-signal selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

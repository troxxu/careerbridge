import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Career Bridge: Platform Pengembangan Kesiapan Karier Mahasiswa Teknik & Energi',
  description:
    'Layanan pengembangan kesiapan karier berbasis teknologi dan pendampingan profesional terstruktur (4-week cohort) untuk mahasiswa teknik, energi, dan ketenagalistrikan.',
  keywords: [
    'Career Bridge',
    'Career Readiness Score',
    'Teknik Elektro ITS',
    'Mentoring Energi',
    'Migas',
    'Subsea Electrical',
    'Renewable Energy',
    'SPE ITS SC',
    'BEM FTEIC',
  ],
  authors: [{ name: 'Kelompok 7 Kewirausahaan Berbasis Teknologi ITS' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

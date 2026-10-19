import React from 'react';
import { Hero } from '@/components/landing/Hero';
import { BpEnergyGrid } from '@/components/landing/BpEnergyGrid';
import { PilotShowcase } from '@/components/landing/PilotShowcase';
import { Curriculum } from '@/components/landing/Curriculum';
import { MentorDirectory } from '@/components/landing/MentorDirectory';
import { PricingB2B2C } from '@/components/landing/PricingB2B2C';
import { FaqSection } from '@/components/landing/FaqSection';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Sparkles, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. BP-Style Energy Culture Grid */}
      <BpEnergyGrid />

      {/* 3. Social Proof & Pilot Showcase */}
      <PilotShowcase />

      {/* 4. 4-Week Curriculum */}
      <Curriculum />

      {/* 5. Mentor Directory */}
      <MentorDirectory />

      {/* 6. Pricing Section (B2B2C) */}
      <PricingB2B2C />

      {/* 7. FAQ */}
      <FaqSection />

      {/* 8. Bottom Final Call to Action */}
      <section className="py-20 bg-gradient-to-br from-brand-navy via-slate-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-bp/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-300">
            <Sparkles className="h-4 w-4" />
            Batch 1 Registration Now Open
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Mulai Transformasi Kesiapan Karier Anda Hari Ini
          </h2>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Ambil tes diagnostik gratis dalam 5 menit, ketahui posisi Career Readiness Score Anda, dan persiapkan langkah konkret menuju industri energi dan teknik impian.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/diagnostic" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-brand-bp hover:bg-green-700 text-white font-extrabold text-base shadow-lg shadow-green-600/30 px-8 h-13"
              >
                Mulai Diagnostic Gratis Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/dashboard/student" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-800 font-bold text-base h-13"
              >
                Preview Student Dashboard
              </Button>
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              100% Data Pribadi Terlindungi
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-brand-blue-light" />
              Hasil Asesmen Instan
            </span>
            <span className="flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-amber-400" />
              Rekomendasi Terarah
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

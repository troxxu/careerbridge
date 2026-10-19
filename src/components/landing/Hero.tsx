import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Compass, 
  Award,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/20 pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-400/10 via-emerald-400/10 to-brand-blue/10 blur-3xl -z-10 pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-4">
        {/* Top Pilot Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-4 py-1.5 text-xs font-bold text-brand-blue shadow-xs">
            <Sparkles className="h-4 w-4 text-brand-blue" />
            <span>Pilot Validated: SPE ITS SC Career Coaching Network (100+ Member)</span>
            <span className="hidden sm:inline-block text-slate-300">|</span>
            <span className="hidden sm:inline-block text-slate-600">Teknik Elektro ITS 2026</span>
          </div>
        </div>

        {/* Main Title & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy tracking-tight leading-[1.15]">
            Jembatan Nyata Menuju Karier Impian di{' '}
            <span className="bg-gradient-to-r from-brand-blue via-emerald-600 to-green-600 bg-clip-text text-transparent">
              Industri Teknik & Energi
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Platform kesiapan karier independen berbasis kurikulum 4-minggu dan pendampingan profesional terstruktur.
            Ukur <strong>Career Readiness Score (CRS)</strong> Anda, temukan pasangan mentor industri migas atau energi, dan eksekusi <strong>90-Day Action Plan</strong> nyata.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/diagnostic" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-brand-blue hover:bg-blue-700 text-white font-extrabold text-base shadow-lg shadow-blue-500/20 px-8 h-13 rounded-2xl"
              >
                Mulai Career Diagnostic Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/#curriculum" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-base h-13 rounded-2xl"
              >
                Jelajahi Kurikulum Batch 1
              </Button>
            </Link>
          </div>

          {/* Disclaimer subtext */}
          <p className="text-xs text-slate-500 italic max-w-xl mx-auto pt-1">
            *Program independen terstruktur untuk mengukur dan melatih kesiapan karier. Tidak menjamin kelulusan seleksi magang maupun tawaran pekerjaan.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 text-center shadow-xs hover:border-slate-300 transition-colors">
            <div className="text-3xl font-black text-brand-navy">100+</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              Member Komunitas Pilot
            </div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
              SPE ITS SC Network
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 text-center shadow-xs hover:border-slate-300 transition-colors">
            <div className="text-3xl font-black text-brand-blue">5 Pilar</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              Career Readiness Score
            </div>
            <div className="text-[10px] text-blue-600 font-bold mt-0.5">
              25 Parameter Diagnostik
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 text-center shadow-xs hover:border-slate-300 transition-colors">
            <div className="text-3xl font-black text-emerald-600">4-5 M</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              Mentee per Kelompok
            </div>
            <div className="text-[10px] text-slate-500 font-bold mt-0.5">
              High-Touch Mentoring
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 text-center shadow-xs hover:border-slate-300 transition-colors">
            <div className="text-3xl font-black text-brand-bp">+25.6%</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              Rata-rata Kenaikan CRS
            </div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
              Target Delta &gt; 20%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

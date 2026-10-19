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
import { GridPattern } from '@/components/magicui/grid-pattern';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BorderBeam } from '@/components/magicui/border-beam';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50/70 border-b border-slate-200/80 pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* MagicUI Subtle Grid Pattern (Anti-slop compliant: 3-5% opacity mask) */}
      <GridPattern
        width={36}
        height={36}
        className="opacity-40 stroke-slate-200 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_85%)]"
        squares={[
          [2, 3],
          [5, 1],
          [8, 4],
          [12, 2],
        ]}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Top Pilot Badge with Border Beam */}
        <div className="flex justify-center mb-6">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 backdrop-blur-xs px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-xs">
            <BorderBeam size={48} duration={8} colorFrom="#059669" colorTo="#2563EB" />
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Pilot Validated: SPE ITS SC Coaching Network (100+ Member)</span>
            <span className="hidden sm:inline-block text-slate-300">|</span>
            <span className="hidden sm:inline-block text-slate-500 font-normal">Teknik Elektro ITS 2026</span>
          </div>
        </div>

        {/* Main Title & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            Jembatan Nyata Menuju Karier Impian di{' '}
            <span className="text-emerald-700 underline decoration-emerald-300/60 decoration-wavy decoration-2 underline-offset-8">
              Industri Teknik & Energi
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            Platform kesiapan karier independen berbasis kurikulum 4-minggu dan pendampingan profesional terstruktur.
            Ukur <strong className="font-semibold text-slate-800">Career Readiness Score (CRS)</strong> Anda, temukan pasangan mentor industri migas atau ketenagalistrikan, dan eksekusi <strong className="font-semibold text-slate-800">90-Day Action Plan</strong> nyata.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/diagnostic" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm px-7 h-12 rounded-xl transition-all"
              >
                Mulai Career Diagnostic Gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/#curriculum" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-semibold text-sm h-12 rounded-xl shadow-xs"
              >
                Jelajahi Kurikulum Batch 1
              </Button>
            </Link>
          </div>

          {/* Disclaimer subtext */}
          <p className="text-xs text-slate-500 max-w-xl mx-auto pt-1">
            *Program independen terstruktur untuk mengukur dan melatih kesiapan karier. Tidak menjamin kelulusan seleksi magang maupun tawaran pekerjaan.
          </p>
        </div>

        {/* Stats Row with Number Ticker */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 text-center shadow-xs hover:border-slate-300 transition-colors">
            <div className="text-3xl font-bold text-slate-900 tracking-tight flex items-center justify-center">
              <NumberTicker value={100} />
              <span>+</span>
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-1">
              Member Komunitas Pilot
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
              SPE ITS SC Network
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-5 text-center shadow-xs hover:border-slate-300 transition-colors">
            <div className="text-3xl font-bold text-slate-900 tracking-tight flex items-center justify-center">
              <NumberTicker value={5} />
              <span className="ml-1 text-xl font-medium text-slate-700">Pilar</span>
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-1">
              Career Readiness Score
            </div>
            <div className="text-[11px] text-blue-700 font-medium mt-0.5">
              25 Parameter Diagnostik
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-5 text-center shadow-xs hover:border-slate-300 transition-colors">
            <div className="text-3xl font-bold text-slate-900 tracking-tight flex items-center justify-center">
              <span>4-5</span>
              <span className="ml-1 text-xl font-medium text-slate-700">M</span>
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-1">
              Mentee per Kelompok
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              High-Touch Mentoring
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-5 text-center shadow-xs hover:border-slate-300 transition-colors">
            <div className="text-3xl font-bold text-emerald-700 tracking-tight flex items-center justify-center">
              <span>+</span>
              <NumberTicker value={25.6} decimalPlaces={1} />
              <span>%</span>
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-1">
              Rata-rata Kenaikan CRS
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
              Target Delta &gt; 20%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

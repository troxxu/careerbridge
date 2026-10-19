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
    <section className="relative overflow-hidden bg-slate-50/70 border-b border-slate-200/80 pt-8 pb-12 sm:pt-14 sm:pb-16 lg:pt-20 lg:pb-24">
      {/* MagicUI Subtle Grid Pattern */}
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
        {/* Top Pilot Badge */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 backdrop-blur-xs px-3.5 py-1 text-[11px] sm:text-xs font-semibold text-slate-800 shadow-xs">
            <BorderBeam size={48} duration={8} colorFrom="#059669" colorTo="#2563EB" />
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="truncate max-w-[260px] sm:max-w-none">Pilot Validasi SPE ITS SC Network (100+ Member)</span>
            <span className="hidden sm:inline-block text-slate-300">|</span>
            <span className="hidden sm:inline-block text-slate-500 font-normal">Teknik Elektro ITS</span>
          </div>
        </div>

        {/* Main Title & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-snug sm:leading-[1.18]">
            Jembatan Nyata Menuju Karier Impian di{' '}
            <span className="text-emerald-700 underline decoration-emerald-300/60 decoration-wavy decoration-2 underline-offset-4 sm:underline-offset-8">
              Industri Teknik & Energi
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            Platform kesiapan karier independen berbasis kurikulum 4-minggu dan pendampingan profesional terstruktur.
            Ukur <strong className="font-semibold text-slate-800">Career Readiness Score (CRS)</strong>, temukan pasangan mentor industri migas atau ketenagalistrikan, dan susun <strong className="font-semibold text-slate-800">90-Day Action Plan</strong> nyata.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 pt-2 sm:pt-4">
            <Link href="/diagnostic" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm px-6 h-11 sm:h-12 rounded-xl transition-all"
              >
                Mulai Career Diagnostic Gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/#curriculum" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm h-11 sm:h-12 rounded-xl shadow-xs"
              >
                Jelajahi Kurikulum Batch 1
              </Button>
            </Link>
          </div>

          {/* Disclaimer subtext */}
          <p className="text-[10px] sm:text-xs text-slate-400 max-w-xl mx-auto pt-1">
            *Program independen terstruktur untuk mengukur dan melatih kesiapan karier mahasiswa teknik.
          </p>
        </div>

        {/* Stats Row with Number Ticker (Compact & Mobile Responsive 2x2) */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-5 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center justify-center">
              <NumberTicker value={100} />
              <span>+</span>
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-1">
              Member Pilot
            </div>
            <div className="text-[10px] sm:text-[11px] text-emerald-700 font-medium mt-0.5">
              SPE ITS SC Network
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-5 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center justify-center">
              <NumberTicker value={5} />
              <span className="ml-1 text-base sm:text-xl font-medium text-slate-700">Pilar</span>
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-1">
              Readiness Score
            </div>
            <div className="text-[10px] sm:text-[11px] text-blue-700 font-medium mt-0.5">
              25 Butir Diagnostik
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-5 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center justify-center">
              <span>4-5</span>
              <span className="ml-1 text-base sm:text-xl font-medium text-slate-700">M</span>
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-1">
              Mentee / Grup
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">
              Rasio Terfokus
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-5 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-700 tracking-tight flex items-center justify-center">
              <span>+</span>
              <NumberTicker value={25.6} decimalPlaces={1} />
              <span>%</span>
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-1">
              Target Delta CRS
            </div>
            <div className="text-[10px] sm:text-[11px] text-emerald-700 font-medium mt-0.5">
              Evaluasi Cohort
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

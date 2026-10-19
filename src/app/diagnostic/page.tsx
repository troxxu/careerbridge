import React from 'react';
import { DiagnosticForm } from '@/components/diagnostic/DiagnosticForm';
import { Compass, ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { GridPattern } from '@/components/magicui/grid-pattern';

export const metadata = {
  title: 'Career Diagnostic Test (Free) : Career Bridge',
  description:
    'Asesmen kesiapan karier mandiri 25 butir soal untuk mengukur Career Readiness Score (CRS) pada 5 pilar kompetensi mahasiswa teknik dan energi.',
};

export default function DiagnosticPage() {
  return (
    <div className="relative overflow-hidden bg-slate-50 min-h-screen py-6 sm:py-10 md:py-12">
      <GridPattern
        width={32}
        height={32}
        className="opacity-30 stroke-slate-200 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]"
      />
      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-xs">
            <Compass className="h-3.5 w-3.5 text-emerald-600" />
            <span>Standar Evaluasi Mandiri 2026</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Career Diagnostic Assessment
          </h1>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
            Jawab 25 pertanyaan evaluasi diri (skala Likert 1-5) untuk memetakan kesiapan karier Anda di sektor teknik dan energi. Hasil instan dilengkapi diagram <strong className="font-semibold text-slate-800">Spider Web Radar Chart</strong> dan rekomendasi strategis.
          </p>
        </div>

        {/* 5 Dimensions Highlights - Shown on tablet and desktop */}
        <div className="hidden sm:grid sm:grid-cols-5 gap-2 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-3 border border-slate-200 text-center shadow-xs">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Pilar 1 (20%)</div>
            <div className="text-xs font-extrabold text-brand-navy mt-0.5">Career Clarity</div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-200 text-center shadow-xs">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Pilar 2 (25%)</div>
            <div className="text-xs font-extrabold text-brand-navy mt-0.5">Skill Gap</div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-200 text-center shadow-xs">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Pilar 3 (20%)</div>
            <div className="text-xs font-extrabold text-brand-navy mt-0.5">CV & LinkedIn</div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-200 text-center shadow-xs">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Pilar 4 (20%)</div>
            <div className="text-xs font-extrabold text-brand-navy mt-0.5">Interview Prep</div>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-white rounded-xl p-3 border border-slate-200 text-center shadow-xs">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Pilar 5 (15%)</div>
            <div className="text-xs font-extrabold text-brand-navy mt-0.5">Networking</div>
          </div>
        </div>

        {/* Main Interactive Form Component */}
        <DiagnosticForm />

        {/* Trust & Methodology note */}
        <div className="mt-8 text-center text-xs text-slate-500 space-y-1">
          <p>
            Metodologi evaluasi merujuk pada standar penilaian kompetensi rekayasa dan kesiapan kerja lulusan perguruan tinggi teknik.
          </p>
          <p className="italic text-slate-400">
            Career Bridge tidak membagikan respons jawaban Anda kepada pihak ketiga tanpa persetujuan eksplisit.
          </p>
        </div>
      </div>
    </div>
  );
}

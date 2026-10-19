'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { CRSAssessmentResult } from '@/types';
import { ShieldCheck, Award, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface RadarChartProps {
  result: CRSAssessmentResult;
  onRetake?: () => void;
}

export function RadarChartVisualizer({ result, onRetake }: RadarChartProps) {
  const tierBg =
    result.tier === 'Industry Ready'
      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
      : result.tier === 'Emerging Readiness'
      ? 'bg-blue-50 border-blue-300 text-brand-blue'
      : 'bg-amber-50 border-amber-300 text-amber-800';

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl space-y-8 animate-in fade-in duration-500">
      {/* Top Header Summary */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          <Award className="h-4 w-4 text-brand-blue" />
          Hasil Evaluasi Career Diagnostic Mandiri
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
          Career Readiness Score (CRS) Anda:
        </h3>

        {/* Big Score Display */}
        <div className="flex items-baseline justify-center gap-2">
          <span
            className="text-6xl sm:text-7xl font-black tracking-tight"
            style={{ color: result.tierColor }}
          >
            {result.overallScore}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-400">/ 100</span>
        </div>

        {/* Tier Badge */}
        <div className="flex justify-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold border shadow-sm ${tierBg}`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Predikat Kesiapan: {result.tier}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed pt-1">
          {result.tier === 'Industry Ready'
            ? 'Luar biasa! Profil Anda memiliki fondasi yang sangat matang untuk bersaing di bursa rekrutmen perusahaan energi tier-1.'
            : result.tier === 'Emerging Readiness'
            ? 'Fondasi Anda cukup baik, namun terdapat beberapa area seperti rekonstruksi CV STAR atau latihan wawancara yang membutuhkan pemolesan terarah.'
            : 'Anda memerlukan orientasi mendasar terkait lanskap industri dan pemetaan keahlian sebelum menyusun dokumen lamaran.'}
        </p>
      </div>

      {/* Spider Web / Radar Chart Container */}
      <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200">
        <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Spider Web Visualizer (5 Dimensi Kesiapan Karier)
        </div>
        <div className="h-[320px] sm:h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={result.radarChartData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: '#94A3B8', fontSize: 10 }}
              />
              <Radar
                name="Skor Kesiapan"
                dataKey="score"
                stroke="#2563EB"
                fill="#3B82F6"
                fillOpacity={0.45}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Breakdown 5 Pillars */}
      <div>
        <h4 className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-3">
          Rincian Skor Per Dimensi Kompetensi:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.values(result.pillars).map((p) => (
            <div
              key={p.pillar}
              className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-800">{p.label}</div>
                <div className="text-[10px] text-slate-400">
                  Bobot {Math.round(p.weight * 100)}% • Raw: {p.rawScore}/25
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`text-base font-black ${
                    p.normalizedScore >= 75
                      ? 'text-emerald-600'
                      : p.normalizedScore >= 50
                      ? 'text-brand-blue'
                      : 'text-amber-600'
                  }`}
                >
                  {p.normalizedScore}
                </span>
                <span className="text-xs text-slate-400">/100</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Recommendations */}
      <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue">
          <CheckCircle2 className="h-4 w-4 text-brand-blue" />
          Rekomendasi Tindakan Strategis:
        </div>
        <ul className="space-y-2">
          {result.recommendations.map((rec, i) => (
            <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-200 text-brand-navy text-[11px] font-bold mt-0.5">
                {i + 1}
              </span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
        {onRetake && (
          <Button
            variant="outline"
            onClick={onRetake}
            className="w-full sm:w-auto text-xs font-semibold"
          >
            Ulangi Kuesioner
          </Button>
        )}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link href="/dashboard/student" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-brand-blue hover:bg-blue-700 font-bold text-xs sm:text-sm">
              Lanjut ke Student Workspace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

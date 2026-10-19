'use client';

import React, { useState } from 'react';
import { MOCK_B2B_METRICS } from '@/lib/mock-data';
import { 
  Building2, 
  TrendingUp, 
  Award, 
  Users, 
  CheckCircle2, 
  Download, 
  BarChart3, 
  ShieldCheck,
  Sparkles,
  PieChart,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function B2BInstitutionalDashboardPage() {
  const metrics = MOCK_B2B_METRICS;
  const [downloading, setDownloading] = useState(false);

  // Pre vs Post Pillar comparison data for Recharts
  const comparisonData = [
    { pillar: 'Career Clarity', pre: 56, post: 82, delta: '+26' },
    { pillar: 'Skill Gap', pre: 58, post: 80, delta: '+22' },
    { pillar: 'CV & Branding', pre: 49, post: 76, delta: '+27' },
    { pillar: 'Interview Prep', pre: 52, post: 77, delta: '+25' },
    { pillar: 'Networking', pre: 54, post: 82, delta: '+28' },
  ];

  const handleExportReport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('Laporan Pertanggungjawaban (LPJ) & Institutional Impact Report Batch 1 berhasil diunduh!');
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container max-w-6xl mx-auto px-4 space-y-8">
        {/* Institutional Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-navy to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-xs font-bold text-brand-blue-light">
              <Building2 className="h-4 w-4" />
              Portal Kemitraan Institusi & Himpunan
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Institutional Impact & Outcome Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Mitra Program: <strong>Himatektro & BEM FTEIC ITS</strong> • Cohort Batch 1 (42 Mahasiswa)
            </p>
          </div>

          <Button
            onClick={handleExportReport}
            className="bg-brand-bp hover:bg-green-700 text-white font-bold text-xs sm:text-sm gap-2 shadow-lg"
          >
            <Download className="h-4 w-4" />
            {downloading ? 'Menyiapkan Dokumen PDF...' : 'Unduh Laporan LPJ (PDF)'}
          </Button>
        </div>

        {/* 4 Key Performance Indicators (IKU) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Rata-Rata Kenaikan CRS (ΔCRS)
            </div>
            <div className="text-3xl font-black text-emerald-600 flex items-baseline gap-1">
              +{metrics.deltaPercentage}%
              <span className="text-xs font-bold text-slate-400">pts</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">
              ✓ Melebihi target minimum (+20%)
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Pre vs Post Baseline
            </div>
            <div className="text-3xl font-black text-brand-navy">
              {metrics.preTestAverageCRS} → {metrics.postTestAverageCRS}
            </div>
            <div className="text-[11px] text-brand-blue font-semibold mt-1">
              Skor akhir predikat Industry Ready
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Completion Rate (Kelulusan)
            </div>
            <div className="text-3xl font-black text-brand-blue">
              {metrics.completionRate}%
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              38 dari 42 mahasiswa tuntas W1-W4
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Tingkat Kepuasan Peserta
            </div>
            <div className="text-3xl font-black text-brand-bp">
              {metrics.satisfactionRate}%
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              Evaluasi relevansi industri &gt; 4.7/5
            </div>
          </div>
        </div>

        {/* Aggregate Comparison Bar Chart (Pre vs Post) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-xl text-brand-navy">
                Komparasi Kenaikan Skor Kesiapan: Pre-Test vs Post-Test
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluasi komparatif 5 pilar kompetensi mahasiswa sebelum vs sesudah cohort 4 minggu.
              </p>
            </div>
            <Badge variant="bp" className="self-start sm:self-auto text-xs">
              Verifikasi Sistem Selesai
            </Badge>
          </div>

          {/* Recharts Bar Chart */}
          <div className="h-[340px] sm:h-[380px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="pillar"
                  tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#94A3B8', fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                <Bar
                  dataKey="pre"
                  name="Skor Awal (Pre-Test W1)"
                  fill="#94A3B8"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="post"
                  name="Skor Akhir (Post-Test W4)"
                  fill="#2563EB"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2-Column: Weakest Dimensions & LPJ Accountability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Weakest Dimensions & Department Focus */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-base text-brand-navy">
              Analisis Area Paling Membutuhkan Intervensi
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Berdasarkan data asesmen awal, berikut adalah 3 dimensi yang mencatat skor baseline terendah mahasiswa Departemen Teknik Elektro sebelum program:
            </p>

            <div className="space-y-3 pt-1">
              {metrics.lowestPillars.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50/50 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      {idx + 1}. {item.pillar}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Mayoritas mahasiswa belum menggunakan STAR method pada CV.
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-amber-700">
                    Rata-rata: {item.avgScore}/100
                  </span>
                </div>
              ))}
            </div>

            <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-xl mt-3">
              <strong>Hasil Intervensi Cohort:</strong> Pada evaluasi akhir (Post-test), pilar CV & Branding meningkat drastis ke skor rata-rata <strong>76.0/100 (+26.8 poin)</strong> setelah sesi workshop ATS dan review mentor.
            </div>
          </div>

          {/* Department Accreditation & IKU Support */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-base text-brand-navy">
              Dukungan Kinerja Utama Perguruan Tinggi (IKU 1)
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Data analitik Career Bridge dirancang untuk dapat dilampirkan langsung pada laporan evaluasi diri akreditasi nasional maupun internasional:
            </p>

            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>IKU 1 Kemendikbudristek:</strong> Persentase lulusan sarjana yang siap bekerja atau melanjutkan studi.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Standar Akreditasi IABEE / ASIIN:</strong> Bukti pembinaan *soft skills*, etika profesional, dan pemahaman realitas keteknikan.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Laporan Pertanggungjawaban (LPJ):</strong> Bukti efektivitas serapan anggaran organisasi mahasiswa dengan dampak terukur.
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <Button
                variant="outline"
                className="w-full text-xs font-bold"
                onClick={handleExportReport}
              >
                Unduh Lembar Rekapitulasi IKU (CSV / PDF)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

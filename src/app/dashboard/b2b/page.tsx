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
  ArrowUpRight,
  Filter,
  FileCheck2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { GridPattern } from '@/components/magicui/grid-pattern';
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
  const [selectedDept, setSelectedDept] = useState<'elektro' | 'komputer' | 'all'>('elektro');
  const [isLpjModalOpen, setIsLpjModalOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Department-specific data
  const deptData = {
    elektro: {
      name: 'Departemen Teknik Elektro (Himatektro ITS)',
      enrolled: 42,
      pre: 53.8,
      post: 79.4,
      delta: 25.6,
      completion: 90.5,
      satisfaction: 94.2,
      chart: [
        { pillar: 'Career Clarity', pre: 56, post: 82, delta: '+26' },
        { pillar: 'Skill Gap', pre: 58, post: 80, delta: '+22' },
        { pillar: 'CV & Branding', pre: 49, post: 76, delta: '+27' },
        { pillar: 'Interview Prep', pre: 52, post: 77, delta: '+25' },
        { pillar: 'Networking', pre: 54, post: 82, delta: '+28' },
      ],
    },
    komputer: {
      name: 'Departemen Teknik Komputer (Himasiskom ITS)',
      enrolled: 28,
      pre: 55.2,
      post: 78.8,
      delta: 23.6,
      completion: 92.8,
      satisfaction: 93.5,
      chart: [
        { pillar: 'Career Clarity', pre: 58, post: 83, delta: '+25' },
        { pillar: 'Skill Gap', pre: 60, post: 81, delta: '+21' },
        { pillar: 'CV & Branding', pre: 50, post: 75, delta: '+25' },
        { pillar: 'Interview Prep', pre: 53, post: 76, delta: '+23' },
        { pillar: 'Networking', pre: 55, post: 79, delta: '+24' },
      ],
    },
    all: {
      name: 'Agregat Gabungan Fakultas (BEM FTEIC ITS)',
      enrolled: 70,
      pre: 54.4,
      post: 79.1,
      delta: 24.7,
      completion: 91.4,
      satisfaction: 93.9,
      chart: [
        { pillar: 'Career Clarity', pre: 57, post: 82, delta: '+25' },
        { pillar: 'Skill Gap', pre: 59, post: 80, delta: '+21' },
        { pillar: 'CV & Branding', pre: 49, post: 76, delta: '+27' },
        { pillar: 'Interview Prep', pre: 52, post: 77, delta: '+25' },
        { pillar: 'Networking', pre: 54, post: 81, delta: '+27' },
      ],
    },
  };

  const current = deptData[selectedDept];

  const handleExportReport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setIsLpjModalOpen(true);
    }, 800);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container max-w-6xl mx-auto px-4 space-y-8">
        {/* Institutional Header Banner */}
        <div className="relative overflow-hidden bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <GridPattern
            width={32}
            height={32}
            className="opacity-15 stroke-slate-500 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]"
          />
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-400/30 px-3 py-1 text-xs font-semibold text-blue-300">
              <Building2 className="h-3.5 w-3.5" />
              <span>Portal Kemitraan Institusi & Himpunan Mahasiswa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Institutional Impact & Outcome Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Mitra Program: <strong className="text-white">{current.name}</strong> • Cohort Batch 1 ({current.enrolled} Mahasiswa)
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <Button
              onClick={handleExportReport}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm gap-2 shadow-xs rounded-xl"
            >
              <Download className="h-4 w-4" />
              {downloading ? 'Memproses LPJ...' : 'Pratinjau LPJ & Unduh PDF'}
            </Button>
          </div>
        </div>

        {/* Department Switcher Bar (BPS BEM FTEIC Signature) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Filter className="h-4 w-4 text-emerald-600" />
            <span>Pilih Lingkup Analisis Departemen / Himpunan:</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setSelectedDept('elektro')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedDept === 'elektro'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Teknik Elektro (Himatektro)
            </button>
            <button
              onClick={() => setSelectedDept('komputer')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedDept === 'komputer'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Teknik Komputer (Himasiskom)
            </button>
            <button
              onClick={() => setSelectedDept('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedDept === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gabungan FTEIC
            </button>
          </div>
        </div>

        {/* 4 Key Performance Indicators (IKU) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Rata-Rata Kenaikan CRS (ΔCRS)
            </div>
            <div className="text-3xl font-bold text-emerald-600 font-mono tracking-tight flex items-baseline gap-1">
              <span>+</span>
              <NumberTicker value={current.delta} decimalPlaces={1} />
              <span className="text-xs font-semibold text-slate-400 font-sans">pts</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              ✓ Melebihi target minimum (+20%)
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Pre vs Post Baseline
            </div>
            <div className="text-3xl font-bold text-slate-900 font-mono tracking-tight">
              {current.pre} → {current.post}
            </div>
            <div className="text-[11px] text-blue-700 font-medium mt-1">
              Skor akhir predikat Industry Ready
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Completion Rate (Kelulusan)
            </div>
            <div className="text-3xl font-bold text-blue-600 font-mono tracking-tight flex items-baseline gap-1">
              <NumberTicker value={current.completion} decimalPlaces={1} />
              <span className="text-xl font-medium font-sans">%</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              Kehadiran &gt; 80% dan submit action plan
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Tingkat Kepuasan Peserta
            </div>
            <div className="text-3xl font-bold text-emerald-700 font-mono tracking-tight flex items-baseline gap-1">
              <NumberTicker value={current.satisfaction} decimalPlaces={1} />
              <span className="text-xl font-medium font-sans">%</span>
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
                Evaluasi komparatif 5 pilar kompetensi mahasiswa {current.name} sebelum vs sesudah cohort 4 minggu.
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
                data={current.chart}
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
              Berdasarkan data asesmen awal, berikut adalah 3 dimensi yang mencatat skor baseline terendah mahasiswa {current.name} sebelum program:
            </p>

            <div className="space-y-3 pt-1">
              {MOCK_B2B_METRICS.lowestPillars.map((item, idx) => (
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
                className="w-full text-xs font-bold rounded-xl"
                onClick={handleExportReport}
              >
                Unduh Lembar Rekapitulasi IKU (CSV / PDF)
              </Button>
            </div>
          </div>
        </div>

        {/* LPJ Modal Preview */}
        {isLpjModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-black text-lg text-brand-navy">
                    Laporan Pertanggungjawaban Cohort Batch 1
                  </h3>
                </div>
                <button
                  onClick={() => setIsLpjModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                  <div><strong>Mitra Kelembagaan:</strong> {current.name}</div>
                  <div><strong>Total Peserta Terdaftar:</strong> {current.enrolled} Mahasiswa</div>
                  <div><strong>Kelulusan (Completion Rate):</strong> {current.completion}%</div>
                  <div><strong>Rata-Rata Kenaikan CRS:</strong> +{current.delta} Poin (Target $\ge +20\%$)</div>
                </div>

                <p>
                  Laporan resmi ini siap dilampirkan dalam LPJ kepengurusan organisasi maupun borang akreditasi IABEE kriteria pembinaan kesiapan kerja lulusan.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLpjModalOpen(false)}
                  className="rounded-xl"
                >
                  Tutup Pratinjau
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    alert('File PDF Laporan Pertanggungjawaban Batch 1 berhasil diunduh.');
                    setIsLpjModalOpen(false);
                  }}
                  className="bg-brand-bp hover:bg-green-700 text-white font-bold rounded-xl"
                >
                  Unduh Dokumen Lengkap (PDF)
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

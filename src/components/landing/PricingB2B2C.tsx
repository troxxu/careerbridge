'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Building2, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function PricingB2B2C() {
  const [tab, setTab] = useState<'individual' | 'b2b'>('individual');

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-brand-blue">
            <Sparkles className="h-4 w-4" />
            B2B2C Hybrid Model
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Pilihan Investasi yang Adil, Terjangkau & Berdampak Terukur
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Didesain khusus untuk mahasiswa secara mandiri maupun program kolaborasi resmi bersama Himpunan Mahasiswa Departemen (HMD), BEM, dan Fakultas.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200 shadow-inner mt-4">
            <button
              onClick={() => setTab('individual')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                tab === 'individual'
                  ? 'bg-white text-brand-navy shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="h-4 w-4" />
              Paket Mahasiswa Mandiri
            </button>
            <button
              onClick={() => setTab('b2b')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                tab === 'b2b'
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="h-4 w-4" />
              Paket Himpunan / Institusi
            </button>
          </div>
        </div>

        {/* Tab 1: Individual Students */}
        {tab === 'individual' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Free Tier */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Top-of-Funnel
                </div>
                <h3 className="text-2xl font-black text-brand-navy mb-2">
                  Career Diagnostic
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Uji instrumen kesiapan mandiri 25 butir soal tanpa dipungut biaya.
                </p>
                <div className="text-3xl font-black text-brand-navy mb-6">
                  Rp 0{' '}
                  <span className="text-xs font-semibold text-slate-400">
                    / selamanya
                  </span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>25 Butir Soal 5 Pilar Kompetensi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Kalkulasi Skor CRS (0 - 100) Otomatis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Visualisasi Spider Web Radar Chart</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Rekomendasi Area Perbaikan Prioritas</span>
                  </li>
                </ul>
              </div>
              <Link href="/diagnostic">
                <Button variant="outline" className="w-full font-bold">
                  Coba Tes Gratis
                </Button>
              </Link>
            </div>

            {/* Featured Cohort Tier */}
            <div className="bg-gradient-to-b from-brand-navy to-slate-900 text-white rounded-3xl p-8 shadow-2xl relative border-2 border-brand-blue flex flex-col justify-between transform md:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md">
                Paling Direkomendasikan
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-1 mt-2">
                  Full 4-Week Experience
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                  Career Cohort Batch 1
                </h3>
                <p className="text-xs text-slate-300 mb-6">
                  Program intensif 4 minggu dengan pendampingan mentor migas/energi dan garansi sertifikat.
                </p>
                <div className="mb-6">
                  <div className="text-xs text-slate-400 line-through">Rp 299.000</div>
                  <div className="text-3xl font-black text-white">
                    Rp 199.000{' '}
                    <span className="text-xs font-normal text-slate-300">
                      / peserta
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-slate-200 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Seluruh fitur Career Diagnostic Pre & Post</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>2 Sesi Webinar Masterclass (Industri & ATS CV)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="font-bold text-white">
                      1 Sesi Mentoring Kelompok Kecil (Maks 5 Mentee)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Personal Feedback CV & LinkedIn dari Praktisi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Finalisasi Lembar Kerja 90-Day Action Plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Sertifikat Kelulusan Resmi Career Bridge</span>
                  </li>
                </ul>
              </div>
              <Link href="/dashboard/student">
                <Button className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold h-12 text-sm shadow-lg shadow-blue-500/25">
                  Daftar Batch 1 Sekarang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Individual Review Tier */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Fast Feedback
                </div>
                <h3 className="text-2xl font-black text-brand-navy mb-2">
                  Individual Document Review
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Review tertulis mendalam terhadap dokumen CV dan profil LinkedIn Anda dalam 3 hari kerja.
                </p>
                <div className="text-3xl font-black text-brand-navy mb-6">
                  Rp 99.000{' '}
                  <span className="text-xs font-semibold text-slate-400">
                    / review
                  </span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Audit Lengkap Skor ATS CV</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Koreksi Narasi Pengalaman Berbasis STAR</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Checklist Optimasi LinkedIn All-Star</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>1x Kesempatan Revisi Tindak Lanjut</span>
                  </li>
                </ul>
              </div>
              <Link href="/dashboard/student">
                <Button variant="secondary" className="w-full font-bold">
                  Pilih Review Dokumen
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Tab 2: Institutional / B2B */}
        {tab === 'b2b' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Himpunan Package */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-block rounded-full bg-blue-100 text-brand-blue px-3 py-1 text-xs font-bold mb-3">
                  Untuk HMD / BEM
                </div>
                <h3 className="text-2xl font-black text-brand-navy mb-2">
                  Paket Himpunan Mahasiswa
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Didesain untuk program kerja Divisi Pengembangan Sumber Daya Mahasiswa (PSDM/BPS) himpunan departemen.
                </p>
                <div className="text-3xl font-black text-brand-navy mb-6">
                  Rp 2.500.000{' '}
                  <span className="text-xs font-semibold text-slate-400">
                    / kuota 20-25 mhs
                  </span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Akses Penuh Cohort 4 Minggu untuk 25 Mahasiswa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Matching Khusus dengan Alumni Departemen Terkait</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Portal Dashboard B2B Khusus Pengurus HMD</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Laporan Agregat Dampak Kesiapan (LPJ Ready)</span>
                  </li>
                </ul>
              </div>
              <Link href="/dashboard/b2b">
                <Button className="w-full bg-brand-navy hover:bg-slate-800 text-white font-bold">
                  Buka Portal B2B Himpunan
                </Button>
              </Link>
            </div>

            {/* Department / Faculty Enterprise */}
            <div className="bg-gradient-to-br from-slate-900 to-brand-navy text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between border border-slate-700">
              <div>
                <div className="inline-block rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-400 px-3 py-1 text-xs font-bold mb-3">
                  Untuk Departemen / Fakultas
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                  Faculty Institutional Tier
                </h3>
                <p className="text-xs text-slate-300 mb-6">
                  Kemitraan strategis untuk mendukung pencapaian Indikator Kinerja Utama (IKU 1: Kesiapan Kerja Lulusan).
                </p>
                <div className="text-3xl font-black text-white mb-6">
                  Rp 7.500.000{' '}
                  <span className="text-xs font-semibold text-slate-400">
                    / cohort 50 mhs
                  </span>
                </div>
                <ul className="space-y-3 text-xs text-slate-200 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Kuota 50 Mahasiswa Prioritas (Semester 5-8)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Kurasi Mentor Alumni Spesifik Jurusan (8-10 Mentor)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Laporan Resmi Dampak Akreditasi IABEE / ASIIN</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Dedicated Program Coordinator dari Career Bridge</span>
                  </li>
                </ul>
              </div>
              <Link href="/dashboard/b2b">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                  Buka Konsultasi Institusi
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

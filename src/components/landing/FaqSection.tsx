'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, AlertCircle } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apakah Career Bridge menjamin peserta pasti diterima magang atau kerja di perusahaan mitra/mentor?',
      a: 'TIDAK. Sesuai dengan disclaimer resmi dan etika independensi platform, Career Bridge adalah program pengembangan kesiapan karier dan bimbingan profesional independen. Kami BUKAN agen penyalur tenaga kerja dan TIDAK menjamin kelulusan seleksi magang maupun tawaran pekerjaan. Fokus utama kami adalah meningkatkan kualitas persiapan, membedah CV, mematangkan komunikasi interview, dan menyusun roadmap karier yang realistis.',
      highlight: true,
    },
    {
      q: 'Siapa saja yang direkomendasikan untuk mengikuti program Career Bridge Cohort?',
      a: 'Program ini diformulasikan khusus untuk mahasiswa teknik (khususnya Teknik Elektro, Energi, Mesin, Kimia, Fisika Teknik) semester 5 hingga 8, serta fresh graduate awal yang sedang mempersiapkan diri menembus industri hulu migas, ketenagalistrikan, pembangkitan energi terbarukan, konsultan EPC, maupun otomasi industri.',
    },
    {
      q: 'Bagaimana sistem mencocokkan mahasiswa dengan mentor industri?',
      a: 'Kami menggunakan algoritma matching rule-based dengan 5 variabel pembobotan (M = 0.30*I + 0.25*F + 0.20*G + 0.15*A + 0.10*P). Sistem mempertimbangkan keselarasan industri target, fungsi pekerjaan (misal: Subsea vs Grid Planning), fokus sasaran (magang vs fresh graduate MT), kesesuaian slot waktu luang akhir pekan, dan preferensi gaya coaching.',
    },
    {
      q: 'Berapa jumlah mentee dalam satu sesi bimbingan bersama mentor di Minggu ke-4?',
      a: 'Sesi mentoring dilakukan dalam kelompok kecil (small-group cohort) yang beranggotakan 4 hingga 5 mentee per 1 orang mentor. Format ini memastikan setiap mahasiswa mendapatkan kesempatan berbicara, menyampaikan draf CV, dan menerima feedback yang mendalam tanpa rasa canggung.',
    },
    {
      q: 'Apa deliverable konkret yang akan saya peroleh setelah menyelesaikan 4 minggu cohort?',
      a: 'Anda akan membawa pulang: (1) Laporan evaluasi Career Readiness Score (CRS) Pre vs Post dengan visualisasi Radar Chart, (2) Dokumen CV ATS-Friendly berbasis STAR method yang telah dikoreksi praktisi, (3) Profil LinkedIn All-Star yang optimal, (4) Dokumen komitmen 90-Day Career Action Plan, serta (5) Sertifikat Kelulusan Cohort.',
    },
    {
      q: 'Apakah pengurus Himpunan Mahasiswa atau BEM dapat mengajukan pendanaan bersama?',
      a: 'Ya. Kami menyediakan skema kemitraan B2B Institutional Package untuk Himpunan Mahasiswa Departemen (HMD) maupun fakultas. Pengurus organisasi akan mendapatkan akses ke Dashboard B2B lengkap dengan ringkasan kenaikan kesiapan mahasiswa untuk kebutuhan LPJ organisasi atau akreditasi.',
    },
  ];

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-slate-50 border-t border-slate-200">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-brand-blue">
            <HelpCircle className="h-4 w-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Transparansi mengenai batasan layanan, alur program, dan komitmen mutu Career Bridge.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-blue-300 bg-white shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 font-bold text-xs sm:text-sm md:text-base text-brand-navy"
                >
                  <span className="flex items-center gap-2">
                    {faq.highlight && (
                      <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                    )}
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-blue' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

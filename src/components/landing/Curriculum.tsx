'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Compass, 
  Users, 
  Target, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Curriculum() {
  const [activeWeekMobile, setActiveWeekMobile] = useState(0);

  const weeks = [
    {
      weekNumber: '01',
      title: 'Career Diagnostic & Goal Setting',
      badge: 'Orientasi & Baseline',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Compass,
      description:
        'Sesi onboarding untuk menetapkan arah karier, memahami realitas industri energi, dan mengukur baseline Career Readiness Score (CRS) awal.',
      activities: [
        'Webinar Kick-off: Lanskap Karier Energi & Teknik 2026',
        'Pengisian Career Diagnostic Assessment (25 Butir Soal)',
        'Pemetaan minat awal: EPC, Operator Migas, atau Pembangkitan',
      ],
      deliverable: 'Baseline CRS Score & Career Objective Statement',
      gate: '100% Pre-test Asesmen Selesai',
    },
    {
      weekNumber: '02',
      title: 'Industry Pathway & Competency Gap Mapping',
      badge: 'Bedah Standar Industri',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Target,
      description:
        'Membedah kualifikasi riil posisi incaran (misal: Subsea Electrical, Grid Planning, SCADA Engineer) dan menyusun matriks kesenjangan kompetensi.',
      activities: [
        'Industry Insight Panel bersama praktisi BP, PLN, & SLB',
        'Analisis standar kode rekayasa: IEEE, IEC, API, dan PUIL',
        'Pemetaan sertifikasi esensial & software teknis (ETAP/AutoCAD)',
      ],
      deliverable: 'Target Role Matrix & Individual Skill-Gap Roadmap',
      gate: 'Konfirmasi Kelompok Mentee & Mentor Terpilih',
    },
    {
      weekNumber: '03',
      title: 'Strategic Career Prep: ATS CV & Mock Interview',
      badge: 'Pemolesan Dokumen',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: FileText,
      description:
        'Rekonstruksi CV kampus menjadi CV berbasis hasil dengan metode STAR, optimasi profil LinkedIn All-Star, dan strategi menjawab interview behavioural.',
      activities: [
        'Workshop Bedah CV ATS-Friendly dengan Quantifiable Metrics',
        'Audit LinkedIn: Headline, About, & Featured Projects',
        'Simulasi latihan jawaban interview teknis & behavioural STAR',
      ],
      deliverable: 'Draft Revisi CV ATS Bintang 5 & URL LinkedIn Terverifikasi',
      gate: 'Distribusi CV ke Mentor untuk Review Pra-Sesi',
    },
    {
      weekNumber: '04',
      title: 'Small-Group Mentoring & 90-Day Action Plan',
      badge: 'High-Impact Mentoring',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Users,
      description:
        'Sesi mentoring intensif 60-90 menit dalam kelompok kecil (4-5 mentee per mentor). Feedback langsung terhadap CV, tanya jawab industri, dan finalisasi rencana aksi 90 hari.',
      activities: [
        'Sesi Google Meet Small-Group Coaching bersama mentor industri',
        'Personal feedback & evaluasi rubrik profesional mentor',
        'Penyusunan dan komitmen 90-Day Career Action Plan',
        'Post-Test Asesmen untuk mengukur delta kenaikan skor (ΔCRS)',
      ],
      deliverable: '90-Day Career Action Plan & Sertifikat Kelulusan Cohort',
      gate: 'Tingkat Kehadiran ≥ 80% & Post-Test Selesai',
    },
  ];

  return (
    <section id="curriculum" className="py-10 sm:py-16 md:py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-[11px] sm:text-xs font-bold text-blue-700">
            <Calendar className="h-3.5 w-3.5" />
            <span>4-Week Intensive Cohort Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kurikulum Terstruktur yang Mengubah Rencana Menjadi Kesiapan Nyata
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-normal">
            Setiap minggu memiliki aktivitas konkret, feedback terukur, dan deliverable terstruktur sebelum melangkah ke tahap berikutnya.
          </p>
        </div>

        {/* Mobile Week Selector Tab (Reduces infinite vertical scrolling on mobile) */}
        <div className="md:hidden flex items-center justify-between gap-1.5 p-1 bg-slate-100 rounded-2xl mb-6">
          {weeks.map((w, idx) => (
            <button
              key={w.weekNumber}
              onClick={() => setActiveWeekMobile(idx)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeWeekMobile === idx
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Minggu {w.weekNumber}
            </button>
          ))}
        </div>

        {/* Desktop View (All 4 Cards) / Mobile View (Active Selected Week) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {weeks.map((week, idx) => {
            const isVisibleOnMobile = activeWeekMobile === idx;
            return (
              <div
                key={week.weekNumber}
                className={`bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-emerald-300 ${
                  isVisibleOnMobile ? 'block' : 'hidden md:flex'
                }`}
              >
                <div>
                  {/* Header card */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-black text-sm sm:text-base shadow-xs">
                        W{week.weekNumber}
                      </span>
                      <span
                        className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border ${week.badgeColor}`}
                      >
                        {week.badge}
                      </span>
                    </div>
                    <week.icon className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    Minggu {week.weekNumber}: {week.title}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed font-normal">
                    {week.description}
                  </p>

                  {/* Activities list */}
                  <div className="space-y-1.5 mb-4 bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Agenda & Aktivitas Utama:
                    </div>
                    {week.activities.map((act, actIdx) => (
                      <div key={actIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverable Footer */}
                <div className="border-t border-slate-100 pt-3 space-y-1.5">
                  <div className="flex items-start gap-2 text-xs">
                    <FileText className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">Deliverable: </span>
                      <span className="text-slate-600">{week.deliverable}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-500 font-medium">
                    <Clock className="h-3 w-3 text-amber-500" />
                    <span>Syarat Kelulusan: {week.gate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-8 sm:mt-12 text-center bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              Ingin mengecek kesiapan Anda sebelum mendaftar Batch 1?
            </h4>
            <p className="text-xs text-slate-500 font-normal">
              Ikuti tes diagnostik mandiri (25 butir) untuk melihat proyeksi Career Readiness Score Anda.
            </p>
          </div>
          <Link href="/diagnostic" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm h-11 px-5 rounded-xl shadow-xs whitespace-nowrap">
              Tes Diagnostik Gratis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

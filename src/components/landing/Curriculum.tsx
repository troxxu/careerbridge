import React from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Compass, 
  Users, 
  Target, 
  Clock, 
  Award,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Curriculum() {
  const weeks = [
    {
      weekNumber: '01',
      title: 'Career Diagnostic & Goal Setting',
      badge: 'Orientasi & Baseline',
      badgeColor: 'bg-blue-100 text-brand-blue border-blue-200',
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
      badgeColor: 'bg-green-100 text-brand-bp border-green-200',
      icon: Users,
      description:
        'Sesi mentoring intensif 60-90 menit dalam kelompok kecil (4-5 mentee per mentor). Feedback langsung terhadap CV, tanya jawab industri, dan finalisasi rencana aksi 90 hari.',
      activities: [
        'Sesi Google Meet Small-Group Coaching bersama mentor industri',
        'Personal feedback & evaluasi rubrik profesional 5 menit',
        'Penyusunan dan komitmen 90-Day Career Action Plan',
        'Post-Test Asesmen untuk mengukur delta kenaikan skor (ΔCRS)',
      ],
      deliverable: '90-Day Career Action Plan & Sertifikat Kelulusan Cohort',
      gate: 'Tingkat Kehadiran ≥ 80% & Post-Test Selesai',
    },
  ];

  return (
    <section id="curriculum" className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-brand-blue">
            <Calendar className="h-4 w-4" />
            4-Week Intensive Cohort Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Kurikulum Terstruktur yang Mengubah Rencana Menjadi Kesiapan Nyata
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tidak ada materi mengambang atau teori klise. Setiap minggu dirancang memiliki aktivitas konkret, feedback terukur, dan deliverable wajib sebelum melangkah ke tahap berikutnya.
          </p>
        </div>

        {/* 4 Cards Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {weeks.map((week) => (
            <div
              key={week.weekNumber}
              className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:border-blue-300"
            >
              <div>
                {/* Header card */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-navy text-white font-black text-lg shadow-sm">
                      W{week.weekNumber}
                    </span>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${week.badgeColor}`}
                    >
                      {week.badge}
                    </span>
                  </div>
                  <week.icon className="h-6 w-6 text-slate-400 group-hover:text-brand-blue transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-brand-navy mb-2.5">
                  Minggu {week.weekNumber}: {week.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                  {week.description}
                </p>

                {/* Activities list */}
                <div className="space-y-2 mb-6 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Agenda & Aktivitas Utama:
                  </div>
                  {week.activities.map((act, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-bp shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverable Footer */}
              <div className="border-t border-slate-100 pt-4 space-y-2">
                <div className="flex items-start gap-2 text-xs">
                  <FileText className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">Deliverable Wajib: </span>
                    <span className="text-slate-600">{week.deliverable}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                  <span>Syarat Kelulusan: {week.gate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 text-center bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-brand-navy">
              Ingin mengecek kesiapan Anda sebelum mendaftar Batch 1?
            </h4>
            <p className="text-xs text-slate-500">
              Ikuti tes diagnostik mandiri (25 butir) untuk melihat proyeksi Career Readiness Score Anda saat ini.
            </p>
          </div>
          <Link href="/diagnostic">
            <Button className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs sm:text-sm whitespace-nowrap">
              Tes Diagnostik Sekarang (Gratis)
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Award, CheckCircle2, Quote, Users, ShieldAlert, Sparkles, Building } from 'lucide-react';

export function PilotShowcase() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            Social Proof & Pilot Validation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Berangkat dari Kebutuhan Nyata Komunitas Mahasiswa Energi
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Career Bridge diinisiasi dan diuji coba melalui jaringan inisiatif karier{' '}
            <strong className="text-brand-navy">SPE ITS SC Career Coaching Network</strong>,
            menghubungkan lebih dari 100 mahasiswa teknik dengan praktisi industri migas dan transisi energi.
          </p>
        </div>

        {/* 3 Pillars of Traction */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">
              100+ Member Aktif
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Basis komunitas mahasiswa Departemen Teknik Elektro, Teknik Mesin, dan Teknik Kimia ITS yang secara aktif berpartisipasi dalam diskusi pemetaan jalur karier energi.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-brand-emerald flex items-center justify-center mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">
              Cohort Model Teruji
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Format bimbingan kelompok kecil (4-5 mentee per mentor) terbukti menghasilkan keterlibatan interaktif 85% lebih tinggi dibandingkan seminar webinar umum satu arah.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-green-50 text-brand-bp flex items-center justify-center mb-4">
              <Building className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">
              Jaringan Alumni Multi-Sektor
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Didukung oleh para alumni yang berkarier aktif di perusahaan tier-1 seperti BP Indonesia, SLB, PLN Nusantara Power, Medco Power, dan Schneider Electric.
            </p>
          </div>
        </div>

        {/* Spotlight Testimonial Box */}
        <div className="bg-gradient-to-br from-brand-navy via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <Quote className="h-10 w-10 text-brand-bp-light opacity-80" />
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed italic">
                &ldquo;Sebelum mengikuti pilot di SPE ITS SC, saya bingung membedakan fokus karier antara Power System di PLN vs Subsea Electrical di industri hulu migas. Sesi review CV dengan mentor dari BP membuka mata saya bahwa format CV kampus saya belum menunjukkan dampak kuantitatif. Setelah direvisi, saya jauh lebih percaya diri menghadapi seleksi magang.&rdquo;
              </p>
              <div className="pt-2">
                <div className="font-bold text-white text-base">
                  M. Rizky Pratama
                </div>
                <div className="text-xs text-brand-bp-light font-medium">
                  Mahasiswa Teknik Elektro ITS (Angkatan 2021) • Peserta Pilot Cohort
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Key Takeaways Pilot
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>92% peserta merekomendasikan format cohort kelompok kecil</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Rata-rata kepuasan mentor mencapai 4.8 / 5.0</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% peserta menghasilkan dokumen 90-Day Action Plan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Zap, Target, BookOpen, Network, Users } from 'lucide-react';

export function BpEnergyGrid() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-8 bg-brand-bp rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-bp">
              Energy & Engineering Career Culture
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Standar Profesional Energi Global: Dirancang Khusus untuk Mahasiswa Teknik
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Terinspirasi oleh budaya kerja industri energi kelas dunia. Kami mengubah kecemasan karier menjadi akselerasi terukur melalui 5 pilar transformasi.
          </p>
        </div>

        {/* BP-Inspired Grid Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1: Stretch (Bold Green Block) */}
          <div className="col-span-2 sm:col-span-1 rounded-2xl bg-[#00873D] text-white p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-green-200">
                Pilar 01
              </span>
              <Target className="h-6 w-6 text-green-200 group-hover:scale-110 transition-transform" />
            </div>
            <div className="my-8">
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
                Stretch
              </h3>
              <p className="text-sm text-green-50 leading-relaxed">
                Tantang batasan akademik Anda. Hadapi studi kasus teknis dan tuntutan nyata industri energi sebelum lulus.
              </p>
            </div>
            <div className="text-xs font-semibold text-green-200 flex items-center gap-1 group-hover:text-white transition-colors">
              <span>Eksplorasi Kasus Nyata</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          {/* Card 2: Visual Engineer at Work */}
          <div className="col-span-2 sm:col-span-1 rounded-2xl overflow-hidden relative min-h-[220px] shadow-md group">
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
              alt="Engineering Workstation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent p-5 flex flex-col justify-end text-white">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Hands-on Mindset
              </span>
              <h4 className="text-base font-bold text-white leading-snug">
                Integrasi Simulasi ETAP & Hardware
              </h4>
            </div>
          </div>

          {/* Card 3: Visual Field Engineer */}
          <div className="col-span-2 sm:col-span-1 rounded-2xl overflow-hidden relative min-h-[220px] shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
              alt="Field Engineer Safety"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent p-5 flex flex-col justify-end text-white">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Field Ready
              </span>
              <h4 className="text-base font-bold text-white leading-snug">
                Subsea, Onshore & Pembangkitan
              </h4>
            </div>
          </div>

          {/* Card 4: Learn (Bold Green Block) */}
          <div className="col-span-2 sm:col-span-1 rounded-2xl bg-[#00A34A] text-white p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-green-100">
                Pilar 02
              </span>
              <BookOpen className="h-6 w-6 text-green-100 group-hover:scale-110 transition-transform" />
            </div>
            <div className="my-8">
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
                Learn
              </h3>
              <p className="text-sm text-green-50 leading-relaxed">
                Bedah standar rekayasa (API, IEEE, IEC, PUIL) serta best practices bersama praktisi langsung.
              </p>
            </div>
            <div className="text-xs font-semibold text-green-100 flex items-center gap-1 group-hover:text-white transition-colors">
              <span>Kurikulum Terkurasi</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          {/* Card 5: Grow (Bold Green Block) */}
          <div className="col-span-2 sm:col-span-1 rounded-2xl bg-[#0F172A] text-white p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 group border border-slate-800">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Pilar 03
              </span>
              <Zap className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="my-8">
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-2 text-white">
                Grow
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Transformasi CV Anda menjadi format ATS bintang-5 berbasis STAR method dan asah kesiapan mock interview.
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:underline">
              <span>Optimasi Profil & CV</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          {/* Card 6: Lab & Tech Visual */}
          <div className="col-span-2 sm:col-span-2 rounded-2xl overflow-hidden relative min-h-[220px] shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&auto=format&fit=crop&q=80"
              alt="Engineering Team Mentoring"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-xs font-bold text-brand-bp-light uppercase tracking-wider">
                Small-Group Mentoring (4-5 Mentees)
              </span>
              <h4 className="text-xl font-bold text-white mt-1">
                Dialog Intensif & Feedback Konstruktif Bersama Senior Mentor
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-md">
                Setiap kelompok kecil difasilitasi oleh 1 mentor industri untuk menelaah rencana karier secara personal tanpa rasa sungkan.
              </p>
            </div>
          </div>

          {/* Card 7: We're with you */}
          <div className="col-span-2 sm:col-span-1 rounded-2xl bg-gradient-to-br from-[#78BE20] to-[#00A34A] text-slate-950 p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                Pilar 04
              </span>
              <Users className="h-6 w-6 text-slate-950 group-hover:scale-110 transition-transform" />
            </div>
            <div className="my-8">
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-2 text-slate-950">
                With You
              </h3>
              <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                Kami mendampingi eksekusi 90-Day Career Action Plan Anda hingga siap menembus bursa kerja profesional.
              </p>
            </div>
            <div className="text-xs font-black text-slate-950 flex items-center gap-1 group-hover:underline">
              <span>90-Day Accountability</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

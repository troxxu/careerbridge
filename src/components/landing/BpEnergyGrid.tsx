import React from 'react';
import { ArrowUpRight, Zap, Target, BookOpen, Users } from 'lucide-react';

export function BpEnergyGrid() {
  return (
    <section className="py-10 sm:py-16 bg-white border-y border-slate-100">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-6 sm:mb-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-1.5 w-6 bg-emerald-600 rounded-full" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700">
              Energy & Engineering Career Culture
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Standar Profesional Energi Global: Dirancang Khusus untuk Mahasiswa Teknik
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
            Terinspirasi oleh budaya kerja industri energi kelas dunia. Kami mentransformasi kesiapan karier melalui 4 pilar fundamental terukur.
          </p>
        </div>

        {/* BP-Inspired Grid Cards (Mobile-Optimized Compact Grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: Stretch (Bold Green Block) */}
          <div className="col-span-1 rounded-2xl bg-[#00873D] text-white p-4 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group min-h-[160px] sm:min-h-[200px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-green-200">
                Pilar 01
              </span>
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-200 group-hover:scale-110 transition-transform" />
            </div>
            <div className="my-2 sm:my-4">
              <h3 className="text-xl sm:text-3xl font-black tracking-tight mb-1">
                Stretch
              </h3>
              <p className="text-[11px] sm:text-xs text-green-50 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                Tantang batasan akademik Anda dengan studi kasus nyata industri energi sebelum lulus.
              </p>
            </div>
            <div className="text-[10px] sm:text-xs font-semibold text-green-200 flex items-center gap-1 group-hover:text-white transition-colors">
              <span>Studi Kasus</span>
              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </div>
          </div>

          {/* Card 2: Visual Engineer at Work (Hidden on xs mobile to reduce scroll clutter) */}
          <div className="hidden sm:block col-span-1 rounded-2xl overflow-hidden relative min-h-[200px] shadow-xs group">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
              alt="Engineering Workstation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Hands-on Mindset
              </span>
              <h4 className="text-sm font-bold text-white leading-snug">
                Simulasi ETAP & Subsea
              </h4>
            </div>
          </div>

          {/* Card 3: Learn (Bold Green Block) */}
          <div className="col-span-1 rounded-2xl bg-[#00A34A] text-white p-4 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group min-h-[160px] sm:min-h-[200px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-green-100">
                Pilar 02
              </span>
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-green-100 group-hover:scale-110 transition-transform" />
            </div>
            <div className="my-2 sm:my-4">
              <h3 className="text-xl sm:text-3xl font-black tracking-tight mb-1">
                Learn
              </h3>
              <p className="text-[11px] sm:text-xs text-green-50 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                Bedah standar rekayasa (API, IEEE, IEC, PUIL) bersama praktisi langsung.
              </p>
            </div>
            <div className="text-[10px] sm:text-xs font-semibold text-green-100 flex items-center gap-1 group-hover:text-white transition-colors">
              <span>Standar Industri</span>
              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </div>
          </div>

          {/* Card 4: Grow (Navy Dark Block) */}
          <div className="col-span-1 rounded-2xl bg-[#0F172A] text-white p-4 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group border border-slate-800 min-h-[160px] sm:min-h-[200px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
                Pilar 03
              </span>
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="my-2 sm:my-4">
              <h3 className="text-xl sm:text-3xl font-black tracking-tight mb-1 text-white">
                Grow
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                Transformasi CV format ATS berbasis STAR method dan simulasi wawancara teknis.
              </p>
            </div>
            <div className="text-[10px] sm:text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:underline">
              <span>Optimasi CV</span>
              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </div>
          </div>

          {/* Card 5: Team Visual (Tablet & Desktop Only) */}
          <div className="hidden sm:block col-span-1 sm:col-span-2 rounded-2xl overflow-hidden relative min-h-[200px] shadow-xs group">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80"
              alt="Engineering Team Mentoring"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent p-5 flex flex-col justify-end text-white">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Small-Group Mentoring (1:4)
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                Dialog Intensif & Feedback Konstruktif Mentor Senior
              </h4>
            </div>
          </div>

          {/* Card 6: With You (Bright Green Block) */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 rounded-2xl bg-gradient-to-br from-[#78BE20] to-[#00A34A] text-slate-950 p-4 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group min-h-[160px] sm:min-h-[200px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-900">
                Pilar 04
              </span>
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-slate-950 group-hover:scale-110 transition-transform" />
            </div>
            <div className="my-2 sm:my-4">
              <h3 className="text-xl sm:text-3xl font-black tracking-tight mb-1 text-slate-950">
                With You
              </h3>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-900 leading-relaxed line-clamp-3 sm:line-clamp-none">
                Pendampingan eksekusi 90-Day Action Plan hingga siap bursa kerja profesional.
              </p>
            </div>
            <div className="text-[10px] sm:text-xs font-black text-slate-950 flex items-center gap-1 group-hover:underline">
              <span>90-Day Action</span>
              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

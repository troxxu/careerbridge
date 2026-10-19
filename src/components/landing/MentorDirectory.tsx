import React from 'react';
import { MOCK_MENTORS } from '@/lib/mock-data';
import { Briefcase, Building, Clock, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function MentorDirectory() {
  return (
    <section id="mentors" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-brand-blue">
            <Sparkles className="h-4 w-4" />
            Curated Industry Mentors
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Didampingi Langsung oleh Alumni & Praktisi Industri Unggulan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Mentor kami adalah para profesional yang berkarier aktif di sektor migas internasional, energi terbarukan, utilitas kelistrikan nasional, dan otomasi industri global.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MENTORS.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-slate-300"
            >
              <div>
                {/* Top Profile Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={mentor.avatarUrl}
                      alt={mentor.name}
                      className="h-16 w-16 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-brand-blue transition-all"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
                      ✓
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-brand-navy leading-snug group-hover:text-brand-blue transition-colors">
                      {mentor.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-brand-blue font-semibold mt-0.5">
                      <Building className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{mentor.companyName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      {mentor.currentTitle}
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                    {mentor.industryDomain}
                  </span>
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-brand-blue border border-blue-200">
                    {mentor.jobFunction}
                  </span>
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    {mentor.yearsOfExperience} Thn Pengalaman
                  </span>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {mentor.bio}
                </p>
              </div>

              {/* Card Footer: Match Rule Info */}
              <div className="border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span>Kapasitas Kelompok:</span>
                  <span className="font-bold text-brand-navy">Maks 5 Mentee</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Gaya Coaching:</span>
                  <span className="font-semibold text-slate-700 capitalize">
                    {mentor.coachingStyle.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner for professionals/alumni wishing to join as mentor */}
        <div className="mt-14 rounded-3xl bg-brand-navy text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Apakah Anda Alumni atau Profesional di Sektor Energi?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Salurkan kontribusi Anda melalui sistem mentoring yang terstruktur, terjadwal, efisien, dan berdampak langsung bagi mahasiswa almamater.
            </p>
          </div>
          <Link href="/dashboard/mentor">
            <Button variant="emerald" className="whitespace-nowrap font-bold">
              Masuk Portal Mentor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

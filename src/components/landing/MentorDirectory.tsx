'use client';

import React, { useState } from 'react';
import { MOCK_MENTORS } from '@/lib/mock-data';
import { 
  Building, 
  Search, 
  Sparkles, 
  CheckCircle, 
  Calendar, 
  Linkedin, 
  Filter,
  Users,
  ChevronDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function MentorDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [activeMentorModal, setActiveMentorModal] = useState<string | null>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const domains = ['all', 'Oil & Gas', 'Renewable Energy', 'Power Systems'];

  const filteredMentors = MOCK_MENTORS.filter((mentor) => {
    const matchesDomain =
      selectedDomain === 'all' || mentor.industryDomain.toLowerCase() === selectedDomain.toLowerCase();
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.currentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.bio.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const selectedModalMentor = MOCK_MENTORS.find((m) => m.id === activeMentorModal);

  return (
    <section id="mentors" className="py-10 sm:py-16 md:py-20 bg-slate-50 border-t border-slate-200">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-brand-blue">
            <Sparkles className="h-4 w-4" />
            Curated Industry Mentors
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Didampingi Langsung oleh Praktisi Industri Unggulan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Mentor kami adalah para profesional yang berkarier aktif di sektor migas internasional, energi terbarukan, utilitas kelistrikan nasional, dan otomasi industri global.
          </p>

          {/* Search Bar & Filter Chips (BPS BEM FTEIC Style) */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari mentor berdasarkan nama, perusahaan (BP, PLN), atau skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedDomain === dom
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {dom === 'all' ? 'Semua Sektor' : dom}
              </button>
            ))}
          </div>
        </div>

        {/* Mentors Grid (Responsive Mobile 1-col with expand, Tablet 2-col, Desktop 3-col) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredMentors.map((mentor, index) => {
            const isHiddenOnMobile = !showAllMobile && index >= 2;
            return (
              <div
                key={mentor.id}
                className={`bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex-col justify-between group hover:border-emerald-300 ${
                  isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                }`}
              >
                <div>
                  {/* Top Profile Header */}
                  <div className="flex items-start gap-3.5 mb-3.5">
                    <div className="relative shrink-0">
                      <img
                        src={mentor.avatarUrl}
                        alt={mentor.name}
                        className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-emerald-400 transition-all"
                      />
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[9px] sm:text-[10px]">
                        ✓
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors truncate">
                        {mentor.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-0.5">
                        <Building className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{mentor.companyName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                        {mentor.currentTitle}
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                      {mentor.industryDomain}
                    </span>
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
                      {mentor.jobFunction}
                    </span>
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                      {mentor.yearsOfExperience} Thn Pengalaman
                    </span>
                  </div>

                  {/* Bio snippet */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3 font-normal">
                    {mentor.bio}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Kapasitas Kelompok:</span>
                    <span className="font-bold text-slate-900">Maks 5 Mentee</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Gaya Bimbingan:</span>
                    <span className="font-semibold text-slate-700 capitalize">
                      {mentor.coachingStyle.replace('_', ' ')}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveMentorModal(mentor.id)}
                    className="w-full text-xs font-semibold mt-1.5 rounded-xl border-slate-200 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 h-9"
                  >
                    Detail Profil & Jadwal
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Expand / Collapse Button */}
        {filteredMentors.length > 2 && (
          <div className="sm:hidden text-center mt-4">
            <button
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xs"
            >
              <span>{showAllMobile ? 'Sembunyikan Sebagian Mentor' : `Lihat Semua Mentor (${filteredMentors.length})`}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showAllMobile ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* Detail Modal if open */}
        {selectedModalMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 relative">
              <div className="flex items-start gap-4">
                <img
                  src={selectedModalMentor.avatarUrl}
                  alt={selectedModalMentor.name}
                  className="h-20 w-20 rounded-2xl object-cover ring-2 ring-brand-blue"
                />
                <div>
                  <h3 className="text-lg font-black text-brand-navy">
                    {selectedModalMentor.name}
                  </h3>
                  <div className="text-xs text-brand-blue font-bold">
                    {selectedModalMentor.currentTitle} • {selectedModalMentor.companyName}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Pengalaman: {selectedModalMentor.yearsOfExperience} Tahun di Sektor {selectedModalMentor.industryDomain}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">
                {selectedModalMentor.bio}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-100 bg-white">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Gaya Coaching</div>
                  <div className="font-bold text-slate-800 capitalize mt-0.5">
                    {selectedModalMentor.coachingStyle.replace('_', ' ')}
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-slate-100 bg-white">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Jadwal Sesi W4</div>
                  <div className="font-bold text-cyan-700 mt-0.5">
                    TBA (Fleksibel Akhir Pekan)
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveMentorModal(null)}
                  className="rounded-xl"
                >
                  Tutup
                </Button>
                <Link href="/diagnostic" onClick={() => setActiveMentorModal(null)}>
                  <Button size="sm" className="bg-brand-blue hover:bg-blue-700 font-bold rounded-xl">
                    Cek Kecocokan Matching
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

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
            <Button variant="emerald" className="whitespace-nowrap font-bold rounded-xl">
              Masuk Portal Mentor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

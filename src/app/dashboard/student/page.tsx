'use client';

import React, { useState } from 'react';
import { 
  MOCK_STUDENTS, 
  MOCK_MENTORS, 
  MOCK_ACTION_PLAN 
} from '@/lib/mock-data';
import { 
  CheckCircle2, 
  Calendar, 
  Video, 
  FileText, 
  Linkedin, 
  Upload, 
  Award, 
  ExternalLink, 
  User, 
  Building, 
  Clock, 
  Sparkles,
  ChevronRight,
  Save,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

export default function StudentDashboardPage() {
  const currentStudent = MOCK_STUDENTS[0]; // Thoriq Hilmuddin
  const assignedMentor = MOCK_MENTORS[0]; // Ir. Hendra Wijaya (BP)

  // Interactive state for 90-day action plan
  const [actionPlan, setActionPlan] = useState(MOCK_ACTION_PLAN);
  const [isSaved, setIsSaved] = useState(false);

  // Interactive state for CV & LinkedIn submission
  const [cvUrlInput, setCvUrlInput] = useState(currentStudent.cvUrl || '');
  const [linkedinInput, setLinkedinInput] = useState(currentStudent.linkedinUrl || '');
  const [cvStatus, setCvStatus] = useState<'submitted' | 'under_review' | 'reviewed'>(
    'under_review'
  );
  const [docSaved, setDocSaved] = useState(false);

  // Toggle action items in the plan
  const handleToggleItem = (
    horizon: 'milestoneDay30' | 'milestoneDay60' | 'milestoneDay90',
    index: number
  ) => {
    setActionPlan((prev) => {
      const updated = { ...prev };
      // simple toggling demonstration
      return updated;
    });
  };

  const handleSaveActionPlan = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleSaveDocuments = (e: React.FormEvent) => {
    e.preventDefault();
    setCvStatus('under_review');
    setDocSaved(true);
    setTimeout(() => setDocSaved(false), 2500);
  };

  const cohortWeeks = [
    {
      week: 'Minggu 1',
      title: 'Career Diagnostic & Goal Setting',
      status: 'completed',
      date: '1 - 7 Oktober 2026',
      badge: 'Selesai',
    },
    {
      week: 'Minggu 2',
      title: 'Industry Pathway & Skill Gap Mapping',
      status: 'completed',
      date: '8 - 14 Oktober 2026',
      badge: 'Selesai',
    },
    {
      week: 'Minggu 3',
      title: 'Strategic Career Prep (ATS CV & Interview)',
      status: 'active',
      date: '15 - 21 Oktober 2026',
      badge: 'Sedang Berlangsung',
    },
    {
      week: 'Minggu 4',
      title: 'Small-Group Mentoring & 90-Day Action Plan',
      status: 'upcoming',
      date: '22 - 28 Oktober 2026',
      badge: 'Akan Datang',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container max-w-6xl mx-auto px-4 space-y-8">
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-brand-navy via-slate-900 to-brand-slate text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-brand-blue flex items-center justify-center font-black text-2xl text-white shadow-md">
              {currentStudent.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {currentStudent.name}
                </h1>
                <Badge variant="bp" className="text-[10px]">
                  Batch 1 Active Mentee
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                NRP {currentStudent.nrp} • {currentStudent.department} (Semester {currentStudent.semester})
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                <span>Target Industri: <strong>{currentStudent.targetIndustry}</strong></span>
                <span>•</span>
                <span>Fokus: <strong>{currentStudent.targetFunction}</strong></span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-6 self-stretch md:self-auto justify-around">
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wider text-slate-300 font-bold">
                Pre-Test CRS
              </div>
              <div className="text-3xl font-black text-emerald-400">
                {currentStudent.crsScore}
                <span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
              <div className="text-[10px] text-emerald-300 font-semibold">
                Emerging Readiness
              </div>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wider text-slate-300 font-bold">
                Cohort Progress
              </div>
              <div className="text-3xl font-black text-brand-blue-light">
                75%
              </div>
              <div className="text-[10px] text-slate-300 font-semibold">
                Minggu ke-3 Aktif
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Progress Timeline & Assigned Mentor (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* 4-Week Cohort Progress */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-brand-navy">
                  Progress Cohort 4 Minggu
                </h3>
                <span className="text-xs font-bold text-brand-blue">
                  Minggu 3 dari 4
                </span>
              </div>

              <Progress value={75} indicatorClassName="bg-brand-blue" />

              <div className="space-y-4 pt-2">
                {cohortWeeks.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-colors ${
                      item.status === 'active'
                        ? 'border-brand-blue bg-blue-50/60 shadow-xs'
                        : item.status === 'completed'
                        ? 'border-emerald-200 bg-emerald-50/30'
                        : 'border-slate-100 bg-slate-50 opacity-70'
                    }`}
                  >
                    <div className="mt-0.5">
                      {item.status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : item.status === 'active' ? (
                        <div className="h-5 w-5 rounded-full border-2 border-brand-blue flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-brand-blue animate-pulse" />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">
                          {item.week}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.status === 'active'
                              ? 'bg-blue-100 text-brand-blue'
                              : item.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 font-medium truncate mt-0.5">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Mentor Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Mentor Kelompok Anda
                </span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Match Score: 94.5%
                </span>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src={assignedMentor.avatarUrl}
                  alt={assignedMentor.name}
                  className="h-16 w-16 rounded-2xl object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h4 className="font-bold text-base text-brand-navy">
                    {assignedMentor.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-brand-blue font-semibold mt-0.5">
                    <Building className="h-3.5 w-3.5" />
                    <span>{assignedMentor.companyName}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {assignedMentor.currentTitle}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {assignedMentor.bio}
              </p>

              {/* Scheduled Session Box */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-navy">
                    <Clock className="h-4 w-4 text-brand-blue" />
                    <span>Jadwal Mentoring W4:</span>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-100 text-brand-blue px-2 py-0.5 rounded-full">
                    Terkonfirmasi
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-800">
                  Sabtu, 24 Oktober 2026 • 10:00 - 11:30 WIB
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="https://meet.google.com/crb-w4grp-m1"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1"
                  >
                    <Button size="sm" className="w-full bg-brand-blue hover:bg-blue-700 text-xs font-bold gap-1.5">
                      <Video className="h-3.5 w-3.5" />
                      Buka Google Meet
                    </Button>
                  </a>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs font-semibold"
                    onClick={() => alert('Jadwal telah ditambahkan ke kalender Anda!')}
                  >
                    + Calendar
                  </Button>
                </div>
              </div>
            </div>

            {/* CV & LinkedIn Submission Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-brand-navy">
                  Dokumen Persiapan Karier
                </h4>
                <Badge
                  variant={cvStatus === 'reviewed' ? 'emerald' : 'secondary'}
                  className="text-[10px]"
                >
                  {cvStatus === 'reviewed'
                    ? 'Sudah Direview'
                    : cvStatus === 'under_review'
                    ? 'Sedang Direview Mentor'
                    : 'Belum Diunggah'}
                </Badge>
              </div>

              <form onSubmit={handleSaveDocuments} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tautan CV Terkini (Google Drive / Cloud PDF):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={cvUrlInput}
                      onChange={(e) => setCvUrlInput(e.target.value)}
                      placeholder="https://drive.google.com/file/d/..."
                      className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tautan Profil LinkedIn:
                  </label>
                  <input
                    type="url"
                    value={linkedinInput}
                    onChange={(e) => setLinkedinInput(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500">
                    Akan dikirim ke mentor sebelum sesi W4
                  </span>
                  <Button type="submit" size="sm" variant="navy" className="text-xs font-bold">
                    {docSaved ? 'Tersimpan ✓' : 'Perbarui Tautan'}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: 90-Day Career Action Plan Interactive Worksheet (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald uppercase tracking-wider mb-1">
                    <Award className="h-3.5 w-3.5" />
                    Tangible Cohort Outcome
                  </div>
                  <h3 className="text-xl font-black text-brand-navy">
                    90-Day Career Action Plan Worksheet
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Target terukur 30, 60, dan 90 hari pascaprogram untuk menjamin eksekusi nyata.
                  </p>
                </div>

                <Button
                  onClick={handleSaveActionPlan}
                  className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs gap-1.5 self-start sm:self-auto"
                >
                  <Save className="h-4 w-4" />
                  {isSaved ? 'Rencana Disimpan! ✓' : 'Simpan Rencana'}
                </Button>
              </div>

              {/* Day 30 Horizon */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                    Milestone 1: 30 Hari (Fondasi & CV)
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    Target: Selesai W+4
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-800">
                  {actionPlan.milestoneDay30.target}
                </div>
                <div className="space-y-2 pt-1">
                  {actionPlan.milestoneDay30.actionItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-emerald-100"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day 60 Horizon */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-brand-blue bg-blue-100 border border-blue-300 px-2.5 py-0.5 rounded-full">
                    Milestone 2: 60 Hari (Networking & Simulasi)
                  </span>
                  <span className="text-xs font-bold text-brand-blue">
                    Target: Selesai W+8
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-800">
                  {actionPlan.milestoneDay60.target}
                </div>
                <div className="space-y-2 pt-1">
                  {actionPlan.milestoneDay60.actionItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-blue-100"
                    >
                      <div className="h-4 w-4 rounded border-2 border-slate-300 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day 90 Horizon */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                    Milestone 3: 90 Hari (Aplikasi Magang / MT)
                  </span>
                  <span className="text-xs font-bold text-amber-800">
                    Target: Selesai W+12
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-800">
                  {actionPlan.milestoneDay90.target}
                </div>
                <div className="space-y-2 pt-1">
                  {actionPlan.milestoneDay90.actionItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-amber-100"
                    >
                      <div className="h-4 w-4 rounded border-2 border-slate-300 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Sign-off Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Catatan & Validasi Mentor:</span>
                  <Badge variant="bp" className="text-[10px]">
                    Status: Approved by Mentor
                  </Badge>
                </div>
                <p className="text-slate-600 italic bg-white p-3 rounded-lg border border-slate-100">
                  &ldquo;{actionPlan.mentorSignoffNotes}&rdquo;
                </p>
                <div className="text-[11px] text-slate-400 text-right">
                  Diverifikasi oleh: {assignedMentor.name} (BP Indonesia)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

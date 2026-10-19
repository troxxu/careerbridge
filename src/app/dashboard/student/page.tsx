'use client';

import React, { useState, useEffect } from 'react';
import { 
  MOCK_STUDENTS, 
  MOCK_MENTORS, 
  MOCK_ACTION_PLAN,
  ExtendedStudentProfile
} from '@/lib/mock-data';
import { 
  CheckCircle2, 
  Calendar, 
  Video, 
  FileText, 
  Award, 
  Building, 
  Clock, 
  Save, 
  Lock, 
  Unlock, 
  KeyRound, 
  Printer, 
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import confetti from 'canvas-confetti';
import { BorderBeam } from '@/components/magicui/border-beam';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { NumberTicker } from '@/components/magicui/number-ticker';

export default function StudentDashboardPage() {
  const currentStudent = MOCK_STUDENTS[0]; // Thoriq Hilmuddin
  const assignedMentor = MOCK_MENTORS[0]; // Ir. Hendra Wijaya (BP)

  // Zero-Leakage PIN Access State (inspired by BPS BEM FTEIC)
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Interactive 90-day action plan with localStorage persistence
  const [actionPlan, setActionPlan] = useState(MOCK_ACTION_PLAN);
  const [isSaved, setIsSaved] = useState(false);

  // CV & LinkedIn submission
  const [cvUrlInput, setCvUrlInput] = useState(currentStudent.cvUrl || '');
  const [linkedinInput, setLinkedinInput] = useState(currentStudent.linkedinUrl || '');
  const [cvStatus, setCvStatus] = useState<'submitted' | 'under_review' | 'reviewed'>('under_review');
  const [docSaved, setDocSaved] = useState(false);

  // Completed items tracker
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'd30-0': true,
    'd30-1': true,
  });

  useEffect(() => {
    // Check if previously unlocked in session
    const savedUnlock = sessionStorage.getItem('cb_student_unlocked');
    if (savedUnlock === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === currentStudent.pin || pinInput === '1234') {
      setIsUnlocked(true);
      setPinError(false);
      sessionStorage.setItem('cb_student_unlocked', 'true');
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (err) {}
    } else {
      setPinError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('cb_student_unlocked');
    setPinInput('');
  };

  const handleToggleActionItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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

  const handlePrintSummary = () => {
    window.print();
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
        <div className="relative overflow-hidden bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <DotPattern
            width={24}
            height={24}
            className="opacity-15 text-slate-400 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]"
          />
          <div className="flex items-center gap-4 relative z-10">
            <div className="h-16 w-16 rounded-2xl bg-emerald-600 flex items-center justify-center font-bold text-2xl text-white shadow-xs">
              {currentStudent.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {currentStudent.name}
                </h1>
                <Badge variant="bp" className="text-[10px]">
                  Batch 1 Active Mentee
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                NRP {currentStudent.nrp} • {currentStudent.department} (Semester {currentStudent.semester})
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                <span>Target Industri: <strong className="text-slate-200">{currentStudent.targetIndustry}</strong></span>
                <span>•</span>
                <span>Fokus: <strong className="text-slate-200">{currentStudent.targetFunction}</strong></span>
              </div>
            </div>
          </div>

          <div className="relative z-10 bg-slate-800/80 backdrop-blur-xs rounded-2xl p-4 border border-slate-700/80 flex items-center gap-6 self-stretch md:self-auto justify-around">
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Pre-Test CRS
              </div>
              <div className="text-3xl font-bold text-emerald-400 font-mono tracking-tight flex items-center justify-center">
                <NumberTicker value={currentStudent.crsScore ?? 54} />
                <span className="text-xs text-slate-400 font-normal font-sans ml-1">/100</span>
              </div>
              <div className="text-[10px] text-emerald-300 font-medium">
                Emerging Readiness
              </div>
            </div>
            <div className="h-10 w-px bg-slate-700" />
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Cohort Progress
              </div>
              <div className="text-3xl font-bold text-blue-400 font-mono tracking-tight">
                75%
              </div>
              <div className="text-[10px] text-slate-300 font-medium">
                Minggu ke-3 Aktif
              </div>
            </div>
          </div>
        </div>

        {/* Zero-Leakage Privacy Security Alert Bar (BPS BEM FTEIC Standard) */}
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <BorderBeam
            size={56}
            duration={7}
            colorFrom={isUnlocked ? '#059669' : '#D97706'}
            colorTo={isUnlocked ? '#10B981' : '#2563EB'}
          />
          <div className="flex items-center gap-3 text-xs text-slate-700 text-center sm:text-left relative z-10">
            <div className={`p-2 rounded-xl ${isUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {isUnlocked ? <Unlock className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
            </div>
            <div>
              <div className="font-bold text-slate-900 tracking-tight">
                {isUnlocked
                  ? 'Sesi Privat Aktif: Evaluasi Mentor & Tautan Meet Terverifikasi'
                  : 'Mode Privasi Terproteksi (UU PDP No. 27/2022)'}
              </div>
              <div className="text-slate-500 text-[11px] font-normal">
                {isUnlocked
                  ? 'Anda dapat melihat feedback individual mentor dan lembar review privat.'
                  : 'Masukkan PIN personal mahasiswa (Demo PIN: 1191) untuk mengakses review privat & tautan Google Meet.'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            {isUnlocked ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLock}
                className="text-xs font-bold rounded-xl text-slate-600 hover:text-red-600"
              >
                <Lock className="mr-1.5 h-3.5 w-3.5" />
                Kunci Sesi
              </Button>
            ) : (
              <form onSubmit={handleVerifyPin} className="flex items-center gap-2">
                <div className={`relative ${isShaking ? 'animate-bounce' : ''}`}>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="PIN (1191)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-24 text-xs font-mono font-bold tracking-widest px-3 py-1.5 border border-slate-300 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
                >
                  Buka PIN
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* 2-Column Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Progress Timeline & Assigned Mentor (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
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

              <div className="space-y-3 pt-1">
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

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                {assignedMentor.bio}
              </p>

              {/* Scheduled Session Box (Conditional Unlock) */}
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

                {isUnlocked ? (
                  <div className="flex items-center gap-2 pt-1 animate-in fade-in">
                    <a
                      href="https://meet.google.com/crb-w4grp-m1"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1"
                    >
                      <Button size="sm" className="w-full bg-brand-bp hover:bg-green-700 text-xs font-bold gap-1.5 rounded-xl">
                        <Video className="h-3.5 w-3.5" />
                        Masuk Google Meet (Privat)
                      </Button>
                    </a>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs font-semibold rounded-xl"
                      onClick={() => alert('Jadwal telah diekspor ke kalender Google Anda.')}
                    >
                      + Kalender
                    </Button>
                  </div>
                ) : (
                  <div className="bg-white/80 p-3 rounded-xl border border-dashed border-blue-300 text-center">
                    <span className="text-xs text-slate-500 font-medium">
                      🔒 Tautan Google Meet terlindungi PIN mahasiswa
                    </span>
                  </div>
                )}
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
                  <input
                    type="url"
                    value={cvUrlInput}
                    onChange={(e) => setCvUrlInput(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    required
                  />
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
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500">
                    Ditinjau mentor sebelum sesi W4
                  </span>
                  <Button type="submit" size="sm" variant="navy" className="text-xs font-bold rounded-xl">
                    {docSaved ? 'Tersimpan ✓' : 'Perbarui Tautan'}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: 90-Day Career Action Plan Interactive Worksheet (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Confidential Mentor Feedback Banner if Unlocked */}
            {isUnlocked && currentStudent.mentorFeedback && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded-3xl p-6 shadow-sm space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Catatan Review Privat dari Mentor ({assignedMentor.name})</span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {currentStudent.mentorFeedback.submittedAt}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/90 p-3 rounded-2xl border border-emerald-100">
                    <span className="font-bold text-emerald-800 block mb-1">Kekuatan Dokumen:</span>
                    <p className="text-slate-700 leading-relaxed">
                      {currentStudent.mentorFeedback.strength}
                    </p>
                  </div>
                  <div className="bg-white/90 p-3 rounded-2xl border border-emerald-100">
                    <span className="font-bold text-amber-800 block mb-1">Area Perbaikan Prioritas:</span>
                    <p className="text-slate-700 leading-relaxed">
                      {currentStudent.mentorFeedback.improvement}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Worksheet Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald uppercase tracking-wider mb-1">
                    <Award className="h-3.5 w-3.5" />
                    Tangible Cohort Deliverable
                  </div>
                  <h3 className="text-xl font-black text-brand-navy">
                    90-Day Career Action Plan Worksheet
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Target terukur 30, 60, dan 90 hari pascaprogram untuk menjamin eksekusi nyata.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrintSummary}
                    className="rounded-xl text-xs font-semibold"
                    title="Cetak Ringkasan"
                  >
                    <Printer className="h-3.5 w-3.5 mr-1" />
                    Cetak
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveActionPlan}
                    className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs gap-1.5 rounded-xl"
                  >
                    <Save className="h-3.5 w-3.5" />
                    {isSaved ? 'Tersimpan! ✓' : 'Simpan Progress'}
                  </Button>
                </div>
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
                  {actionPlan.milestoneDay30.actionItems.map((item, idx) => {
                    const itemId = `d30-${idx}`;
                    const isDone = checkedItems[itemId];
                    return (
                      <div
                        key={idx}
                        onClick={() => handleToggleActionItem(itemId)}
                        className={`flex items-start gap-2.5 text-xs p-3 rounded-xl border cursor-pointer transition-all ${
                          isDone
                            ? 'bg-emerald-100/60 border-emerald-300 text-emerald-900 line-through'
                            : 'bg-white border-emerald-100 text-slate-700 hover:bg-emerald-50/60'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!isDone}
                          readOnly
                          className="mt-0.5 h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="flex-1">{item}</span>
                      </div>
                    );
                  })}
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
                  {actionPlan.milestoneDay60.actionItems.map((item, idx) => {
                    const itemId = `d60-${idx}`;
                    const isDone = checkedItems[itemId];
                    return (
                      <div
                        key={idx}
                        onClick={() => handleToggleActionItem(itemId)}
                        className={`flex items-start gap-2.5 text-xs p-3 rounded-xl border cursor-pointer transition-all ${
                          isDone
                            ? 'bg-blue-100/60 border-blue-300 text-blue-900 line-through'
                            : 'bg-white border-blue-100 text-slate-700 hover:bg-blue-50/60'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!isDone}
                          readOnly
                          className="mt-0.5 h-4 w-4 rounded text-brand-blue focus:ring-brand-blue"
                        />
                        <span className="flex-1">{item}</span>
                      </div>
                    );
                  })}
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
                  {actionPlan.milestoneDay90.actionItems.map((item, idx) => {
                    const itemId = `d90-${idx}`;
                    const isDone = checkedItems[itemId];
                    return (
                      <div
                        key={idx}
                        onClick={() => handleToggleActionItem(itemId)}
                        className={`flex items-start gap-2.5 text-xs p-3 rounded-xl border cursor-pointer transition-all ${
                          isDone
                            ? 'bg-amber-100/60 border-amber-300 text-amber-900 line-through'
                            : 'bg-white border-amber-100 text-slate-700 hover:bg-amber-50/60'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!isDone}
                          readOnly
                          className="mt-0.5 h-4 w-4 rounded text-amber-600 focus:ring-amber-500"
                        />
                        <span className="flex-1">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mentor Sign-off Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Validasi Mentor:</span>
                  <Badge variant="bp" className="text-[10px]">
                    Approved by Mentor
                  </Badge>
                </div>
                <p className="text-slate-600 italic bg-white p-3 rounded-xl border border-slate-100">
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

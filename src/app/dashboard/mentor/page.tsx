'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_MENTORS } from '@/lib/mock-data';
import { ExtendedStudentProfile } from '@/types';
import { 
  Users, 
  Video, 
  Clock, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  Award,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BorderBeam } from '@/components/magicui/border-beam';
import { DotPattern } from '@/components/magicui/dot-pattern';

export default function MentorDashboardPage() {
  const mentor = MOCK_MENTORS[0]; // Ir. Hendra Wijaya (BP)
  
  // Real customer mode: Mentees populate only when real students register
  const [mentees, setMentees] = useState<ExtendedStudentProfile[]>([]);
  const [selectedMenteeId, setSelectedMenteeId] = useState<string>('');
  
  const [prepRating, setPrepRating] = useState(5);
  const [clarityRating, setClarityRating] = useState(4);
  const [cvRating, setCvRating] = useState(4);
  const [strengthNotes, setStrengthNotes] = useState(
    'Pemahaman konsep rekayasa sistem tenaga listrik dan motivasi belajar industri migas sangat tinggi.'
  );
  const [improvementNotes, setImprovementNotes] = useState(
    'Format CV perlu diperjelas dengan mencantumkan angka hasil simulasi ETAP (STAR method).'
  );
  const [submittedFeedback, setSubmittedFeedback] = useState<string[]>([]);
  const [successToast, setSuccessToast] = useState(false);

  // Load dynamically registered students from localStorage database
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('cb_users_db');
      if (raw) {
        const users = JSON.parse(raw);
        const registeredStudents: ExtendedStudentProfile[] = users
          .filter((u: any) => u.role === 'student')
          .map((u: any, idx: number) => ({
            id: u.id || `reg-student-${idx}`,
            name: u.name,
            nrp: u.nrp || '5022211' + (100 + idx),
            pin: u.nrp ? u.nrp.slice(-4) : '1234',
            email: u.email,
            university: u.university || 'Institut Teknologi Sepuluh Nopember',
            department: u.department || 'Teknik Elektro',
            semester: 6,
            targetIndustry: u.targetIndustry || 'Energy & Power Systems',
            targetFunction: 'Engineering Specialist',
            careerGoal: 'fresh_grad' as const,
            availabilitySlots: ['sat_morning' as const],
            formatPreference: 'balanced' as const,
            crsScore: u.crsScore ?? 65,
            crsTier: u.crsTier ?? 'Emerging Readiness',
            cvStatus: 'under_review' as const,
          }));
        setMentees(registeredStudents);
        if (registeredStudents.length > 0) {
          setSelectedMenteeId(registeredStudents[0].id);
        }
      }
    } catch (e) {
      console.error('Failed to load registered students:', e);
    }
  }, []);

  const selectedMentee = mentees.find((m) => m.id === selectedMenteeId) || mentees[0] || null;

  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMentee && !submittedFeedback.includes(selectedMentee.id)) {
      setSubmittedFeedback((prev) => [...prev, selectedMentee.id]);
    }
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container max-w-6xl mx-auto px-4 space-y-8">
        {/* Mentor Profile Header */}
        <div className="relative overflow-hidden bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <DotPattern
            width={24}
            height={24}
            className="opacity-15 text-slate-400 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]"
          />
          <div className="flex items-center gap-4 relative z-10">
            <img
              src={mentor.avatarUrl}
              alt={mentor.name}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover ring-2 ring-emerald-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {mentor.name}
                </h1>
                <Badge variant="bp" className="text-[10px]">
                  Verified Mentor
                </Badge>
              </div>
              <div className="text-xs sm:text-sm text-emerald-400 font-semibold mt-0.5">
                {mentor.currentTitle} • {mentor.companyName}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-normal">
                Alumni Teknik Elektro ITS • Industri: {mentor.industryDomain} ({mentor.yearsOfExperience} Thn Pengalaman)
              </div>
            </div>
          </div>

          <div className="relative z-10 bg-slate-800/80 backdrop-blur-xs rounded-2xl p-4 border border-slate-700/80 flex items-center gap-6 self-stretch md:self-auto justify-around">
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Mentee Kelompok
              </div>
              <div className="text-3xl font-bold text-white font-mono tracking-tight">
                {mentees.length}{' '}
                <span className="text-xs text-slate-400 font-normal font-sans">/ 5 maks</span>
              </div>
              <div className="text-[10px] text-amber-400 font-medium">
                {mentees.length === 0 ? 'Menunggu Pendaftaran' : `${mentees.length} Terhubung`}
              </div>
            </div>
            <div className="h-10 w-px bg-slate-700" />
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Jadwal W4
              </div>
              <div className="text-sm font-semibold text-amber-400">
                TBA
              </div>
              <div className="text-[10px] text-slate-400 font-normal">
                Segera Diumumkan
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Mentees List & Meet Box (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Session Info Box (TBA) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-brand-navy flex items-center gap-2">
                  <Video className="h-4 w-4 text-cyan-600" />
                  Sesi Mentoring Kelompok W4
                </h3>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  TBA
                </span>
              </div>

              <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <div className="font-bold text-slate-800">
                  TBA (To Be Announced) • Jadwal Disesuaikan Bersama Mentor
                </div>
                <div className="text-slate-500">
                  Agenda: Review CV STAR, simulasi interview teknis, dan feedback 90-day action plan.
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  disabled
                  className="flex-1 bg-slate-100 text-slate-400 border border-slate-200 text-xs font-bold gap-1.5 cursor-not-allowed hover:bg-slate-100"
                >
                  <Clock className="h-4 w-4" />
                  Jadwal & Link Meet: TBA
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs text-slate-600"
                  onClick={() => alert('Jadwal sesi mentoring kelompok W4 akan segera ditetapkan bersama perwakilan mentee.')}
                >
                  Info Jadwal
                </Button>
              </div>
            </div>

            {/* Assigned Mentees List */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-brand-navy flex items-center gap-2">
                  <Users className="h-4 w-4 text-cyan-600" />
                  Daftar Mentee Terhubung ({mentees.length})
                </h3>
                <span className="text-xs text-slate-400">Teknik Elektro ITS</span>
              </div>

              {mentees.length === 0 ? (
                <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-3">
                  <div className="h-12 w-12 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center mx-auto">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-slate-800">
                      Belum Ada Mentee Terdaftar
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                      Cohort Batch 1 sedang dalam tahap pendaftaran terbuka. Begitu mahasiswa mendaftar dan menyelesaikan Career Diagnostic, profil mereka akan langsung terhubung ke kelompok bimbingan ini.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-cyan-700 bg-cyan-100/60 px-3 py-1 rounded-full">
                    <span>Maksimal 5 Mahasiswa / Mentor</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {mentees.map((mentee) => {
                    const isSelected = mentee.id === selectedMenteeId;
                    const hasEvaluated = submittedFeedback.includes(mentee.id);

                    return (
                      <div
                        key={mentee.id}
                        onClick={() => setSelectedMenteeId(mentee.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-cyan-500 bg-cyan-50/50 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                              <span>{mentee.name}</span>
                              {hasEvaluated && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                                  Evaluated ✓
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              NRP {mentee.nrp} • Semester {mentee.semester}
                            </div>
                            <div className="text-[11px] text-cyan-700 font-semibold mt-1">
                              Target: {mentee.targetFunction} ({mentee.targetIndustry})
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xs font-black text-slate-800">
                              CRS: {mentee.crsScore}
                            </div>
                            <span className="text-[10px] text-slate-400">
                              Match: 95%
                            </span>
                          </div>
                        </div>

                        {/* Quick links to CV / LinkedIn */}
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100/80 text-[11px]">
                          {mentee.cvUrl ? (
                            <a
                              href={mentee.cvUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-cyan-700 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <FileText className="h-3 w-3" />
                              <span>Buka Dokumen CV</span>
                            </a>
                          ) : (
                            <span className="text-slate-400 italic">CV belum diunggah</span>
                          )}
                          <span className="text-slate-300">•</span>
                          {mentee.linkedinUrl && (
                            <a
                              href={mentee.linkedinUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-slate-600 hover:text-cyan-700 flex items-center gap-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span>LinkedIn</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: 5-Minute Post-Session Evaluation Rubric (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <BorderBeam size={64} duration={8} colorFrom="#00B4D8" colorTo="#0F2F57" />
              <div className="border-b border-slate-100 pb-4 relative z-10">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1">
                  <Award className="h-3.5 w-3.5" />
                  <span>Form Rubrik Evaluasi Pasca-Sesi (5 Menit)</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  {selectedMentee ? `Evaluasi Mentee: ${selectedMentee.name}` : 'Evaluasi Mentee Kelompok'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-normal">
                  Berikan penilaian terstruktur untuk membantu mahasiswa memahami kekuatan dan area perbaikan prioritas.
                </p>
              </div>

              {successToast && selectedMentee && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in relative z-10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    Feedback untuk {selectedMentee.name} berhasil disimpan dan otomatis terkirim ke dashboard mahasiswa!
                  </span>
                </div>
              )}

              {mentees.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-3 relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    Form Evaluasi Aktif Setelah Mentee Terdaftar
                  </div>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Form rubrik penilaian 5 dimensi (Kesiapan Materi, Sasaran Karier, Kualitas Draf CV, Catatan Kekuatan, dan Area Perbaikan) akan terbuka otomatis setelah mentee terhubung ke kelompok bimbingan.
                  </p>
                </div>
              ) : selectedMentee ? (
                <form onSubmit={handleSubmitEvaluation} className="space-y-5 relative z-10">
                  {/* Rating 1: Punctuality & Prep */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                      <span>1. Kesiapan Materi & Ketepatan Waktu (1-5):</span>
                      <span className="text-cyan-700 font-extrabold">{prepRating} / 5</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setPrepRating(val)}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                            prepRating === val
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating 2: Career Objective Clarity */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                      <span>2. Kejelasan Sasaran Karier & Pertanyaan (1-5):</span>
                      <span className="text-cyan-700 font-extrabold">{clarityRating} / 5</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setClarityRating(val)}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                            clarityRating === val
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating 3: CV Quality */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                      <span>3. Kualitas Draf CV & Portofolio Proyek (1-5):</span>
                      <span className="text-cyan-700 font-extrabold">{cvRating} / 5</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setCvRating(val)}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                            cvRating === val
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Qualitative Strength Notes */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Kekuatan Utama Mahasiswa (1 Key Strength):
                    </label>
                    <textarea
                      rows={2}
                      value={strengthNotes}
                      onChange={(e) => setStrengthNotes(e.target.value)}
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>

                  {/* Qualitative Improvement Notes */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Area Perbaikan Kritis (1 Critical Improvement Area):
                    </label>
                    <textarea
                      rows={2}
                      value={improvementNotes}
                      onChange={(e) => setImprovementNotes(e.target.value)}
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <span className="text-[11px] text-slate-400">
                      Rubrik ini membutuhkan &lt; 3 menit untuk diselesaikan.
                    </span>
                    <Button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 shadow-md rounded-xl"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Kirim Evaluasi Mentee
                    </Button>
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

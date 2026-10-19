'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Target, 
  BookOpen, 
  Zap, 
  Play,
  ArrowUpRight,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { BorderBeam } from '@/components/magicui/border-beam';

function GoogleIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const { loginWithGoogle, loginWithCredentials, registerUser, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Form State
  const [name, setName] = useState('Thoriq Hilmuddin');
  const [email, setEmail] = useState('thoriq.hilmuddin@alumni.its.ac.id');
  const [department, setDepartment] = useState('Teknik Elektro ITS');
  const [nrp, setNrp] = useState('5007201191');
  const [targetIndustry, setTargetIndustry] = useState('Oil & Gas & Subsea Electrical');
  const [password, setPassword] = useState('••••••••');
  const [role, setRole] = useState<'student' | 'mentor' | 'institution'>('student');

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      await loginWithCredentials(email, role, '/diagnostic');
    } else {
      await registerUser(
        {
          name,
          email,
          department,
          nrp,
          targetIndustry,
          role,
        },
        '/diagnostic'
      );
    }
  };

  const handleDemoLogin = async (demoRole: 'student' | 'mentor' | 'institution') => {
    if (demoRole === 'student') {
      await loginWithCredentials('thoriq.hilmuddin@alumni.its.ac.id', 'student', '/diagnostic');
    } else if (demoRole === 'mentor') {
      await loginWithCredentials('hendra.wijaya@bp.com', 'mentor', '/dashboard/mentor');
    } else {
      await loginWithCredentials('akademik.fteic@its.ac.id', 'institution', '/dashboard/b2b');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50/70 py-8 lg:py-12 overflow-hidden">
      {/* Subtle Grid Pattern Background */}
      <GridPattern
        width={36}
        height={36}
        className="opacity-30 stroke-slate-200 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_85%)]"
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10 space-y-10">
        {/* Top Header Breadcrumb / Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="text-emerald-700 font-bold">Career Bridge Talent Gateway</span>
            <span>•</span>
            <span>Autentikasi Mahasiswa & Pengisian Diagnostic Test</span>
          </div>

          <Link
            href="/?preview=true"
            className="text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
          >
            <span>Lewati ke Beranda & Kurikulum</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* BP-Inspired Culture Grid Section (Header Grid from user screenshot) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {/* Card 1: Stretch */}
          <div className="col-span-1 rounded-2xl bg-[#00873D] text-white p-5 flex flex-col justify-between shadow-xs group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-200">
                Pilar 01
              </span>
              <Target className="h-4 w-4 text-green-200" />
            </div>
            <div className="my-4">
              <h3 className="text-2xl font-bold tracking-tight mb-1 text-white">
                Stretch
              </h3>
              <p className="text-[11px] text-green-100 leading-snug">
                Tantang kapabilitas teknis Anda dengan studi kasus industri nyata.
              </p>
            </div>
            <span className="text-[10px] font-semibold text-green-200 flex items-center gap-1">
              <span>Studi Kasus Teknis</span>
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>

          {/* Card 2: Visual Engineer */}
          <div className="col-span-1 rounded-2xl overflow-hidden relative min-h-[140px] shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80"
              alt="Engineering Workstation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-3 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">
                Simulasi
              </span>
              <span className="text-xs font-semibold text-white">
                ETAP & Power Grid
              </span>
            </div>
          </div>

          {/* Card 3: Grow */}
          <div className="col-span-1 rounded-2xl bg-[#0F172A] text-white p-5 flex flex-col justify-between shadow-xs border border-slate-800">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Pilar 02
              </span>
              <Zap className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="my-4">
              <h3 className="text-2xl font-bold tracking-tight mb-1 text-white">
                Grow
              </h3>
              <p className="text-[11px] text-slate-300 leading-snug">
                Optimasi profil CV ATS berstandar STAR dan mock interview.
              </p>
            </div>
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
              <span>Review CV ATS</span>
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>

          {/* Card 4: Learn */}
          <div className="col-span-1 rounded-2xl bg-[#00A34A] text-white p-5 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-100">
                Pilar 03
              </span>
              <BookOpen className="h-4 w-4 text-green-100" />
            </div>
            <div className="my-4">
              <h3 className="text-2xl font-bold tracking-tight mb-1 text-white">
                Learn
              </h3>
              <p className="text-[11px] text-green-100 leading-snug">
                Bedah standar API RP 14F, IEEE, dan best practice migas.
              </p>
            </div>
            <span className="text-[10px] font-semibold text-green-100 flex items-center gap-1">
              <span>Kurikulum Terarah</span>
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>

          {/* Card 5: We're with you */}
          <div className="col-span-2 sm:col-span-4 md:col-span-1 rounded-2xl bg-[#78BE20] text-slate-950 p-5 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900">
                Pilar 04
              </span>
              <Users className="h-4 w-4 text-slate-950" />
            </div>
            <div className="my-4">
              <h3 className="text-2xl font-bold tracking-tight mb-1 text-slate-950">
                With You
              </h3>
              <p className="text-[11px] font-medium text-slate-900 leading-snug">
                Pendampingan intensif 90-Day Career Action Plan hingga siap kerja.
              </p>
            </div>
            <span className="text-[10px] font-bold text-slate-950 flex items-center gap-1">
              <span>Mentoring 4-5 Orang</span>
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </div>

        {/* Lower Main Two-Column Section (Exact Layout of BP Talent Community Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Community Info & Pilot Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                <Compass className="h-3.5 w-3.5" />
                <span>CareerBridge Talent Community</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                Selamat Datang di Portal Kesiapan Karier Teknik & Energi
              </h2>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed font-normal">
                Bergabunglah dengan ekosistem persiapan karier mahasiswa Teknik Elektro & Energi.
                Daftarkan akun atau login untuk langsung mengisi <strong>Career Diagnostic Test (25 Soal)</strong>,
                melihat skor <strong>Career Readiness Score (CRS)</strong>, dan mendapatkan alokasi mentor industri yang relevan.
              </p>
            </div>

            {/* Video / Pilot Showcase Card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
              <div className="relative aspect-video w-full bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80"
                  alt="Career Coaching Session"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                    <Play className="h-5 w-5 ml-0.5 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold bg-slate-950/70 backdrop-blur-xs px-3 py-1.5 rounded-lg">
                  Pilot Validasi: SPE ITS SC Coaching Network (100+ Member)
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Kurikulum Terstruktur 4 Minggu & Small-Group Mentoring</span>
                </div>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Setiap mentee didampingi 1 mentor industri senior (BP, PLN NP, Schneider Electric, SLB) untuk menelaah kesiapan CV ATS, simulasi wawancara, dan action plan 90 hari.
                </p>
              </div>
            </div>

            {/* Academic Credential Note */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-500 space-y-1">
              <div className="font-semibold text-slate-700">Platform Simulasi Akademik</div>
              <p>
                Inisiatif tugas perancangan model bisnis Kelompok 7 Kewirausahaan Berbasis Teknologi, Departemen Teknik Elektro, FTEIC ITS Surabaya.
              </p>
            </div>
          </div>

          {/* Right Column: Register / Login Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <BorderBeam size={70} duration={8} colorFrom="#059669" colorTo="#2563EB" />

              {/* Card Header */}
              <div className="border-b border-slate-100 pb-4 relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">
                    {authMode === 'login' ? 'Masuk ke Platform' : 'Daftar Akun Peserta'}
                  </h3>
                  <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className={`px-3 py-1 rounded-md transition-all ${
                        authMode === 'login'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Masuk
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className={`px-3 py-1 rounded-md transition-all ${
                        authMode === 'register'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Daftar
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {authMode === 'login'
                    ? 'Masuk untuk langsung diarahkan ke Career Diagnostic Assessment Form.'
                    : 'Lengkapi profil untuk mengukur Career Readiness Score (CRS) Anda.'}
                </p>
              </div>

              {/* Google One-Click Login Button */}
              <div className="relative z-10 space-y-3">
                <button
                  type="button"
                  onClick={() => loginWithGoogle('/diagnostic')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 h-12 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-xs transition-all hover:border-slate-400"
                >
                  <GoogleIcon className="h-5 w-5" />
                  <span>
                    {isLoading
                      ? 'Menghubungkan Akun Google...'
                      : authMode === 'login'
                      ? 'Masuk Cepat dengan Akun Google'
                      : 'Daftar Cepat dengan Akun Google'}
                  </span>
                </button>

                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider relative">
                    atau menggunakan email
                  </span>
                </div>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleCredentialsSubmit} className="space-y-4 relative z-10">
                {authMode === 'register' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Thoriq Hilmuddin"
                        required
                        className="w-full h-11 px-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        NRP / NIM Mahasiswa *
                      </label>
                      <input
                        type="text"
                        value={nrp}
                        onChange={(e) => setNrp(e.target.value)}
                        placeholder="5007201191"
                        required
                        className="w-full h-11 px-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Alamat Email Kampus / Pribadi *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@alumni.its.ac.id"
                    required
                    className="w-full h-11 px-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {authMode === 'register' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Departemen / Jurusan *
                      </label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full h-11 px-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      >
                        <option value="Teknik Elektro ITS">Teknik Elektro ITS</option>
                        <option value="Teknik Komputer ITS">Teknik Komputer ITS</option>
                        <option value="Teknik Informatika ITS">Teknik Informatika ITS</option>
                        <option value="Sistem Informasi ITS">Sistem Informasi ITS</option>
                        <option value="Teknik Biomedik ITS">Teknik Biomedik ITS</option>
                        <option value="Teknik Mesin / Fisika">Teknik Mesin / Fisika</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Target Industri Pilihan *
                      </label>
                      <select
                        value={targetIndustry}
                        onChange={(e) => setTargetIndustry(e.target.value)}
                        className="w-full h-11 px-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      >
                        <option value="Oil & Gas & Subsea Electrical">Oil & Gas (BP, SLB, Medco)</option>
                        <option value="Power Utility & Grid Automation">Power Utility (PLN NP, Schneider)</option>
                        <option value="Renewable Energy & BESS">Renewable Energy (Solar, Geothermal)</option>
                        <option value="Industrial IoT & Automation">Industrial Automation & SCADA</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Kata Sandi *
                    </label>
                    {authMode === 'login' && (
                      <span className="text-[11px] text-emerald-700 font-medium hover:underline cursor-pointer">
                        Lupa kata sandi?
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    required
                    className="w-full h-11 px-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-all mt-2"
                >
                  {isLoading
                    ? 'Memproses...'
                    : authMode === 'login'
                    ? 'Masuk & Lanjut ke Asesmen Form'
                    : 'Daftar & Mulai Asesmen Form'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              {/* Demo Quick-Login Presets (For fast evaluation) */}
              <div className="pt-2 border-t border-slate-100 relative z-10 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Preset Akses Cepat Demo Evaluasi:
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('student')}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Mahasiswa (Thoriq - CRS 54)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('mentor')}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <Users className="h-3.5 w-3.5 text-blue-600" />
                    <span>Mentor (Ir. Hendra - BP)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('institution')}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                    <span>B2B Himpunan (FTEIC)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

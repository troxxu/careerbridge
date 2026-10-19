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
  GraduationCap,
  AlertCircle,
  Mail,
  Lock,
  User,
  Building,
  Hash,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { BorderBeam } from '@/components/magicui/border-beam';

export default function LoginPage() {
  const { 
    loginWithCredentials, 
    registerUser, 
    requestPasswordReset, 
    resetPasswordWithToken, 
    isLoading 
  } = useAuth();

  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Login Form State (Clean, completely empty by default)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register Form State (Clean, empty by default)
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDepartment, setRegDepartment] = useState('Teknik Elektro');
  const [regUniversity, setRegUniversity] = useState('Institut Teknologi Sepuluh Nopember (ITS)');
  const [regNrp, setRegNrp] = useState('');
  const [regTargetIndustry, setRegTargetIndustry] = useState('Oil, Gas & Subsea Electrical');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Forgot Password Form State
  const [resetEmail, setResetEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetStep, setResetStep] = useState<'request' | 'verify'>('request');

  // Status and Alerts
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const switchMode = (mode: 'login' | 'register' | 'forgot') => {
    clearMessages();
    setAuthMode(mode);
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMessage('Silakan masukkan alamat email dan kata sandi Anda.');
      return;
    }

    const res = await loginWithCredentials(loginEmail, loginPassword, '/diagnostic');
    if (!res.success) {
      setErrorMessage(res.error || 'Terjadi kesalahan saat masuk.');
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!regName.trim()) {
      setErrorMessage('Nama lengkap wajib diisi.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMessage('Alamat email valid wajib diisi.');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setErrorMessage('Kata sandi harus memiliki minimal 6 karakter.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    const res = await registerUser(
      {
        name: regName,
        email: regEmail,
        password: regPassword,
        department: regDepartment,
        university: regUniversity,
        nrp: regNrp,
        targetIndustry: regTargetIndustry,
        role: 'student',
      },
      '/diagnostic'
    );

    if (!res.success) {
      setErrorMessage(res.error || 'Gagal mendaftarkan akun.');
    }
  };

  // Handle Forgot Password Request
  const handleForgotPasswordRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!resetEmail.trim() || !resetEmail.includes('@')) {
      setErrorMessage('Silakan masukkan alamat email yang terdaftar.');
      return;
    }

    const res = await requestPasswordReset(resetEmail);
    if (!res.success) {
      setErrorMessage(res.error || 'Email tidak ditemukan.');
    } else {
      setSuccessMessage(res.message || 'Instruksi dan 6 digit kode pemulihan telah dikirim ke email Anda.');
      setResetStep('verify');
    }
  };

  // Handle Set New Password
  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!resetToken.trim()) {
      setErrorMessage('Silakan masukkan 6 digit kode verifikasi yang dikirim ke email Anda.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('Kata sandi baru minimal 6 karakter.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Konfirmasi kata sandi baru tidak cocok.');
      return;
    }

    const res = await resetPasswordWithToken(resetEmail, resetToken, newPassword);
    if (!res.success) {
      setErrorMessage(res.error || 'Gagal mengatur ulang kata sandi.');
    } else {
      setSuccessMessage('Kata sandi berhasil diperbarui! Silakan masuk dengan kata sandi baru Anda.');
      setLoginEmail(resetEmail);
      setLoginPassword('');
      setResetToken('');
      setNewPassword('');
      setConfirmNewPassword('');
      setResetStep('request');
      setAuthMode('login');
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
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-emerald-400">
                <Compass className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                Career<span className="text-emerald-600">Bridge</span>
              </span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              {authMode === 'login' ? 'Masuk Akun' : authMode === 'register' ? 'Registrasi Akun Baru' : 'Pemulihan Sandi'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500 font-normal">
              Kelompok 7 Kewirausahaan Berbasis Teknologi FTEIC ITS
            </span>
            <Link
              href="/?preview=true"
              className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 hover:underline"
            >
              <span>Jelajahi Beranda Publik</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* 1. TOP CULTURE GRID (BP Talent Community Design Standard) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                CareerBridge & BP Talent Community
              </h2>
              <p className="text-sm font-semibold text-slate-800 tracking-tight">
                Portal Akselerasi Kesiapan Karier & Mentoring Mahasiswa Teknik Energi
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <Sparkles className="h-3 w-3 text-emerald-600" />
              Batch 1 Cohort 2026
            </span>
          </div>

          {/* 5-Block BP Culture Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {/* Tile 1: Stretch */}
            <div className="relative overflow-hidden rounded-2xl bg-emerald-700 p-4 text-white shadow-xs group transition-all hover:shadow-md flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">01 / Culture</span>
                <Target className="h-4 w-4 opacity-80" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight">Stretch</div>
                <p className="text-[11px] opacity-90 font-normal mt-0.5 line-clamp-2">
                  Tantang batasan teknis dengan standar kompetensi industri global.
                </p>
              </div>
            </div>

            {/* Tile 2: Visual Workstation */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-xs min-h-[140px] group">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80"
                alt="Engineering Professional"
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-semibold text-white">Offshore & Subsea</span>
              </div>
            </div>

            {/* Tile 3: Grow */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-4 text-white shadow-xs group transition-all hover:shadow-md flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">02 / Culture</span>
                <Zap className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight">Grow</div>
                <p className="text-[11px] text-slate-300 font-normal mt-0.5 line-clamp-2">
                  Akselerasi kesiapan CV ATS, simulasi wawancara, dan action plan 90 hari.
                </p>
              </div>
            </div>

            {/* Tile 4: Learn */}
            <div className="relative overflow-hidden rounded-2xl bg-emerald-600 p-4 text-white shadow-xs group transition-all hover:shadow-md flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">03 / Culture</span>
                <BookOpen className="h-4 w-4 opacity-80" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight">Learn</div>
                <p className="text-[11px] opacity-90 font-normal mt-0.5 line-clamp-2">
                  Kurikulum terstruktur 4 minggu & mentoring rasio kecil (1:4).
                </p>
              </div>
            </div>

            {/* Tile 5: With You */}
            <div className="col-span-2 md:col-span-1 relative overflow-hidden rounded-2xl bg-emerald-100/90 border border-emerald-300 p-4 text-emerald-950 shadow-xs group transition-all hover:shadow-md flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">04 / Culture</span>
                <Users className="h-4 w-4 text-emerald-800" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight text-emerald-900">With You</div>
                <p className="text-[11px] text-emerald-800 font-normal mt-0.5 line-clamp-2">
                  Didampingi mentor industri senior (BP, PLN NP, Schneider Electric, SLB).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MAIN 2-COLUMN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Community Overview & Pilot Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <ShieldCheck className="h-3.5 w-3.5" />
                Talent Community Portal
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl leading-tight">
                Bergabunglah dengan Komunitas Bakat Mahasiswa Teknik & Energi
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Daftarkan akun Anda untuk langsung mengisi form asesmen kesiapan karier (**Career Diagnostic Assessment**) dan memperoleh laporan analisis spider web radar chart secara instan.
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
                  Setiap mentee didampingi mentor industri senior untuk menelaah kesiapan CV ATS, simulasi wawancara teknis, dan action plan 90 hari.
                </p>
              </div>
            </div>

            {/* Academic Credential Note */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-500 space-y-1">
              <div className="font-semibold text-slate-700">Inisiatif Platform Nyata</div>
              <p>
                Inisiatif perancangan model bisnis Kelompok 7 Kewirausahaan Berbasis Teknologi, Departemen Teknik Elektro, FTEIC ITS Surabaya.
              </p>
            </div>
          </div>

          {/* Right Column: Normal Login / Register / Forgot Password Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <BorderBeam size={70} duration={8} colorFrom="#059669" colorTo="#2563EB" />

              {/* Card Header & Tabs */}
              <div className="border-b border-slate-100 pb-4 relative z-10">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">
                      {authMode === 'login'
                        ? 'Masuk ke Akun Anda'
                        : authMode === 'register'
                        ? 'Daftar Akun Peserta Baru'
                        : 'Atur Ulang Kata Sandi'}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      {authMode === 'login'
                        ? 'Masukkan email dan kata sandi yang telah Anda daftarkan.'
                        : authMode === 'register'
                        ? 'Lengkapi data diri Anda untuk membuat akun baru dan membuka asesmen form.'
                        : 'Masukkan alamat email Anda untuk menerima instruksi pemulihan kata sandi.'}
                    </p>
                  </div>

                  {/* Tab Pill Buttons */}
                  {authMode !== 'forgot' && (
                    <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => switchMode('login')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          authMode === 'login'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Masuk
                      </button>
                      <button
                        type="button"
                        onClick={() => switchMode('register')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          authMode === 'register'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Daftar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Alert Box */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2 relative z-10 animate-fade-in">
                  <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1">{errorMessage}</div>
                </div>
              )}

              {/* Success Alert Box */}
              {successMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-start gap-2 relative z-10 animate-fade-in">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1">{successMessage}</div>
                </div>
              )}

              {/* -------------------- FORM 1: LOGIN -------------------- */}
              {authMode === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4 relative z-10">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-500" />
                      <span>Alamat Email Terdaftar *</span>
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        clearMessages();
                      }}
                      placeholder="nama@email.com atau @student.its.ac.id"
                      required
                      className="w-full h-11 px-3.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5 text-slate-500" />
                        <span>Kata Sandi *</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => switchMode('forgot')}
                        className="text-[11px] text-emerald-700 font-semibold hover:underline"
                      >
                        Lupa kata sandi?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => {
                          setLoginPassword(e.target.value);
                          clearMessages();
                        }}
                        placeholder="Masukkan kata sandi akun Anda"
                        required
                        className="w-full h-11 px-3.5 pr-10 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                        tabIndex={-1}
                      >
                        {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-all mt-3"
                  >
                    {isLoading ? 'Memverifikasi kredensial...' : 'Masuk & Buka Asesmen Form'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="text-center pt-2">
                    <span className="text-xs text-slate-500 font-normal">
                      Belum memiliki akun?{' '}
                    </span>
                    <button
                      type="button"
                      onClick={() => switchMode('register')}
                      className="text-xs font-bold text-emerald-700 hover:underline"
                    >
                      Daftar akun peserta baru di sini
                    </button>
                  </div>
                </form>
              )}

              {/* -------------------- FORM 2: REGISTER -------------------- */}
              {authMode === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-slate-500" />
                        <span>Nama Lengkap *</span>
                      </label>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => {
                          setRegName(e.target.value);
                          clearMessages();
                        }}
                        placeholder="Contoh: Muhammad Rizky Pratama"
                        required
                        className="w-full h-11 px-3.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-500" />
                        <span>Alamat Email Kampus / Pribadi *</span>
                      </label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => {
                          setRegEmail(e.target.value);
                          clearMessages();
                        }}
                        placeholder="nama@student.its.ac.id atau email pribadi"
                        required
                        className="w-full h-11 px-3.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5 text-slate-500" />
                        <span>Departemen / Jurusan *</span>
                      </label>
                      <select
                        value={regDepartment}
                        onChange={(e) => setRegDepartment(e.target.value)}
                        className="w-full h-11 px-3 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                      >
                        <option value="Teknik Elektro">Teknik Elektro</option>
                        <option value="Teknik Mesin">Teknik Mesin</option>
                        <option value="Teknik Kimia">Teknik Kimia</option>
                        <option value="Teknik Fisika">Teknik Fisika</option>
                        <option value="Teknik Material & Metalurgi">Teknik Material & Metalurgi</option>
                        <option value="Teknik Kelautan / Perkapalan">Teknik Kelautan / Perkapalan</option>
                        <option value="Teknologi Informasi / Komputer">Teknologi Informasi / Komputer</option>
                        <option value="Biomedik & Teknik Lainnya">Biomedik & Teknik Lainnya</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Hash className="h-3.5 w-3.5 text-slate-500" />
                        <span>NRP / NIM Mahasiswa</span>
                      </label>
                      <input
                        type="text"
                        value={regNrp}
                        onChange={(e) => setRegNrp(e.target.value)}
                        placeholder="Contoh: 5007221088"
                        className="w-full h-11 px-3.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Target className="h-3.5 w-3.5 text-slate-500" />
                        <span>Target Industri Karier Sasaran</span>
                      </label>
                      <select
                        value={regTargetIndustry}
                        onChange={(e) => setRegTargetIndustry(e.target.value)}
                        className="w-full h-11 px-3 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                      >
                        <option value="Oil, Gas & Subsea Electrical">Oil, Gas & Subsea Electrical (BP, Pertamina, SLB)</option>
                        <option value="Power Utility & Grid Automation">Power Utility & Grid Automation (PLN NP, Schneider, Siemens)</option>
                        <option value="Renewable Energy & Energy Transition">Renewable Energy & Transisi Energi (Solar, Wind, Geothermal)</option>
                        <option value="Industrial IoT & Control Systems">Industrial IoT, Automation & Robotics</option>
                        <option value="Engineering Consulting & EPC">Engineering Consulting & EPC (Tripatra, Rekind)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5 text-slate-500" />
                        <span>Buat Kata Sandi *</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          value={regPassword}
                          onChange={(e) => {
                            setRegPassword(e.target.value);
                            clearMessages();
                          }}
                          placeholder="Min. 6 karakter"
                          required
                          className="w-full h-11 px-3.5 pr-10 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                          tabIndex={-1}
                        >
                          {showRegPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5 text-slate-500" />
                        <span>Ulangi Kata Sandi *</span>
                      </label>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        value={regConfirmPassword}
                        onChange={(e) => {
                          setRegConfirmPassword(e.target.value);
                          clearMessages();
                        }}
                        placeholder="Konfirmasi sandi"
                        required
                        className="w-full h-11 px-3.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-all mt-3"
                  >
                    {isLoading ? 'Menyimpan akun baru...' : 'Daftar Akun & Langsung Buka Asesmen Form'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="text-center pt-2">
                    <span className="text-xs text-slate-500 font-normal">
                      Sudah memiliki akun terdaftar?{' '}
                    </span>
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="text-xs font-bold text-emerald-700 hover:underline"
                    >
                      Masuk di sini
                    </button>
                  </div>
                </form>
              )}

              {/* -------------------- VIEW 3: FORGOT PASSWORD -------------------- */}
              {authMode === 'forgot' && (
                <div className="space-y-4 relative z-10">
                  {resetStep === 'request' ? (
                    <form onSubmit={handleForgotPasswordRequest} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-slate-500" />
                          <span>Alamat Email Terdaftar Anda *</span>
                        </label>
                        <input
                          type="email"
                          value={resetEmail}
                          onChange={(e) => {
                            setResetEmail(e.target.value);
                            clearMessages();
                          }}
                          placeholder="Masukkan email yang Anda gunakan saat mendaftar"
                          required
                          className="w-full h-11 px-3.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                        />
                      </div>

                      <div className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                        Sistem CareerBridge akan memeriksa email Anda di database dan mengirimkan kode verifikasi pemulihan untuk mengatur ulang kata sandi baru.
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs"
                        >
                          {isLoading ? 'Mengirim instruksi...' : 'Kirim Tautan / Kode Reset'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => switchMode('login')}
                          className="h-11 text-xs font-semibold rounded-xl"
                        >
                          Batal
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleSetNewPassword} className="space-y-4">
                      {/* Email Dispatch Notice Box */}
                      <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs space-y-1.5">
                        <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                          <Mail className="h-4 w-4 text-emerald-700" />
                          <span>Kode Verifikasi Telah Dikirim ke Email</span>
                        </div>
                        <p className="text-emerald-800 leading-relaxed">
                          Kami telah mengirimkan 6 digit kode keamanan ke <strong>{resetEmail}</strong>. Silakan periksa Kotak Masuk (Inbox) atau folder Spam email Anda.
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-emerald-700 pt-1">
                          <span>Tidak menerima email?</span>
                          <button
                            type="button"
                            onClick={() => setResetStep('request')}
                            className="font-bold underline hover:text-emerald-950"
                          >
                            Kirim Ulang Kode
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Kode Verifikasi Email *
                        </label>
                        <input
                          type="text"
                          value={resetToken}
                          onChange={(e) => setResetToken(e.target.value)}
                          placeholder="Masukkan kode 6 digit dari email"
                          required
                          className="w-full h-11 px-3.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-wider"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Kata Sandi Baru *
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            clearMessages();
                          }}
                          placeholder="Minimal 6 karakter"
                          required
                          className="w-full h-11 px-3.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Konfirmasi Kata Sandi Baru *
                        </label>
                        <input
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) => {
                            setConfirmNewPassword(e.target.value);
                            clearMessages();
                          }}
                          placeholder="Ulangi kata sandi baru"
                          required
                          className="w-full h-11 px-3.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs"
                        >
                          {isLoading ? 'Memperbarui sandi...' : 'Perbarui Kata Sandi & Masuk'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => switchMode('login')}
                          className="h-11 text-xs font-semibold rounded-xl"
                        >
                          Kembali ke Login
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Data Persistence Guarantee Footnote */}
              <div className="pt-3 border-t border-slate-100 relative z-10 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Kredensial akun tersimpan aman di database website.
                </span>
                <span className="font-mono">CareerBridge Auth v2.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

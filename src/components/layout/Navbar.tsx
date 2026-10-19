'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Compass, 
  Menu, 
  X, 
  Layers, 
  Users, 
  GraduationCap, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  LogOut, 
  LogIn,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Kurikulum', href: '/#curriculum' },
    { label: 'Mentor', href: '/#mentors' },
    { label: 'Biaya', href: '/#pricing' },
    { label: 'Career Diagnostic', href: '/diagnostic', isDiagnostic: true },
  ];

  const dashboardLinks = [
    { label: 'Student Workspace', href: '/dashboard/student', icon: GraduationCap, desc: '90-Day Action Plan & Review' },
    { label: 'Mentor Portal', href: '/dashboard/mentor', icon: Users, desc: 'Review Mentee & Feedback' },
    { label: 'B2B Himpunan & Dept', href: '/dashboard/b2b', icon: Building2, desc: 'Laporan Agregat Dampak' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md transition-all">
      {/* Top Banner Alert (Clean & Compact on Mobile) */}
      <div className="bg-slate-900 px-4 py-1.5 text-center text-xs font-medium text-slate-300 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="inline-block rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shrink-0">
            Batch 1 Open
          </span>
          <span className="text-[11px] sm:text-xs text-slate-200 truncate max-w-[280px] sm:max-w-none">
            Pendaftaran Cohort Mahasiswa Teknik & Energi 2026: 100+ Member SPE ITS SC Network
          </span>
          <Link
            href="/#curriculum"
            className="hidden md:inline-flex items-center font-bold text-emerald-400 hover:text-white hover:underline ml-1 text-xs transition-colors shrink-0"
          >
            Lihat Kurikulum <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Main Navbar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex h-16 items-center justify-between gap-4">
        
        {/* Left: Brand & Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <img
            src="/images/logo-full.png"
            alt="CareerBridge"
            className="h-7 sm:h-8 w-auto object-contain"
          />
          <span className="rounded-md bg-cyan-50 border border-cyan-200/80 px-1.5 py-0.5 text-[10px] font-bold text-cyan-800 hidden sm:inline-block">
            ITS
          </span>
        </Link>

        {/* Center: Desktop Navigation Links (Proper spacing & No duplicate button) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            if (link.isDiagnostic) {
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200 transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{link.label}</span>
                </Link>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-emerald-700 ${
                  isActive ? 'text-emerald-700 font-semibold' : 'text-slate-600'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions, Portal Switcher, and User Profile */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Portal Switcher Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl border border-slate-200 transition-colors">
              <Layers className="h-3.5 w-3.5 text-slate-600" />
              <span>Pilih Portal</span>
              <ChevronDown className="h-3 w-3 text-slate-400 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute right-0 top-full mt-1.5 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Pilih Role & Workspace:
              </div>
              {dashboardLinks.map((d) => (
                <Link
                  key={d.label}
                  href={d.href}
                  className="flex items-start gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700 transition-colors"
                >
                  <d.icon className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800">{d.label}</div>
                    <div className="text-[10px] text-slate-400">{d.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Conditional Profile Chip or Login/Register CTA */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <Link 
                href={`/dashboard/${user.role === 'mentor' ? 'mentor' : user.role === 'institution' ? 'b2b' : 'student'}`}
                className="flex items-center gap-2.5 bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 rounded-xl px-3 py-1.5 transition-all group"
              >
                <div className="h-7 w-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left text-xs leading-tight">
                  <div className="font-bold text-slate-900 group-hover:text-emerald-800 truncate max-w-[120px]">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {user.crsScore ? `CRS ${user.crsScore}` : user.department || user.role}
                  </div>
                </div>
              </Link>
              <button
                onClick={logout}
                title="Keluar / Logout"
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="default" size="sm" className="bg-slate-900 hover:bg-emerald-600 text-white font-semibold rounded-xl text-xs gap-1.5 shadow-sm transition-all h-9 px-4">
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Masuk / Daftar</span>
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer (Clean, Modern, Space-Optimized for Mobile Users) */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          
          {/* Mobile Auth Status */}
          {isAuthenticated && user ? (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-bold text-slate-900 truncate max-w-[180px]">{user.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono truncate max-w-[180px]">{user.email}</div>
                  {user.crsScore && (
                    <span className="inline-block mt-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Skor CRS: {user.crsScore} ({user.crsTier})
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-xs font-semibold text-rose-600 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="block"
            >
              <Button className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-xl gap-2 h-11 text-xs">
                <LogIn className="h-4 w-4" />
                <span>Masuk / Daftar Akun Peserta</span>
              </Button>
            </Link>
          )}

          {/* Nav Links */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors ${
                  link.isDiagnostic
                    ? 'col-span-2 bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
                {link.isDiagnostic && (
                  <span className="rounded-full bg-emerald-200/80 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                    Gratis
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Quick Portal Switcher */}
          <div className="border-t border-slate-100 pt-3">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Pilih Workspace Portal:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              {dashboardLinks.map((d) => (
                <Link
                  key={d.label}
                  href={d.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-100"
                >
                  <d.icon className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{d.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

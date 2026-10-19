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
  Award, 
  GraduationCap, 
  Building2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Kurikulum Cohort', href: '/#curriculum' },
    { label: 'Profil Mentor', href: '/#mentors' },
    { label: 'Paket & Biaya', href: '/#pricing' },
    { label: 'Career Diagnostic', href: '/diagnostic', highlight: true },
  ];

  const dashboardLinks = [
    { label: 'Student Workspace', href: '/dashboard/student', icon: GraduationCap },
    { label: 'Mentor Portal', href: '/dashboard/mentor', icon: Users },
    { label: 'B2B Himpunan/Dept', href: '/dashboard/b2b', icon: Building2 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      {/* Top Banner Alert / Notice */}
      <div className="bg-brand-navy px-4 py-1.5 text-center text-xs font-medium text-slate-300">
        <div className="container flex items-center justify-center gap-2">
          <span className="inline-block rounded-full bg-brand-bp px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
            Batch 1 Open
          </span>
          <span>
            Pendaftaran Cohort Mahasiswa Teknik & Energi 2026 dibuka • Didukung 100+ Member SPE ITS SC Network
          </span>
          <Link
            href="/#curriculum"
            className="hidden items-center font-semibold text-brand-bp-light hover:underline sm:inline-flex"
          >
            Lihat Jadwal <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="container flex h-16 items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy via-brand-blue to-emerald-600 text-white shadow-md group-hover:scale-105 transition-transform">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-brand-navy">
                Career<span className="text-brand-blue">Bridge</span>
              </span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                MVP
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none">
              Engineering & Energy Career Platform
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  link.highlight
                    ? 'text-brand-blue hover:text-blue-700 flex items-center gap-1.5 bg-blue-50/80 px-3 py-1.5 rounded-full border border-blue-200'
                    : isActive
                    ? 'text-brand-blue'
                    : 'text-slate-600 hover:text-brand-navy'
                }`}
              >
                {link.highlight && <Sparkles className="h-3.5 w-3.5 text-brand-blue" />}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Dashboard Switcher & Diagnostic CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Dropdown / Dashboard preview */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors">
              <Layers className="h-3.5 w-3.5 text-brand-navy" />
              <span>Demo Portals</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
              <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Pilih Tampilan:
              </div>
              {dashboardLinks.map((d) => (
                <Link
                  key={d.label}
                  href={d.href}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-blue transition-colors"
                >
                  <d.icon className="h-4 w-4 text-slate-500" />
                  <span>{d.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/diagnostic">
            <Button variant="default" size="sm" className="bg-brand-blue hover:bg-blue-700">
              Career Diagnostic
            </Button>
          </Link>

          <Link href="/dashboard/student">
            <Button variant="emerald" size="sm">
              Student Dashboard
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-brand-navy"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
              >
                <span>{link.label}</span>
                {link.highlight && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-brand-blue">
                    Gratis
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Workspace & Dashboard Demo
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {dashboardLinks.map((d) => (
                <Link
                  key={d.label}
                  href={d.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100"
                >
                  <d.icon className="h-4 w-4 text-brand-blue" />
                  <span>{d.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link href="/diagnostic" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-brand-blue text-white">
                Mulai Career Diagnostic Gratis
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

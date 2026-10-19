import React from 'react';
import Link from 'next/link';
import { Compass, AlertTriangle, ShieldCheck, HeartHandshake } from 'lucide-react';

export function Footer() {
  const teamMembers = [
    { name: 'Maheswara Yogha Putra Al Ardha', nrp: '5022231188', role: 'Project Lead & Product' },
    { name: 'Ardyan Bagas Trihutama', nrp: '5022231171', role: 'Curriculum & Program' },
    { name: 'Thoriq Hilmuddin', nrp: '5022231191', role: 'Tech & Architecture' },
    { name: 'M. Aqila Daffa Arya Bimantara', nrp: '5022231187', role: 'Mentor Relations' },
    { name: 'Rifky Ananda Riwendra', nrp: '5022231184', role: 'Operations & Quality' },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      {/* MANDATORY LEGAL DISCLAIMER BANNER */}
      <div className="bg-slate-950 border-b border-slate-800 py-4 px-4">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="text-xs leading-relaxed text-slate-300">
            <span className="font-bold text-amber-400 uppercase tracking-wider mr-1">
              Mandatory Legal Disclaimer:
            </span>
            Career Bridge adalah program pengembangan kesiapan karier dan pendampingan profesional independen.
            Platform ini <strong>tidak menjamin</strong> kelulusan seleksi magang maupun tawaran pekerjaan di perusahaan mana pun,
            dan tidak bertindak sebagai agen tenaga kerja komersial. Seluruh materi dan review difokuskan pada peningkatan kompetensi dan kualitas persiapan mahasiswa.
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto py-8 sm:py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5 shadow-md">
                <img
                  src="/images/logo-mark.png"
                  alt="CareerBridge Mark"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  Career<span className="text-cyan-400">Bridge</span>
                </span>
                <span className="ml-2 rounded-md bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                  ITS
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Platform pengembangan kesiapan karier dan professional access berbasis teknologi
              untuk mahasiswa teknik, energi, dan ketenagalistrikan. Menjembatani kesenjangan kurikulum akademik dengan standar industri global secara terstruktur dan terukur.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-bp-light" />
                UU PDP No. 27/2022 Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
                <HeartHandshake className="h-3.5 w-3.5 text-blue-400" />
                Tested with SPE ITS SC Network
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navigasi Utama
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/diagnostic" className="text-brand-blue-light hover:underline font-semibold flex items-center gap-1">
                  Career Diagnostic Test (Gratis)
                </Link>
              </li>
              <li>
                <Link href="/dashboard/student" className="hover:text-white transition-colors">
                  Student Workspace
                </Link>
              </li>
              <li>
                <Link href="/dashboard/mentor" className="hover:text-white transition-colors">
                  Mentor Portal
                </Link>
              </li>
              <li>
                <Link href="/dashboard/b2b" className="hover:text-white transition-colors">
                  B2B Institutional Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Project Context */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Konteks Akademik
            </h4>
            <div className="text-xs space-y-1.5 text-slate-400">
              <p className="font-semibold text-slate-200">
                Kewirausahaan Berbasis Teknologi (Kelas 11)
              </p>
              <p>
                Dosen Pengampu:
                <br />
                <span className="text-slate-300 font-medium">Prof. Ridho Bayuaji, S.T., M.T., Ph.D.</span>
              </p>
              <p className="pt-1">
                Departemen Teknik Elektro, FTEIC
                <br />
                Institut Teknologi Sepuluh Nopember
                <br />
                Surabaya, 2026
              </p>
            </div>
          </div>
        </div>

        {/* Team Members Attribution */}
        <div className="border-t border-slate-800 pt-8 pb-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tim Pengembang (Kelompok 7 Tekno Elektro ITS):
            </span>
            <span className="text-xs text-slate-500">
              Periode Pengembangan: 1 Semester (16 Minggu)
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {teamMembers.map((m) => (
              <div
                key={m.nrp}
                className="bg-slate-800/50 border border-slate-800 rounded-xl p-3 text-xs hover:border-slate-700 transition-colors"
              >
                <div className="font-semibold text-slate-200 truncate" title={m.name}>
                  {m.name}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">NRP: {m.nrp}</div>
                <div className="text-[10px] text-brand-blue-light mt-1 font-medium">{m.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800/80 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Career Bridge: Group 7 Kewirausahaan Berbasis Teknologi ITS.
          </div>
          <div className="flex items-center gap-4">
            <span>Production Ready Architecture</span>
            <span>•</span>
            <span>Next.js 14 App Router</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

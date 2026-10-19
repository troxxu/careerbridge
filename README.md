# Career Bridge — Professional Access & Career Readiness Platform

> **Layanan pengembangan kesiapan karier berbasis teknologi untuk menghubungkan mahasiswa teknik & energi dengan profesional secara terstruktur, kredibel, dan terukur.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Academic-green.svg)](https://its.ac.id)
[![GitHub Repository](https://img.shields.io/badge/GitHub-troxxu%2Fcareerbridge-181717?style=flat&logo=github)](https://github.com/troxxu/careerbridge)

---

## 📌 Identitas Proyek & Tim Pengembang

- **Mata Kuliah**: Kewirausahaan Berbasis Teknologi (Kelas 11)
- **Dosen Pengampu**: Prof. Ridho Bayuaji, S.T., M.T., Ph.D.
- **Departemen**: Teknik Elektro, Fakultas Teknologi Elektro dan Informatika Cerdas (FTEIC)
- **Institusi**: Institut Teknologi Sepuluh Nopember (ITS), Surabaya
- **Tahun Akademik**: 2026 (Periode 1 Semester / 16 Minggu)

### Susunan Tim Pengembang (Kelompok 7):
1. **Maheswara Yogha Putra Al Ardha** (NRP: 5022231188) — *Project Lead & Product Strategist*
2. **Ardyan Bagas Trihutama** (NRP: 5022231171) — *Program & Curriculum Lead*
3. **Thoriq Hilmuddin** (NRP: 5022231191) — *Product & Technology Lead*
4. **M. Aqila Daffa Arya Bimantara** (NRP: 5022231187) — *Professional & Mentor Relations*
5. **Rifky Ananda Riwendra** (NRP: 5022231184) — *Quality, Finance & Operations*

---

## 🚀 Fitur Utama & Modul MVP

1. **Public Discovery & Landing Page (`src/app/page.tsx`)**:
   - Hero Section dengan CTA diagnostik & pendaftaran cohort.
   - **BP-Inspired Energy Culture Grid**: Tampilan modular ("Stretch", "Learn", "Grow", "With You") dengan aksen energi hijau dan navy.
   - **Pilot Social Proof**: Validasi awal dari SPE ITS SC Career Coaching Network (100+ members).
   - **Kurikulum 4-Minggu**: Milestone mingguan terstruktur (W1 Diagnostic, W2 Industry, W3 Prep, W4 Mentoring).
   - **Katalog Mentor Industri**: Profil terkurasi dari BP Indonesia, SLB, PLN Nusantara Power, Medco Power, Schneider Electric.
   - **B2B2C Hybrid Pricing**: Paket Mahasiswa Mandiri vs Paket Himpunan/Departemen.

2. **Career Diagnostic Assessment (`src/app/diagnostic/page.tsx`)**:
   - Kuesioner evaluasi diri 25 butir soal (Skala Likert 1-5).
   - Pengukuran **Career Readiness Score (CRS: 0-100)** pada 5 pilar kompetensi:
     - *Career Clarity & Industry Awareness* (20%)
     - *Technical & Skill Gap Mapping* (25%)
     - *Professional Branding & CV* (20%)
     - *Interview & Communication* (20%)
     - *Networking Strategy* (15%)
   - Visualisasi hasil menggunakan **Spider Web Radar Chart (Recharts)** dan rekomendasi perbaikan prioritas.

3. **Algoritma Matching Engine Service (`src/lib/matching.ts` & `src/app/api/matching/route.ts`)**:
   - Formula kecocokan mentor-mentee:
     $$M = 0.30 \cdot I + 0.25 \cdot F + 0.20 \cdot G + 0.15 \cdot A + 0.10 \cdot P$$
   - Alokasi otomatis kelompok cohort kecil (4-5 mentee per 1 mentor).

4. **Student Workspace Dashboard (`src/app/dashboard/student/page.tsx`)**:
   - Status timeline cohort 4 minggu.
   - Kartu profil mentor kelompok & jadwal Google Meet W4 terintegrasi kalender.
   - Lembar kerja interaktif **90-Day Career Action Plan** (Target 30, 60, dan 90 hari).
   - Form unggah dan status review CV ATS & LinkedIn.

5. **Mentor Collaboration Portal (`src/app/dashboard/mentor/page.tsx`)**:
   - Ringkasan profil 5 mentee yang dipasangkan.
   - Form rubrik evaluasi pasca-sesi (5 menit) untuk feedback konstruktif.

6. **B2B Institutional Analytics Dashboard (`src/app/dashboard/b2b/page.tsx`)**:
   - Analitik agregat kenaikan skor kesiapan mahasiswa (**Pre-test vs Post-test delta: Target $\ge +20\%$**).
   - Distribusi kehadiran dan kelulusan program untuk kebutuhan LPJ himpunan dan akreditasi IABEE/ASIIN.

---

## 💻 Panduan Menjalankan Secara Lokal

```bash
# 1. Clone repository
git clone https://github.com/troxxu/careerbridge.git
cd careerbridge

# 2. Install dependencies
npm install

# 3. Jalankan server pengembangan
npm run dev

# 4. Buka di browser
# http://localhost:3000
```

---

## 🌐 Panduan Deploy ke Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard).
2. Klik **"Add New..."** > **"Project"**.
3. Pilih repositori GitHub: **`troxxu/careerbridge`**.
4. Framework Preset akan otomatis terdeteksi sebagai **Next.js**.
5. Klik **"Deploy"**. Vercel akan otomatis mengompilasi dan menerbitkan website dengan HTTPS gratis.

---

## ⚖️ Mandatory Legal Disclaimer

> *"Career Bridge adalah program pengembangan kesiapan karier dan pendampingan profesional independen. Platform ini tidak menjamin kelulusan seleksi magang maupun tawaran pekerjaan di perusahaan mana pun, dan tidak bertindak sebagai agen tenaga kerja komersial. Seluruh materi dan review difokuskan pada peningkatan kompetensi dan kualitas persiapan mahasiswa."*
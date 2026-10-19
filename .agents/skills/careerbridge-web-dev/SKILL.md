---
name: careerbridge-web-dev
description: >-
  Specialized skill for building and maintaining the Career Bridge full-stack web platform using Next.js 14/15 App Router, Tailwind CSS, TypeScript, Shadcn UI, and Supabase. Use this skill whenever building or modifying frontend components, landing pages, authentication flows, student/mentor dashboards, or database integrations for Career Bridge.
---

# Career Bridge Web Development Skill

This skill guides the construction, maintenance, and enhancement of the **Career Bridge** web application. Career Bridge is a technology-enabled career readiness and professional access platform for university students (especially engineering and energy disciplines).

---

## 1. Project Tech Stack & Standards

- **Framework**: Next.js 14+ or 15 (App Router with React Server Components)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with standard custom themes (Primary: Deep Navy `#0F172A`, Accent: Electric Blue `#2563EB`, Success Emerald `#059669`, Warm Amber `#D97706`)
- **UI Components**: Shadcn UI / Radix Primitives + Lucide React icons
- **Data Visualization**: Recharts (for Career Readiness Radar charts and progress tracking)
- **Database & Auth**: Supabase (PostgreSQL with Row Level Security)
- **Forms & Validation**: `react-hook-form` with `zod` schema resolvers

---

## 2. Directory & Route Architecture

When developing routes and features in the project, follow this clean App Router layout:

```text
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx               # High-converting Landing Page
│   │   ├── about/page.tsx         # About & Team (ITS Teknik Elektro 2026)
│   │   ├── cohorts/page.tsx       # Cohort catalog & 4-week curriculum
│   │   ├── mentors/page.tsx       # Curated mentor directory
│   │   ├── pricing/page.tsx       # Individual & B2B Institutional tiers
│   │   └── diagnostic/page.tsx    # Public / Free Career Diagnostic Test
│   ├── (auth)/
│   │   ├── login/page.tsx         # Unified login (Student / Mentor / Partner)
│   │   └── register/page.tsx      # Role-based onboarding
│   ├── dashboard/
│   │   ├── student/               # Mentee Workspace (CRS, Cohort, Action Plan)
│   │   │   ├── page.tsx
│   │   │   ├── assessment/page.tsx
│   │   │   ├── schedule/page.tsx
│   │   │   └── action-plan/page.tsx
│   │   ├── mentor/                # Mentor Portal (Assigned mentees, session logs)
│   │   │   ├── page.tsx
│   │   │   ├── mentees/page.tsx
│   │   │   └── feedback/page.tsx
│   │   └── b2b/                   # Institutional Analytics (HMD, BEM, Faculty)
│   │       ├── page.tsx
│   │       └── reports/page.tsx
│   └── api/
│       ├── matching/route.ts      # Match score calculator
│       ├── assessment/route.ts    # CRS evaluator
│       └── sessions/route.ts      # Scheduling and attendance
├── components/
│   ├── ui/                        # Reusable primitive UI components
│   ├── landing/                   # Hero, ProofOfConcept, Curriculum, MentorCard
│   ├── diagnostic/                # Questionnaire, RadarChart, ScoreSummary
│   └── dashboard/                 # ProgressTimeline, ActionPlanCard, FeedbackModal
├── lib/
│   ├── matching.ts                # Rule-based matching engine logic
│   ├── scoring.ts                 # Career Readiness Score formula
│   └── supabase.ts                # Client & Server DB connectors
└── types/
    └── index.ts                   # Unified TypeScript definitions
```

---

## 3. Mandatory UI/UX & Compliance Elements

Whenever generating pages or components:
1. **Mandatory Disclaimer Banner**: Every footer and registration screen MUST include the disclaimer:
   > *"Career Bridge adalah platform pengembangan kesiapan karier dan pendampingan profesional. Platform ini tidak bertindak sebagai agen penyalur tenaga kerja dan tidak menjamin kelulusan seleksi magang maupun tawaran pekerjaan."*
2. **Proof-of-Concept Spotlight**: Explicitly highlight the SPE ITS SC Career Coaching Network pilot as social proof (100+ members, tested cohort model).
3. **Responsive & Accessible**: Use semantic HTML5, clear focus states, and mobile-friendly responsive breakpoints (`sm:`, `md:`, `lg:`).

---

## 4. Quick Component Checklist

- [ ] Does the page adhere to the Navy & Blue color palette?
- [ ] Are TypeScript types strictly defined without using `any`?
- [ ] Are form inputs validated with Zod schemas?
- [ ] Is sensitive student data (CV, phone, email) protected behind authenticated routes?
- [ ] Are call-to-actions (CTA) clearly directing to either the Diagnostic test or Cohort enrollment?

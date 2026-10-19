---
name: careerbridge-assessment-tracker
description: >-
  Specialized skill for creating and maintaining the Career Bridge Career Diagnostic Assessment, Career Readiness Score (CRS) evaluator across 5 dimensions, pre/post cohort comparison, and automated impact reporting. Use this skill when building diagnostic forms, radar chart visualizers, or student/institutional outcome analytics.
---

# Career Bridge Assessment & Impact Tracker Skill

This skill defines the question rubrics, scoring mechanisms, and data structures for the **Career Diagnostic Assessment** and **Career Readiness Score (CRS)**.

---

## 1. The 5 Core Competency Dimensions

The diagnostic measures five distinct dimensions of a student's career preparation:

| Pillar Key | Dimension Name | Question Count | Weight ($W_k$) | Max Raw Score | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `clarity` | **Career Clarity & Industry Awareness** | 5 | 20% (0.20) | 25 | Pemahaman target posisi, realitas industri, dan jenjang karier di bidang teknik/energi. |
| `competency` | **Technical & Skill Gap Mapping** | 5 | 25% (0.25) | 25 | Kesadaran skill teknis (software/hardware/sertifikasi) yang dibutuhkan posisi target. |
| `branding` | **Professional Branding & CV** | 5 | 20% (0.20) | 25 | Kualitas CV berbasis pencapaian (STAR method), portofolio proyek, dan profil LinkedIn. |
| `interview` | **Interview & Communication** | 5 | 20% (0.20) | 25 | Kesiapan behavioural & technical interview serta etika komunikasi profesional. |
| `networking` | **Networking & Professional Access** | 5 | 15% (0.15) | 25 | Kemampuan membangun jejaring dengan alumni/praktisi industri tanpa canggung. |

---

## 2. Mathematical Scoring Formula

Each question is evaluated on a 1 to 5 Likert Scale (1 = Sangat Tidak Setuju / Kurang, 5 = Sangat Setuju / Mahir).

$$\text{CRS} = \sum_{k=1}^{5} \left( \frac{\sum_{i=1}^{5} q_{k,i}}{25} \times 100 \right) \times W_k$$

### Readiness Tiers:
- **0 - 49 (Exploration Needed / Red)**: Mahasiswa membutuhkan orientasi mendasar sebelum menyusun dokumen lamaran.
- **50 - 74 (Emerging Readiness / Yellow)**: Memiliki potensi dan dasar yang baik, namun membutuhkan pemolesan CV dan latihan interview terarah.
- **75 - 100 (Industry Ready / Green)**: Siap bersaing secara kompetitif dalam proses rekrutmen perusahaan target.

---

## 3. Reference Implementation & Radar Chart Formatter (TypeScript)

Use this logic in `src/lib/scoring.ts`:

```typescript
export interface DiagnosticAnswer {
  questionId: string;
  pillar: 'clarity' | 'competency' | 'branding' | 'interview' | 'networking';
  score: number; // 1 to 5
}

export interface PillarScore {
  pillar: string;
  label: string;
  rawScore: number;
  normalizedScore: number; // 0 - 100
  weight: number;
}

export interface CRSAssessmentResult {
  overallScore: number; // 0 - 100
  tier: 'Exploration Needed' | 'Emerging Readiness' | 'Industry Ready';
  pillars: Record<string, PillarScore>;
  radarChartData: Array<{ subject: string; score: number; fullMark: number }>;
  recommendations: string[];
}

export function calculateCRS(answers: DiagnosticAnswer[]): CRSAssessmentResult {
  const pillarsConfig = {
    clarity: { label: 'Career Clarity', weight: 0.20 },
    competency: { label: 'Skill Gap Awareness', weight: 0.25 },
    branding: { label: 'CV & LinkedIn Branding', weight: 0.20 },
    interview: { label: 'Interview Readiness', weight: 0.20 },
    networking: { label: 'Networking Strategy', weight: 0.15 },
  };

  const rawTotals: Record<string, number> = {
    clarity: 0,
    competency: 0,
    branding: 0,
    interview: 0,
    networking: 0,
  };

  answers.forEach((ans) => {
    if (rawTotals[ans.pillar] !== undefined) {
      rawTotals[ans.pillar] += ans.score;
    }
  });

  const pillarsResult: Record<string, PillarScore> = {};
  let overall = 0;

  for (const [key, config] of Object.entries(pillarsConfig)) {
    const raw = rawTotals[key] || 5; // default min 5
    const normalized = (raw / 25) * 100;
    pillarsResult[key] = {
      pillar: key,
      label: config.label,
      rawScore: raw,
      normalizedScore: Math.round(normalized),
      weight: config.weight,
    };
    overall += normalized * config.weight;
  }

  const finalScore = Math.round(overall);

  let tier: CRSAssessmentResult['tier'] = 'Exploration Needed';
  if (finalScore >= 75) tier = 'Industry Ready';
  else if (finalScore >= 50) tier = 'Emerging Readiness';

  const radarChartData = Object.values(pillarsResult).map((p) => ({
    subject: p.label,
    score: p.normalizedScore,
    fullMark: 100,
  }));

  const recommendations = generateRecommendations(pillarsResult);

  return {
    overallScore: finalScore,
    tier,
    pillars: pillarsResult,
    radarChartData,
    recommendations,
  };
}

function generateRecommendations(pillars: Record<string, PillarScore>): string[] {
  const recs: string[] = [];
  if (pillars.clarity.normalizedScore < 60) {
    recs.push('Eksplorasi kembali profil pekerjaan target dan ikuti sesi Industry Insight di Minggu ke-2.');
  }
  if (pillars.branding.normalizedScore < 60) {
    recs.push('Prioritaskan rekonstruksi format CV dengan metode STAR sebelum sesi review dengan mentor.');
  }
  if (pillars.interview.normalizedScore < 60) {
    recs.push('Lakukan simulasi mock interview mandiri atau bersama rekan kelompok sebelum sesi W3.');
  }
  if (pillars.networking.normalizedScore < 60) {
    recs.push('Manfaatkan sesi mentoring kelompok untuk berlatih menyusun personalized connection message di LinkedIn.');
  }
  return recs;
}
```

---

## 4. Pre vs Post Delta Tracking & Institutional Reporting

For cohort impact validation:
1. Every enrolled student submits a **Pre-Test** before Week 1 and a **Post-Test** at the end of Week 4.
2. The delta is measured as:
   $$\Delta \text{CRS} = \text{CRS}_{\text{post}} - \text{CRS}_{\text{pre}}$$
3. The platform target is an average cohort gain of **$\ge +20\%$**.
4. The B2B portal (`/dashboard/b2b`) surfaces an aggregated view of:
   - Average $\Delta \text{CRS}$ per department/batch
   - Weakest dimensions across the cohort
   - Attendance rate and completion certificate status

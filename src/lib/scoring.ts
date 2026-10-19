import { DiagnosticAnswer, PillarScore, CRSAssessmentResult } from '@/types';

export const PILLARS_CONFIG = {
  clarity: {
    label: 'Career Clarity & Industry Awareness',
    shortLabel: 'Career Clarity',
    weight: 0.20,
    description: 'Pemahaman target posisi, realitas industri, dan jenjang karier di bidang teknik & energi.',
  },
  competency: {
    label: 'Technical & Skill Gap Mapping',
    shortLabel: 'Skill Gap',
    weight: 0.25,
    description: 'Kesadaran skill teknis (software/hardware/sertifikasi) yang dibutuhkan posisi target.',
  },
  branding: {
    label: 'Professional Branding & CV',
    shortLabel: 'CV & Branding',
    weight: 0.20,
    description: 'Kualitas CV berbasis pencapaian (STAR method), portofolio proyek, dan profil LinkedIn.',
  },
  interview: {
    label: 'Interview & Communication',
    shortLabel: 'Interview Prep',
    weight: 0.20,
    description: 'Kesiapan behavioural & technical interview serta etika komunikasi profesional.',
  },
  networking: {
    label: 'Networking & Professional Access',
    shortLabel: 'Networking',
    weight: 0.15,
    description: 'Kemampuan membangun jejaring dengan alumni/praktisi industri tanpa canggung.',
  },
};

export function calculateCRS(answers: DiagnosticAnswer[]): CRSAssessmentResult {
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

  for (const [key, config] of Object.entries(PILLARS_CONFIG)) {
    const raw = rawTotals[key] || 5; // default min 5 (5 questions * 1)
    // 5 questions * max 5 = 25 max raw score
    const normalized = Math.min(100, Math.max(0, (raw / 25) * 100));
    pillarsResult[key] = {
      pillar: key,
      label: config.shortLabel,
      rawScore: raw,
      normalizedScore: Math.round(normalized),
      weight: config.weight,
    };
    overall += normalized * config.weight;
  }

  const finalScore = Math.round(overall);

  let tier: CRSAssessmentResult['tier'] = 'Exploration Needed';
  let tierColor = '#EF4444'; // Red

  if (finalScore >= 75) {
    tier = 'Industry Ready';
    tierColor = '#059669'; // Emerald
  } else if (finalScore >= 50) {
    tier = 'Emerging Readiness';
    tierColor = '#2563EB'; // Blue
  }

  const radarChartData = Object.values(pillarsResult).map((p) => ({
    subject: p.label,
    score: p.normalizedScore,
    fullMark: 100,
  }));

  const recommendations = generateRecommendations(pillarsResult);

  return {
    overallScore: finalScore,
    tier,
    tierColor,
    pillars: pillarsResult,
    radarChartData,
    recommendations,
  };
}

function generateRecommendations(pillars: Record<string, PillarScore>): string[] {
  const recs: string[] = [];

  if (pillars.clarity.normalizedScore < 60) {
    recs.push(
      'Eksplorasi kembali profil pekerjaan target dan ikuti sesi Industry Pathway di Minggu ke-2 Cohort untuk memetakan opsi karier di bidang energi/ketenagalistrikan.'
    );
  }
  if (pillars.competency.normalizedScore < 60) {
    recs.push(
      'Identifikasi software spesifik industri (misal: ETAP, MATLAB/Simulink, AutoCAD, PLC) dan susun roadmap sertifikasi teknis dalam 90 hari ke depan.'
    );
  }
  if (pillars.branding.normalizedScore < 60) {
    recs.push(
      'Prioritaskan rekonstruksi format CV dengan metode STAR (Situation, Task, Action, Result) dan optimasi headline LinkedIn sebelum sesi review mentor.'
    );
  }
  if (pillars.interview.normalizedScore < 60) {
    recs.push(
      'Latih jawaban behavioural questions (metode STAR) dan siapkan penjelasan teknis mengenai tugas akhir/proyek laboratorium untuk sesi mock interview.'
    );
  }
  if (pillars.networking.normalizedScore < 60) {
    recs.push(
      'Manfaatkan sesi small-group mentoring Minggu ke-4 untuk berlatih menyusun personalized connection message di LinkedIn kepada alumni industri target.'
    );
  }

  // Fallback if all scores are high
  if (recs.length === 0) {
    recs.push(
      'Kesiapan karier Anda sudah sangat solid! Fokuskan langkah pada personal branding tingkat lanjut, portfolio highlight, dan simulasi user interview bersama mentor.'
    );
    recs.push(
      'Lanjutkan ke pendaftaran Cohort Batch 1 untuk mendapatkan validasi dokumen langsung dari praktisi industri energi ternama.'
    );
  }

  return recs;
}

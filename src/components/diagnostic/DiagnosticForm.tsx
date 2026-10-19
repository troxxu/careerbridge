'use client';

import React, { useState, useEffect } from 'react';
import { DIAGNOSTIC_QUESTIONS } from '@/lib/mock-data';
import { calculateCRS, PILLARS_CONFIG } from '@/lib/scoring';
import { DiagnosticAnswer, CRSAssessmentResult, PillarKey } from '@/types';
import { RadarChartVisualizer } from './RadarChartVisualizer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  Zap,
  RotateCcw,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/context/AuthContext';

const PILLAR_KEYS: PillarKey[] = ['clarity', 'competency', 'branding', 'interview', 'networking'];

export function DiagnosticForm() {
  const { user, updateUserCRS } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 to 4 (5 pillars)
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CRSAssessmentResult | null>(null);

  // Restore answers from localStorage on client load
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cb_diag_answers');
      if (saved) {
        setAnswers(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Save answers to localStorage
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      try {
        localStorage.setItem('cb_diag_answers', JSON.stringify(answers));
      } catch (e) {}
    }
  }, [answers]);

  const currentPillarKey = PILLAR_KEYS[currentStep];
  const currentPillarConfig = PILLARS_CONFIG[currentPillarKey];

  // Questions for current pillar
  const currentQuestions = DIAGNOSTIC_QUESTIONS.filter(
    (q) => q.pillar === currentPillarKey
  );

  const totalQuestions = DIAGNOSTIC_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectScore = (questionId: string, score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: score,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < PILLAR_KEYS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    const formattedAnswers: DiagnosticAnswer[] = DIAGNOSTIC_QUESTIONS.map((q) => ({
      questionId: q.id,
      pillar: q.pillar,
      score: answers[q.id] || 3,
    }));

    const calculated = calculateCRS(formattedAnswers);
    setResult(calculated);

    // Save score to user state and localStorage
    try {
      updateUserCRS(calculated.overallScore, calculated.tier);
    } catch (e) {}

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // Demo helper: Quick fill with realistic responses
  const handleQuickFill = (profileType: 'balanced' | 'high' | 'exploration') => {
    const demoAnswers: Record<string, number> = {};
    DIAGNOSTIC_QUESTIONS.forEach((q, idx) => {
      if (profileType === 'high') {
        demoAnswers[q.id] = (idx % 2 === 0) ? 5 : 4;
      } else if (profileType === 'exploration') {
        demoAnswers[q.id] = (idx % 3 === 0) ? 1 : 2;
      } else {
        // Balanced ~68 CRS (Typical Semester 6 student)
        if (q.pillar === 'clarity') demoAnswers[q.id] = 4;
        else if (q.pillar === 'competency') demoAnswers[q.id] = 3;
        else if (q.pillar === 'branding') demoAnswers[q.id] = 3;
        else if (q.pillar === 'interview') demoAnswers[q.id] = 3;
        else demoAnswers[q.id] = 4;
      }
    });
    setAnswers(demoAnswers);
  };

  const handleRetake = () => {
    setResult(null);
    setAnswers({});
    setCurrentStep(0);
    try {
      localStorage.removeItem('cb_diag_answers');
    } catch (e) {}
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  if (result) {
    return <RadarChartVisualizer result={result} onRetake={handleRetake} />;
  }

  const likertOptions = [
    { value: 1, label: '1: Sangat Tidak Setuju / Kurang', short: '1' },
    { value: 2, label: '2: Tidak Setuju / Rendah', short: '2' },
    { value: 3, label: '3: Cukup / Ragu-ragu', short: '3' },
    { value: 4, label: '4: Setuju / Baik', short: '4' },
    { value: 5, label: '5: Sangat Setuju / Mahir', short: '5' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
      {/* Authenticated Participant Banner */}
      {user && (
        <div className="flex items-center justify-between p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-xs text-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <span>{user.name}</span>
                <span className="text-[10px] font-semibold bg-emerald-200/60 text-emerald-800 px-2 py-0.5 rounded-full">
                  Akun Terverifikasi
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-normal">
                {user.nrp ? `NRP ${user.nrp} • ` : ''}{user.department || 'Mahasiswa Teknik'} • Target: {user.targetIndustry || 'Industri Energi & Keteknikan'}
              </div>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 hidden sm:inline-block">
            Sesi Asesmen Aktif ✓
          </span>
        </div>
      )}

      {/* Top Header & Demo Quick Fill Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Instrumen Diagnostik Kesiapan Karier</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Pilar {currentStep + 1} dari 5: {currentPillarConfig.label}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            {currentPillarConfig.description} (Bobot {Math.round(currentPillarConfig.weight * 100)}%)
          </p>
        </div>

        {/* Demo Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
            Demo Isi Cepat:
          </span>
          <button
            onClick={() => handleQuickFill('balanced')}
            className="text-[11px] font-semibold text-slate-700 hover:text-brand-blue bg-white hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs"
          >
            Emerging (~68)
          </button>
          <button
            onClick={() => handleQuickFill('high')}
            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 shadow-xs"
          >
            Ready (~88)
          </button>
        </div>
      </div>

      {/* Progress Bar & Step Indicators */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>
            Kemajuan: {answeredCount} dari {totalQuestions} Soal Terjawab
          </span>
          <span className="text-brand-blue font-extrabold">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} indicatorClassName="bg-brand-blue" />

        {/* Step tabs */}
        <div className="grid grid-cols-5 gap-1.5 pt-2">
          {PILLAR_KEYS.map((key, idx) => {
            const config = PILLARS_CONFIG[key];
            const isDone = DIAGNOSTIC_QUESTIONS.filter((q) => q.pillar === key).every(
              (q) => answers[q.id] !== undefined
            );
            const isCurrent = idx === currentStep;

            return (
              <button
                key={key}
                onClick={() => setCurrentStep(idx)}
                className={`py-2 px-1 text-center rounded-xl text-[10px] sm:text-xs font-bold transition-all truncate ${
                  isCurrent
                    ? 'bg-brand-navy text-white shadow-sm'
                    : isDone
                    ? 'bg-blue-50 text-brand-blue border border-blue-200'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {config.shortLabel} {isDone && '✓'}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5 Questions for the active pillar */}
      <div className="space-y-6 pt-2">
        {currentQuestions.map((q, idx) => {
          const selectedValue = answers[q.id];

          return (
            <div
              key={q.id}
              className={`rounded-2xl p-5 sm:p-6 border transition-all ${
                selectedValue !== undefined
                  ? 'bg-slate-50/70 border-slate-200'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              {/* Question Text */}
              <div className="flex items-start gap-3 mb-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white text-xs font-bold mt-0.5">
                  {currentStep * 5 + idx + 1}
                </span>
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-brand-navy leading-snug">
                    {q.questionText}
                  </h4>
                  {q.helpText && (
                    <p className="text-xs text-slate-500 italic">
                      Petunjuk: {q.helpText}
                    </p>
                  )}
                </div>
              </div>

              {/* Likert Scale (1 to 5) Options */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                {likertOptions.map((opt) => {
                  const isSelected = selectedValue === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectScore(q.id, opt.value)}
                      className={`p-3 rounded-xl border text-left sm:text-center transition-all flex sm:flex-col items-center sm:justify-center justify-between gap-1 min-h-[44px] ${
                        isSelected
                          ? 'border-brand-blue bg-blue-600 text-white font-bold shadow-md scale-[1.02]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-sm font-black">{opt.short}</span>
                      <span
                        className={`text-[10px] leading-tight ${
                          isSelected ? 'text-blue-100' : 'text-slate-500'
                        }`}
                      >
                        {opt.value === 1 && 'Sangat Tidak Setuju'}
                        {opt.value === 2 && 'Tidak Setuju'}
                        {opt.value === 3 && 'Cukup / Ragu'}
                        {opt.value === 4 && 'Setuju'}
                        {opt.value === 5 && 'Sangat Setuju'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <Button
          variant="outline"
          onClick={handlePrevStep}
          disabled={currentStep === 0}
          className="text-xs font-bold rounded-xl h-11"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Pilar Sebelumnya
        </Button>

        <div className="flex items-center gap-3">
          {currentStep === PILLAR_KEYS.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={answeredCount < totalQuestions}
              className="bg-brand-emerald hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md rounded-xl h-11"
            >
              Hitung Skor CRS Sekarang
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNextStep}
              className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md rounded-xl h-11"
            >
              Pilar Berikutnya
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

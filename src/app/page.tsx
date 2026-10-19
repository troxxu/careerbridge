'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Hero } from '@/components/landing/Hero';
import { BpEnergyGrid } from '@/components/landing/BpEnergyGrid';
import { PilotShowcase } from '@/components/landing/PilotShowcase';
import { Curriculum } from '@/components/landing/Curriculum';
import { MentorDirectory } from '@/components/landing/MentorDirectory';
import { PricingB2B2C } from '@/components/landing/PricingB2B2C';
import { FaqSection } from '@/components/landing/FaqSection';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

function HomeContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';

  useEffect(() => {
    // If user is not authenticated and not explicitly previewing, redirect to /login gateway
    if (!isLoading && !isAuthenticated && !isPreview) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, isPreview, router]);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. BP-Style Energy Culture Grid */}
      <BpEnergyGrid />

      {/* 3. Social Proof & Pilot Showcase */}
      <PilotShowcase />

      {/* 4. 4-Week Curriculum */}
      <Curriculum />

      {/* 5. Mentor Directory */}
      <MentorDirectory />

      {/* 6. Pricing Section (B2B2C) */}
      <PricingB2B2C />

      {/* 7. FAQ */}
      <FaqSection />

      {/* 8. Bottom Final Call to Action */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-900 border-t border-slate-800 text-white relative overflow-hidden">
        <div className="container max-w-5xl mx-auto px-4 text-center relative z-10 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
            <Sparkles className="h-4 w-4" />
            <span>Pendaftaran Cohort Batch 1 Dibuka</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Mulai Transformasi Kesiapan Karier Anda Hari Ini
          </h2>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Ambil tes diagnostik mandiri dalam 5 menit, ketahui posisi Career Readiness Score Anda, dan persiapkan langkah konkret menuju industri energi dan teknik impian.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/diagnostic" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm px-8 h-12 rounded-xl transition-all"
              >
                Mulai Career Diagnostic Gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/dashboard/student" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-slate-700 bg-slate-800/80 text-white hover:bg-slate-800 font-semibold text-sm h-12 rounded-xl"
              >
                Buka Student Workspace
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500 font-mono">
          Memuat Career Bridge...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}

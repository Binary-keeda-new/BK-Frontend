'use client';

import { useEffect, useState, useMemo } from 'react';
import { getUserTestReport } from '../services/test.service';
import { UserTestReport } from '../types/test.types';
import ReportHeader from '../components/test-report/ReportHeader';
import OverallSummary from '../components/test-report/OverallSummary';
import SectionPerformance from '../components/test-report/SectionPerformance';
import ReportSkeleton from '../components/test-report/ReportSkeleton';

type Props = {
  attemptId: string;
  onBack: () => void;
  onReviewSection: (sectionId: string, type: 'mcq' | 'coding') => void;
};

export default function TestResult({ attemptId, onBack, onReviewSection }: Props) {
  const [report, setReport] = useState<UserTestReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'mcq' | 'coding'>('overview');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserTestReport(attemptId);
        setReport(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load test report');
      } finally {
        setLoading(false);
      }
    };

    void fetchReport();
  }, [attemptId]);

  if (loading) {
    return <ReportSkeleton />;
  }

  if (error || !report) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <div className="rounded-3xl border border-red-500/25 bg-red-500/10 p-8">
          <p className="text-sm text-red-400">
            {error || 'Test report could not be loaded.'}
          </p>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 rounded-xl bg-[var(--orange)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  // Handle finalizing and requiresReview
  if (report.status === 'finalizing' || report.resultReady === false) {
    // If we're here, it means we got a report but it's not ready yet
    if (report.requiresReview) {
      return (
        <div className="flex h-[80vh] flex-col items-center justify-center p-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-4xl">
            ⏳
          </div>
          <h2 className="mt-6 text-2xl font-bold text-[var(--text)]">Technical Review Required</h2>
          <p className="mt-2 max-w-md text-[var(--muted2)]">
            Your test has been submitted, but part of your result requires technical review. You will be notified when the final result is ready.
          </p>
          <button
            onClick={onBack}
            className="mt-8 rounded-xl bg-[var(--surface2)] border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      );
    }

    return (
      <div className="flex h-[80vh] flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-[var(--text)]">Finalizing your test...</h2>
        <p className="mt-2 text-[var(--muted2)]">
          Please wait while we process your submission.
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <ReportHeader report={report} onBack={onBack} />
      
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <OverallSummary report={report} />
        <SectionPerformance report={report} onReviewSection={onReviewSection} />
      </div>
    </main>
  );
}

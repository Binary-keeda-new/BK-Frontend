'use client';

import { useEffect, useState, useMemo } from 'react';
import { getUserTestReport } from '../services/test.service';
import { UserTestReport } from '../types/test.types';
import ReportHeader from '../components/test-report/ReportHeader';
import OverallSummary from '../components/test-report/OverallSummary';
import SectionPerformance from '../components/test-report/SectionPerformance';
import McqAnalytics from '../components/test-report/McqAnalytics';
import McqReview from '../components/test-report/McqReview';
import CodingAnalytics from '../components/test-report/CodingAnalytics';
import CodingReview from '../components/test-report/CodingReview';
import ReportSkeleton from '../components/test-report/ReportSkeleton';

type Props = {
  attemptId: string;
  onBack: () => void;
};

export default function TestResult({ attemptId, onBack }: Props) {
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

  const tabs = useMemo(() => {
    if (!report) return [];
    
    const hasMcq = report.summary.totalMcqQuestions > 0 || (report.mcqReview && report.mcqReview.length > 0);
    const hasCoding = report.summary.totalCodingProblems > 0 || (report.codingReview && report.codingReview.length > 0);
    
    const availableTabs = [
      { id: 'overview', label: 'Overview' }
    ];
    
    if (hasMcq) {
      availableTabs.push({ id: 'mcq', label: 'MCQ Analytics' });
    }
    
    if (hasCoding) {
      availableTabs.push({ id: 'coding', label: 'Coding Analytics' });
    }
    
    return availableTabs;
  }, [report]);

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
            Back to Tests
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <ReportHeader report={report} onBack={onBack} />
      
      {tabs.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'mcq' | 'coding')}
              className={`rounded-2xl px-6 py-3 text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[var(--orange)] text-white shadow-[0_4px_14px_rgba(241,90,34,0.3)]'
                  : 'text-[var(--muted2)] hover:bg-[var(--bg)] hover:text-[var(--text)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <OverallSummary report={report} />
          <SectionPerformance report={report} />
        </div>
      )}

      {activeTab === 'mcq' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {report.summary.totalMcqQuestions > 0 && <McqAnalytics report={report} />}
          <McqReview report={report} />
        </div>
      )}

      {activeTab === 'coding' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {report.summary.totalCodingProblems > 0 && <CodingAnalytics report={report} />}
          <CodingReview report={report} />
        </div>
      )}
    </main>
  );
}
